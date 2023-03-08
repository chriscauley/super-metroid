import cv2

items = "morph-ball bomb screw-attack missile super-missile energy-tank energy2-tank varia-suit space-jump power-bomb hi-jump-boots speed-booster pedastool reserve-tank x-ray spring-ball grappling-beam charge-beam spazer-beam wave-beam ice-beam plasma-beam gravity-suit".split(' ')

path = 'icons/src/assets/images/'
img = cv2.imread(path + 'items.png', cv2.IMREAD_UNCHANGED)
imgalt = cv2.imread(path + 'items-alt.png', cv2.IMREAD_UNCHANGED)

for i, item in enumerate(items):
    print(item)
    cv2.imwrite(path + item + ".png", img[i*32:(i+1)*32])
    cv2.imwrite(path + item + "-alt.png", imgalt[i*32:(i+1)*32])