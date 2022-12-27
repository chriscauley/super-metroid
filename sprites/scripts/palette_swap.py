import cv2
import hashlib
import json
import numpy as np
import os
import sys
import urcv


def hash_image(img):
    b = img
    return hashlib.sha1(b).hexdigest()[:8]


skips = [
    [0, 0, 0, 0],
    [127, 0, 0, 255],
]


numalpha = '1234567890abcdefghijklmnopqrstuvwxyz'


def _is_not_skipped(color):
    for skip in skips:
        if (color == skip).all():
            return False
    return True


def remove_skips(color_counts):
    out = []
    counts = []
    for color, count in zip(*color_counts):
        if _is_not_skipped(color):
            out.append(color)
            counts.append(count)
    return out, counts


def get_goal_palettes(image):
    x, y, w, h = (378, 1, 120, 24)
    image = image[y:y+h,x:x+w]
    return urcv.transform.scale(image, 1/8)


def get_transparent_bg(shape, scale=8):
    h, w = shape[:2]
    bg = np.zeros((1 + h // scale, 1 + w // scale, 4), dtype=np.uint8)
    bg[:] = 255
    for x in range(bg.shape[1]):
        for y in range(bg.shape[0]):
            if y % 2 == x % 2:
                bg[y,x] = [192, 192, 192, 255]
    return cv2.resize(bg, None, fx = scale, fy = scale, interpolation=cv2.INTER_NEAREST)[:h,:w]


def draw_square(image, color, x, y, scale):
    image[y*scale:(y+1)*scale,x*scale:(x+1)*scale] = color


class Swapper:
    def __init__(self, image, goal):
        self.image = cv2.imread(image, cv2.IMREAD_UNCHANGED)
        self.goal = cv2.imread(goal, cv2.IMREAD_UNCHANGED)
        self.image_palette, self.image_counts = remove_skips(urcv.count_colors(self.image))
        self.goal_palettes = get_goal_palettes(self.goal)
        self.key = f'{hash_image(self.image)}__{hash_image(self.goal)}'
        self._all = {}
        if os.path.exists('.db.json'):
            with open('.db.json', 'r') as f:
                self._og = f.read()
                self.reset()
        self._all[self.key] = self.data = self._all.get(self.key, {})

    def reset(self):
        self._all = json.loads(self._og)

    def get_remap_index(self, i):
        return self.data.get(i)

    def set_remap(self, a, b):
        self.data[a] = b
        self._save()

    def _save(self):
        with open('.db.json', 'w') as f:
            f.write(json.dumps(self._all, indent=4))

    def get_repalette(self, ig):
        image = self.image.copy()
        remap = {}
        for i, color in enumerate(self.image_palette):
            key = numalpha[i]
            if not key in self.data:
                continue
            remap[key] = (self.image == color).all(-1)

        for key, mask in remap.items():
            target_index = numalpha.index(self.data[key])
            color = self.goal_palettes[ig][target_index]
            image[mask] = color
        return image

def write_text(image, text, pos):
    urcv.text.write(
        image,
        text,
        color=(0,0,0,255),
        pos=pos,
        font_scale=1.2,
        align='bottom',
        font=cv2.FONT_HERSHEY_PLAIN,
    )


def main(image, goal):
    swapper = Swapper(image, goal)
    rows = 7
    bs = 64
    buff = 2
    cols = max(len(swapper.image_palette), len(swapper.goal_palettes[0]))+buff
    bg = get_transparent_bg((bs*rows, bs*cols))

    print('type "h + <enter>" for help')
    while True:
        menu = bg.copy()
        urcv.text.write(menu, 'c_in', color=(0,0,0,255), pos=(0, bs*1.25), font_scale=1.5)
        urcv.text.write(menu, 'c_out', color=(0,0,0,255), pos=(0, bs*2.25), font_scale=1.5)
        urcv.text.write(menu, 'goal', color=(0,0,0,255), pos=(0, bs*4.25), font_scale=1.5)

        for i, color in enumerate(swapper.image_palette):
            key = numalpha[i]
            target = swapper.get_remap_index(key)
            text = f' {key}>{target or "?"}'
            write_text(menu, text, (bs*(buff+i), 0.9*bs))
            write_text(menu, swapper.image_counts[i], (bs*(buff+i), 0.4*bs))
            if target:
                target_color = swapper.goal_palettes[0][numalpha.index(target)]
                draw_square(menu, target_color, i+buff, 2, bs)

            draw_square(menu, color, i+buff, 1, bs)

        for ig in range(len(swapper.goal_palettes)):
            for i, color in enumerate(swapper.goal_palettes[ig]):
                if ig == 0:
                    key = numalpha[i]
                    write_text(menu, '   '+key, (bs*(buff+i), 3.9*bs))
                draw_square(menu, color, i+buff, 4+ig, bs)

        cv2.imshow('menu', menu)
        _input = ""
        display = np.vstack([
            swapper.image,
            swapper.get_repalette(0),
            swapper.get_repalette(1),
            swapper.get_repalette(2),
        ])
        bg2 = get_transparent_bg(display.shape, scale=2)
        bg2[:] = 0
        urcv.draw.paste_alpha(bg2, display, 0, 0)
        cv2.imshow('before/after', urcv.transform.scale(bg2, 4))

        _input = ''
        while True:
            pressed = urcv.wait_key(1e5)
            if pressed == 'enter':
                print()
                break
            elif pressed == 'space':
                _input += ' '
            elif pressed in numalpha:
                _input += pressed
            else:
                print("unrecognized key:", pressed)
            print('\r', repr(_input), end=" ", flush=True)
        if _input == 'q':
            break
        elif _input in ['h', '?']:
            print("""example commands:
1>a    replace color 1 with color a
1 a    alias for "1>a"
?      show help
h      show help
q      quit
cancel undo all changes (revert to start of session)
done   write re-paletted image to disk and exit
""")
        elif len(_input) == 3 and _input[1] == ' ':
            a, b = _input.split(' ')
            swapper.set_remap(a, b)
        elif _input == 'done':
            dest = 'out.png'
            cv2.imwrite(dest, swapper.get_repalette(0))
            print('wrote to ', dest)
            break
        elif _input == 'cancel':
            print('swapper reset to start of session')
            swapper.reset()
        else:
            print('unknown input: ', _input)
            print("enter ? or h for help")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])