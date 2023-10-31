import cv2

chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.lower()
img = cv2.imread('fonts.png', cv2.IMREAD_UNCHANGED)

for col, char in enumerate(chars):
    white = img[0:32,col*32:(col+1)*32]
    green = img[32:,col*32:(col+1)*32]
    cv2.imwrite(f'white_{char}.png', white)
    cv2.imwrite(f'green_{char}.png', green)

    yellow = white.copy()
    r1, g1, b1 = 255, 255, 255 # Original value
    r2, g2, b2 = 255, 182, 0 # Value that we want to replace it with

    red, green, blue = yellow[:,:,0], yellow[:,:,1], yellow[:,:,2]
    mask1 = (red == r1) & (green == g1) & (blue == b1)
    mask2 = (red == r2) & (green == g2) & (blue == b2)
    yellow[:,:,:3][mask1] = [r2, g2, b2]
    yellow[:,:,:3][mask2] = [r1, g1, b1]


    cv2.imwrite(f'yellow_{char}.png', yellow)
