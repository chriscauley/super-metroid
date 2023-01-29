import cv2
import numpy as np
import os
import urcv

def flip_horizontally(img):
    return cv2.flip(img, 1)

target_logic = 'mirror'
target_transform = flip_horizontally

for layout in ['legacy', 'nordub', 'streaming', 'alt-streaming']:
    vanilla_dir = f'vanilla/{layout}/'
    target_dir = f'mirror/{layout}'
    os.makedirs(target_dir, exist_ok=True)
    for fname in os.listdir(vanilla_dir):
        if not fname.endswith('.png'):
            continue
        img = cv2.imread(f'{vanilla_dir}/{fname}', cv2.IMREAD_UNCHANGED)
        target = f'{target_dir}/{fname}'
        result = target_transform(img)
        cv2.imwrite(target, result)


