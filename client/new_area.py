import json
import os
import cv2


def get_image(layout, slug):
    pascal_slug = slug.replace('-', ' ').title().replace(' ','')
    pascal_path = f'public/{layout}/{pascal_slug}.png'
    img_path = f'public/{layout}/{slug}.png'
    if os.path.exists(pascal_path):
        os.rename(pascal_path, img_path)
        print('moved', pascal_path, img_path)
    img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    cv2.imwrite(img_path, img)
    return img

def main(layout, scale):
    scale = int(scale)
    os.makedirs(f'public/{layout}', exist_ok=True)
    os.makedirs(f'src/layouts/{layout}', exist_ok=True)
    with open(f'src/layouts/legacy/areas.json', 'r') as f:
        areas = json.loads(f.read())
    for area_index, area in enumerate(areas):
        h, w = get_image(layout, area['slug']).shape[:2]
        area['height'] = h // scale
        area['width'] = w // scale
        area['title_dxy'] = [1, area_index]
        area['x'] = area['y'] = 0
        for item_index, item in enumerate(area['items']):
            item[1] = item_index
            item[2] = 0
        for warp_index, warp in enumerate(area['warps']):
            warp[1] = warp_index
            warp[2] = 1
    with open(f'src/layouts/{layout}/areas.json', 'w') as f:
        f.write(json.dumps(areas, indent=4))
    os.system('yarn lint --fix')

if __name__ == "__main__":
    import sys
    main(sys.argv[1], sys.argv[2])