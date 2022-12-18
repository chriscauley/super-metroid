import cv2
import numpy as np
import urcv

class Colors:
    hitbox = (243, 242, 241, 255)
    gunbox = (255, 127, 255, 255)
    xraycone = (255, 255, 137, 255)
    boundaries = (127, 0, 0, 0)

colors = Colors()

def main():
    samus = cv2.imread('./sprites/samus.png')
    boundaries = samus.copy()

    boundaries[(boundaries != colors.boundaries[:3]).any(-1)] = 0
    gray = cv2.cvtColor(boundaries, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    cv2.imshow('boundaries', boundaries)
    cv2.imshow('thresh', thresh)

    height, width = thresh.shape
    mask = np.zeros((height+2, width+2), np.uint8)
    cv2.floodFill(thresh, mask, (0, 0), 0)
    cv2.floodFill(thresh, mask, (width-1, 0), 0)
    cv2.imshow('thresh2', thresh)

    cnts = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]

    for c in cnts:
        x,y,w,h = cv2.boundingRect(c)
        cv2.rectangle(samus, (x, y), (x + w, y + h), (0,255,0), 1)

    cv2.imshow('samus', samus)
    urcv.wait_key()

if __name__ == '__main__':
    main()