import fs from 'fs'
const vanillaROM = fs.readFileSync('/home/chriscauley/games/super_metroid.smc')
const nature = fs.readFileSync('/home/chriscauley/games/nature/_nature.ips')

function unpack_3bytes(ips, i) {
  var b1 = ips[i];
  var b2 = ips[i+1];
  var b3 = ips[i+2];
  return (b1*65536) + (b2*256) + b3;
}

function unpack_2bytes(ips, i) {
  var b1 = ips[i];
  var b2 = ips[i+1];
  return (b1*256) + b2;
}

function applyIpsAndDownload(_ips) {
    // with items/Locations patch the local rom in memory
    // always make a copy to avoid modifying vanilla rom buffer from local storage
    var bytes_temp = new Uint8Array(vanillaROM);
    var bytes = new Uint8Array(bytes_temp.length);
    bytes.set(bytes_temp);

  //   var binary_string = atob(_ips);
  // console.log(binary_string)
  // return
  //   var len = binary_string.length;
  //   var ips = new Uint8Array(len);
  //   for(var i = 0; i < len; i++) {
  //       ips[i] = binary_string.charCodeAt(i);
  //   }
  const ips = new Uint8Array(_ips)
  console.log(ips)
  process.exit()
    var i = 5;
    var offset = 0;
    var size = 0;
    var rle_size = 0;

    while(i < ips.length - 3) {
      let j
        offset = unpack_3bytes(ips, i);
        i += 3;
        size = unpack_2bytes(ips, i);
        i += 2;

        if(size == 0) {
            // RLE
            rle_size = unpack_2bytes(ips, i);
            i += 2;
            for(j=0; j<rle_size; j++) {
                bytes[offset+j] = ips[i];
            }
            i += 1;
        } else {
            for(j=0; j<size; j++) {
                bytes[offset+j] = ips[i+j];
            }
            i += j;
        }
    }

    // fix checksum
    var sum1 = 0;
    for(var i=0; i<0x200000; i++) { sum1 += bytes[i]; }
    var sum2 = 0;
    for(var i=0x200000; i<0x300000; i++) { sum2 += bytes[i]; }
    var sum = (sum1 + (sum2 * 2)) & 0xFFFF;
    var sumlo = sum & 0x00FF;
    var sumhi = (sum & 0xFF00) >> 8;
    var invSum = sum ^ 0xFFFF;
    var invSumlo = invSum & 0x00FF;
    var invSumhi = (invSum & 0xFF00) >> 8;
    bytes[0x7FDC] = invSumlo;
    bytes[0x7FDD] = invSumhi;
    bytes[0x7FDE] = sumlo;
    bytes[0x7FDF] = sumhi;

    return bytes
    return new Blob([bytes], {type: "octet/stream"});
}

const result = applyIpsAndDownload(nature)
console.log(result)
fs.appendFileSync('/home/chriscauley/games/_nature/new.sfc', result)