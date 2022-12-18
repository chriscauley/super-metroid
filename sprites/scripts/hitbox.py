import cv2
import numpy as np
import sys
import urcv

class Colors:
    hitbox = (243, 242, 241, 255)
    gunbox = (255, 127, 255, 255)
    xraycone = (255, 255, 137, 255)
    boundaries = (127, 0, 0, 0)

colors = Colors()

def box_contours(original, target=None, fill=(36,255,12), width=1):
    if target is None:
        target = original.copy()
    image = cv2.bitwise_not(original)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    # kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
    # close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)
    # dilate = cv2.dilate(close, kernel, iterations=1)

    cnts = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]

    sprite_number = 0
    for c in cnts:
        x,y,w,h = cv2.boundingRect(c)
        ROI = image[y:y+h, x:x+w]
        cv2.rectangle(target, (x, y), (x + w, y + h), fill, width)
        sprite_number += 1

    return target

def main(source, destination=None, fg=[], bg=[]):
    fg = fg.split(',')
    bg = bg.split(',')
    source = cv2.imread(source, cv2.IMREAD_UNCHANGED)
    output = source.copy()
    output[:] = 0
    hitbox_mod = cv2.imread('./sprites/hitbox_mod.png', cv2.IMREAD_UNCHANGED)
    samus = cv2.imread('./sprites/samus.png', cv2.IMREAD_UNCHANGED)

    layers = {}

    hitbox = layers['hitbox'] = hitbox_mod.copy()
    urcv.isolate_color(hitbox, colors.hitbox)

    mask = cv2.cvtColor(samus, cv2.COLOR_BGRA2GRAY)
    mask[mask > 0] = 255

    shadow = layers['shadow'] = samus.copy()
    shadow[mask==255] = [0,255,0, 255]

# fig, ax = plt.subplots(1,2,figsize=(12,6))
# ax[0].imshow(cv2.cvtColor(face, cv2.COLOR_BGR2RGB))
# ax[1].imshow(cv2.cvtColor(green_hair, cv2.COLOR_BGR2RGB))

    xraycone = layers['xraycone'] = hitbox_mod.copy()
    urcv.isolate_color(xraycone, colors.xraycone)

    gunbox = hitbox_mod.copy()
    urcv.isolate_color(gunbox, colors.gunbox)
    layers['gunbox'] = box_contours(gunbox, fill=colors.gunbox, width=-1)

    for layer in bg:
        urcv.draw.paste_alpha(output, layers[layer], 0, 0)

    urcv.draw.paste_alpha(output, source, 0, 0)

    for layer in fg:
        urcv.draw.paste_alpha(output, layers[layer], 0, 0)

    cv2.imwrite(destination, output)
    # cv2.imshow('hitbox', hitbox)
    # cv2.imshow('output', output)
    # urcv.wait_key()

main(sys.argv[1], sys.argv[2], 'hitbox', 'shadow,gunbox,xraycone')