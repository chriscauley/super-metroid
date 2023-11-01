import fs from 'fs'
import IPS from 'ips.js'

const vanilla = fs.readFileSync('/home/chriscauley/games/super_metroid.smc')
const ips = fs.readFileSync('/home/chriscauley/games/nature/_nature.ips')


console.log(IPS.applyIpsPatch(vanilla, ips))