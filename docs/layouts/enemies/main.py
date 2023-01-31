from bs4 import BeautifulSoup
import json
import os

import requests

def get_zone(i):
    if i > 117:
        return 'tourian'
    if i > 81 or i == 125 or i == 127 or i == 129:
        return 'norfair'
    if i > 60 or i == 124 or i == 126:
        return 'maridia'
    if i > 52 or i == 129:
        return 'wrecked-ship'
    if i > 28 or i == 128 or i == 130:
        return 'brinstar'
    return 'crateria'

def dl_image(url):
    url = f'https://wiki.supermetroid.run{url}'
    image_name = url.split('/')[-1].replace('%28', '').replace('%29', '').replace('%2A', '')
    if not os.path.exists(image_name):
        r = requests.get(url, stream=True)
        with open(image_name, 'wb') as f:
            for chunk in r.iter_content():
                f.write(chunk)
        print('wrote', image_name, url)
    return image_name

def main():
    soup = BeautifulSoup(requests.get('https://wiki.supermetroid.run/Enemies').text, 'html.parser')
    enemies = {}
    count = 0
    next_id = 0
    for row in soup.findAll('tr'):
        count += 1
        tds = row.findAll('td')
        if not tds:
            continue
        if count > 125: # projectiles
            count += 1
            continue

        wiki_url = tds[1].find('a').get('href')
        keys = ['_', 'name', 'damage', 'health', 'nothing', 'small', 'big', 'missile', 'super_', 'pb', 'notes']
        if len(keys) > len(tds):
            keys = ['_', 'name', 'health', 'nothing', 'small', 'big', 'missile', 'super_', 'pb', 'notes']
        data = {}
        img_href = tds[0].find('img').get('src')
        data['image'] = dl_image(img_href)

        for i, key in enumerate(keys):
            if i == 0:
                continue
            data[key] = tds[i].text.strip()
        enemy_key = wiki_url

        data['wiki_url'] = wiki_url
        data['id'] = next_id
        next_id += 1
        if 'Sm.' in data['name']:
            print(data['name'])
            data['name'] = data['name'].replace('Sm. ', '')
        for key in ['health', 'nothing', 'small', 'big', 'missile', 'super_', 'pb']:
            if data[key] == 'N/A':
                data[key] = 0
            elif '.' in data[key]:
                data[key] = float(data[key])
            else:
                data[key] = int(data[key])
        if 'damage' in data:
            data['damage'] = int(data['damage'].split('/')[0])

        enemies[enemy_key] = data

    with open('data.json', 'w') as f:
        print(f'wrote {len(enemies)} enemies to data.json')
        f.write(json.dumps(list(enemies.values()), indent=2))

if __name__ == "__main__":
    main()