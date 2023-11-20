var l = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function N(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ee = 1 / 0, Le = "[object Symbol]", Ce = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, $e = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Z = "\\ud800-\\udfff", _e = "\\u0300-\\u036f\\ufe20-\\ufe23", Oe = "\\u20d0-\\u20f0", D = "\\u2700-\\u27bf", H = "a-z\\xdf-\\xf6\\xf8-\\xff", Ge = "\\xac\\xb1\\xd7\\xf7", je = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Ae = "\\u2000-\\u206f", ze = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", F = "A-Z\\xc0-\\xd6\\xd8-\\xde", Pe = "\\ufe0e\\ufe0f", K = Ge + je + Ae + ze, y = "['’]", E = "[" + K + "]", J = "[" + _e + Oe + "]", V = "\\d+", Ue = "[" + D + "]", Y = "[" + H + "]", q = "[^" + Z + K + V + D + H + F + "]", We = "\\ud83c[\\udffb-\\udfff]", Ie = "(?:" + J + "|" + We + ")", Ne = "[^" + Z + "]", X = "(?:\\ud83c[\\udde6-\\uddff]){2}", Q = "[\\ud800-\\udbff][\\udc00-\\udfff]", n = "[" + F + "]", Ze = "\\u200d", L = "(?:" + Y + "|" + q + ")", De = "(?:" + n + "|" + q + ")", C = "(?:" + y + "(?:d|ll|m|re|s|t|ve))?", $ = "(?:" + y + "(?:D|LL|M|RE|S|T|VE))?", ee = Ie + "?", re = "[" + Pe + "]?", He = "(?:" + Ze + "(?:" + [Ne, X, Q].join("|") + ")" + re + ee + ")*", Fe = re + ee + He, Ke = "(?:" + [Ue, X, Q].join("|") + ")" + Fe, Je = RegExp(y, "g"), Ve = RegExp(J, "g"), Ye = RegExp([
  n + "?" + Y + "+" + C + "(?=" + [E, n, "$"].join("|") + ")",
  De + "+" + $ + "(?=" + [E, n + L, "$"].join("|") + ")",
  n + "?" + L + "+" + C,
  n + "+" + $,
  V,
  Ke
].join("|"), "g"), qe = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Xe = {
  // Latin-1 Supplement block.
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  Ç: "C",
  ç: "c",
  Ð: "D",
  ð: "d",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  Ñ: "N",
  ñ: "n",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  Ý: "Y",
  ý: "y",
  ÿ: "y",
  Æ: "Ae",
  æ: "ae",
  Þ: "Th",
  þ: "th",
  ß: "ss",
  // Latin Extended-A block.
  Ā: "A",
  Ă: "A",
  Ą: "A",
  ā: "a",
  ă: "a",
  ą: "a",
  Ć: "C",
  Ĉ: "C",
  Ċ: "C",
  Č: "C",
  ć: "c",
  ĉ: "c",
  ċ: "c",
  č: "c",
  Ď: "D",
  Đ: "D",
  ď: "d",
  đ: "d",
  Ē: "E",
  Ĕ: "E",
  Ė: "E",
  Ę: "E",
  Ě: "E",
  ē: "e",
  ĕ: "e",
  ė: "e",
  ę: "e",
  ě: "e",
  Ĝ: "G",
  Ğ: "G",
  Ġ: "G",
  Ģ: "G",
  ĝ: "g",
  ğ: "g",
  ġ: "g",
  ģ: "g",
  Ĥ: "H",
  Ħ: "H",
  ĥ: "h",
  ħ: "h",
  Ĩ: "I",
  Ī: "I",
  Ĭ: "I",
  Į: "I",
  İ: "I",
  ĩ: "i",
  ī: "i",
  ĭ: "i",
  į: "i",
  ı: "i",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  ĸ: "k",
  Ĺ: "L",
  Ļ: "L",
  Ľ: "L",
  Ŀ: "L",
  Ł: "L",
  ĺ: "l",
  ļ: "l",
  ľ: "l",
  ŀ: "l",
  ł: "l",
  Ń: "N",
  Ņ: "N",
  Ň: "N",
  Ŋ: "N",
  ń: "n",
  ņ: "n",
  ň: "n",
  ŋ: "n",
  Ō: "O",
  Ŏ: "O",
  Ő: "O",
  ō: "o",
  ŏ: "o",
  ő: "o",
  Ŕ: "R",
  Ŗ: "R",
  Ř: "R",
  ŕ: "r",
  ŗ: "r",
  ř: "r",
  Ś: "S",
  Ŝ: "S",
  Ş: "S",
  Š: "S",
  ś: "s",
  ŝ: "s",
  ş: "s",
  š: "s",
  Ţ: "T",
  Ť: "T",
  Ŧ: "T",
  ţ: "t",
  ť: "t",
  ŧ: "t",
  Ũ: "U",
  Ū: "U",
  Ŭ: "U",
  Ů: "U",
  Ű: "U",
  Ų: "U",
  ũ: "u",
  ū: "u",
  ŭ: "u",
  ů: "u",
  ű: "u",
  ų: "u",
  Ŵ: "W",
  ŵ: "w",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Ź: "Z",
  Ż: "Z",
  Ž: "Z",
  ź: "z",
  ż: "z",
  ž: "z",
  Ĳ: "IJ",
  ĳ: "ij",
  Œ: "Oe",
  œ: "oe",
  ŉ: "'n",
  ſ: "ss"
}, Qe = typeof l == "object" && l && l.Object === Object && l, er = typeof self == "object" && self && self.Object === Object && self, rr = Qe || er || Function("return this")();
function ir(e, r, i, o) {
  var a = -1, t = e ? e.length : 0;
  for (o && t && (i = e[++a]); ++a < t; )
    i = r(i, e[a], a, e);
  return i;
}
function or(e) {
  return e.match(Ce) || [];
}
function ar(e) {
  return function(r) {
    return e == null ? void 0 : e[r];
  };
}
var tr = ar(Xe);
function sr(e) {
  return qe.test(e);
}
function lr(e) {
  return e.match(Ye) || [];
}
var nr = Object.prototype, ur = nr.toString, _ = rr.Symbol, O = _ ? _.prototype : void 0, G = O ? O.toString : void 0;
function cr(e) {
  if (typeof e == "string")
    return e;
  if (pr(e))
    return G ? G.call(e) : "";
  var r = e + "";
  return r == "0" && 1 / e == -Ee ? "-0" : r;
}
function dr(e) {
  return function(r) {
    return ir(br(fr(r).replace(Je, "")), e, "");
  };
}
function mr(e) {
  return !!e && typeof e == "object";
}
function pr(e) {
  return typeof e == "symbol" || mr(e) && ur.call(e) == Le;
}
function ie(e) {
  return e == null ? "" : cr(e);
}
function fr(e) {
  return e = ie(e), e && e.replace($e, tr).replace(Ve, "");
}
var gr = dr(function(e, r, i) {
  return e + (i ? "-" : "") + r.toLowerCase();
});
function br(e, r, i) {
  return e = ie(e), r = i ? void 0 : r, r === void 0 ? sr(e) ? lr(e) : or(e) : e.match(r) || [];
}
var xr = gr;
const hr = /* @__PURE__ */ N(xr);
var kr = 1 / 0, yr = "[object Symbol]", Rr = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, wr = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, x = "\\ud800-\\udfff", oe = "\\u0300-\\u036f\\ufe20-\\ufe23", ae = "\\u20d0-\\u20f0", te = "\\u2700-\\u27bf", se = "a-z\\xdf-\\xf6\\xf8-\\xff", Sr = "\\xac\\xb1\\xd7\\xf7", Br = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", vr = "\\u2000-\\u206f", Mr = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", le = "A-Z\\xc0-\\xd6\\xd8-\\xde", ne = "\\ufe0e\\ufe0f", ue = Sr + Br + vr + Mr, R = "['’]", Tr = "[" + x + "]", j = "[" + ue + "]", g = "[" + oe + ae + "]", ce = "\\d+", Er = "[" + te + "]", de = "[" + se + "]", me = "[^" + x + ue + ce + te + se + le + "]", k = "\\ud83c[\\udffb-\\udfff]", Lr = "(?:" + g + "|" + k + ")", pe = "[^" + x + "]", w = "(?:\\ud83c[\\udde6-\\uddff]){2}", S = "[\\ud800-\\udbff][\\udc00-\\udfff]", u = "[" + le + "]", fe = "\\u200d", A = "(?:" + de + "|" + me + ")", Cr = "(?:" + u + "|" + me + ")", z = "(?:" + R + "(?:d|ll|m|re|s|t|ve))?", P = "(?:" + R + "(?:D|LL|M|RE|S|T|VE))?", ge = Lr + "?", be = "[" + ne + "]?", $r = "(?:" + fe + "(?:" + [pe, w, S].join("|") + ")" + be + ge + ")*", xe = be + ge + $r, _r = "(?:" + [Er, w, S].join("|") + ")" + xe, Or = "(?:" + [pe + g + "?", g, w, S, Tr].join("|") + ")", Gr = RegExp(R, "g"), jr = RegExp(g, "g"), Ar = RegExp(k + "(?=" + k + ")|" + Or + xe, "g"), zr = RegExp([
  u + "?" + de + "+" + z + "(?=" + [j, u, "$"].join("|") + ")",
  Cr + "+" + P + "(?=" + [j, u + A, "$"].join("|") + ")",
  u + "?" + A + "+" + z,
  u + "+" + P,
  ce,
  _r
].join("|"), "g"), Pr = RegExp("[" + fe + x + oe + ae + ne + "]"), Ur = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Wr = {
  // Latin-1 Supplement block.
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  Ç: "C",
  ç: "c",
  Ð: "D",
  ð: "d",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  Ñ: "N",
  ñ: "n",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  Ý: "Y",
  ý: "y",
  ÿ: "y",
  Æ: "Ae",
  æ: "ae",
  Þ: "Th",
  þ: "th",
  ß: "ss",
  // Latin Extended-A block.
  Ā: "A",
  Ă: "A",
  Ą: "A",
  ā: "a",
  ă: "a",
  ą: "a",
  Ć: "C",
  Ĉ: "C",
  Ċ: "C",
  Č: "C",
  ć: "c",
  ĉ: "c",
  ċ: "c",
  č: "c",
  Ď: "D",
  Đ: "D",
  ď: "d",
  đ: "d",
  Ē: "E",
  Ĕ: "E",
  Ė: "E",
  Ę: "E",
  Ě: "E",
  ē: "e",
  ĕ: "e",
  ė: "e",
  ę: "e",
  ě: "e",
  Ĝ: "G",
  Ğ: "G",
  Ġ: "G",
  Ģ: "G",
  ĝ: "g",
  ğ: "g",
  ġ: "g",
  ģ: "g",
  Ĥ: "H",
  Ħ: "H",
  ĥ: "h",
  ħ: "h",
  Ĩ: "I",
  Ī: "I",
  Ĭ: "I",
  Į: "I",
  İ: "I",
  ĩ: "i",
  ī: "i",
  ĭ: "i",
  į: "i",
  ı: "i",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  ĸ: "k",
  Ĺ: "L",
  Ļ: "L",
  Ľ: "L",
  Ŀ: "L",
  Ł: "L",
  ĺ: "l",
  ļ: "l",
  ľ: "l",
  ŀ: "l",
  ł: "l",
  Ń: "N",
  Ņ: "N",
  Ň: "N",
  Ŋ: "N",
  ń: "n",
  ņ: "n",
  ň: "n",
  ŋ: "n",
  Ō: "O",
  Ŏ: "O",
  Ő: "O",
  ō: "o",
  ŏ: "o",
  ő: "o",
  Ŕ: "R",
  Ŗ: "R",
  Ř: "R",
  ŕ: "r",
  ŗ: "r",
  ř: "r",
  Ś: "S",
  Ŝ: "S",
  Ş: "S",
  Š: "S",
  ś: "s",
  ŝ: "s",
  ş: "s",
  š: "s",
  Ţ: "T",
  Ť: "T",
  Ŧ: "T",
  ţ: "t",
  ť: "t",
  ŧ: "t",
  Ũ: "U",
  Ū: "U",
  Ŭ: "U",
  Ů: "U",
  Ű: "U",
  Ų: "U",
  ũ: "u",
  ū: "u",
  ŭ: "u",
  ů: "u",
  ű: "u",
  ų: "u",
  Ŵ: "W",
  ŵ: "w",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Ź: "Z",
  Ż: "Z",
  Ž: "Z",
  ź: "z",
  ż: "z",
  ž: "z",
  Ĳ: "IJ",
  ĳ: "ij",
  Œ: "Oe",
  œ: "oe",
  ŉ: "'n",
  ſ: "ss"
}, Ir = typeof l == "object" && l && l.Object === Object && l, Nr = typeof self == "object" && self && self.Object === Object && self, Zr = Ir || Nr || Function("return this")();
function Dr(e, r, i, o) {
  var a = -1, t = e ? e.length : 0;
  for (o && t && (i = e[++a]); ++a < t; )
    i = r(i, e[a], a, e);
  return i;
}
function Hr(e) {
  return e.split("");
}
function Fr(e) {
  return e.match(Rr) || [];
}
function Kr(e) {
  return function(r) {
    return e == null ? void 0 : e[r];
  };
}
var Jr = Kr(Wr);
function he(e) {
  return Pr.test(e);
}
function Vr(e) {
  return Ur.test(e);
}
function Yr(e) {
  return he(e) ? qr(e) : Hr(e);
}
function qr(e) {
  return e.match(Ar) || [];
}
function Xr(e) {
  return e.match(zr) || [];
}
var Qr = Object.prototype, ei = Qr.toString, U = Zr.Symbol, W = U ? U.prototype : void 0, I = W ? W.toString : void 0;
function ri(e, r, i) {
  var o = -1, a = e.length;
  r < 0 && (r = -r > a ? 0 : a + r), i = i > a ? a : i, i < 0 && (i += a), a = r > i ? 0 : i - r >>> 0, r >>>= 0;
  for (var t = Array(a); ++o < a; )
    t[o] = e[o + r];
  return t;
}
function ii(e) {
  if (typeof e == "string")
    return e;
  if (li(e))
    return I ? I.call(e) : "";
  var r = e + "";
  return r == "0" && 1 / e == -kr ? "-0" : r;
}
function oi(e, r, i) {
  var o = e.length;
  return i = i === void 0 ? o : i, !r && i >= o ? e : ri(e, r, i);
}
function ai(e) {
  return function(r) {
    r = B(r);
    var i = he(r) ? Yr(r) : void 0, o = i ? i[0] : r.charAt(0), a = i ? oi(i, 1).join("") : r.slice(1);
    return o[e]() + a;
  };
}
function ti(e) {
  return function(r) {
    return Dr(di(ni(r).replace(Gr, "")), e, "");
  };
}
function si(e) {
  return !!e && typeof e == "object";
}
function li(e) {
  return typeof e == "symbol" || si(e) && ei.call(e) == yr;
}
function B(e) {
  return e == null ? "" : ii(e);
}
function ni(e) {
  return e = B(e), e && e.replace(wr, Jr).replace(jr, "");
}
var ui = ti(function(e, r, i) {
  return e + (i ? " " : "") + ci(r);
}), ci = ai("toUpperCase");
function di(e, r, i) {
  return e = B(e), r = i ? void 0 : r, r === void 0 ? Vr(e) ? Xr(e) : Fr(e) : e.match(r) || [];
}
var mi = ui;
const m = /* @__PURE__ */ N(mi), vi = {
  //crater
  GreenPiratesShaftBottomRight: "red",
  KihunterRight: "yellow",
  KihunterBottom: "yellow",
  FlywayRight: "red",
  LandingSiteTopRight: "yellow",
  LandingSiteRight: "green",
  ClimbRight: "yellow",
  ConstructionZoneRight: "red",
  //crocomire
  PostCrocomireUpperLeft: "red",
  PostCrocomireShaftRight: "red",
  //east-maridia
  LeCoudeBottom: "yellow",
  DraygonSaveRefillStation: "hidden",
  ForgottenHighwaySaveStation: "hidden",
  OasisTop: "green",
  ColosseumBottomRight: "green",
  PlasmaSparkBottom: "green",
  MaridiaAqueductSaveStation: "hidden",
  //green-brinstar
  EarlySupersRight: "red",
  NoobBridgeRight: "green",
  GreenHillZoneTopRight: "yellow",
  EtecoonEnergyTankLeft: "green",
  MainShaftBottomRight: "red",
  BigPinkTopRight: "red",
  MainShaftRight: "red",
  GreenBrinstarSaveStation: "hidden",
  GreenBrinstarMissileRefill: "hidden",
  BigPinkBottomRight: "green",
  BigPinkBottomLeft: "red",
  BigPinkRight: "yellow",
  //kraids-lair
  KraidRefillStation: "hidden",
  //lower-norfair
  RedKihunterShaftBottom: "yellow",
  WastelandLeft: "green",
  //red-brinstar
  RedBrinstarElevatorTop: "yellow",
  RedTowerElevatorTopLeft: "green",
  RedTowerElevatorLeft: "yellow",
  RedTowerElevatorBottomLeft: "green",
  RedBrinstarFirefleaLeft: "yellow",
  BelowSpazerTopRight: "green",
  RedTowerLeft: "blue",
  MaridiaBottomSaveStation: "hidden",
  RedBrinstarEnergyRefill: "hidden",
  //upper-norfair
  BusinessCenterBottomLeft: "red",
  BusinessCenterTopLeft: "green",
  CathedralEntranceRight: "red",
  BubbleMountainTopRight: "green",
  BubbleMountainTopLeft: "green",
  SpeedBoosterHallRight: "red",
  CrocomireSpeedwayBottom: "green",
  CathedralRight: "green",
  SingleChamberRight: "red",
  DoubleChamberRight: "red",
  KronicBoostBottomLeft: "yellow",
  //west-maridia
  FishTankRight: "red",
  MainStreetBottomRight: "red",
  CrabShaftRight: "green",
  //wrecked-ship
  WreckedShipMainShaftBottom: "green",
  WestOceanRight: "green",
  ElectricDeathRoomTopLeft: "red"
}, Mi = {
  grey: "empty",
  red: "missile",
  green: "super-missile",
  yellow: "power-bomb",
  ice: "ice-beam",
  wave: "wave-beam",
  plasma: "plasma-beam",
  spazer: "spazer-beam"
  // white: 'empty',
}, v = ["missile", "super-missile", "power-bomb"], M = ["energy-tank", "reserve-tank"], ke = ["charge-beam", "ice-beam", "wave-beam", "spazer-beam", "plasma-beam"], ye = ["varia-suit", "gravity-suit"], Re = [
  "morph-ball",
  "bomb",
  "spring-ball",
  "screw-attack",
  "hi-jump-boots",
  "space-jump",
  "speed-booster",
  "grappling-beam",
  "x-ray"
], pi = ["nothing"], fi = { nothing: pi, ammo: v, energy: M, beams: ke, suits: ye, items: Re }, Ti = Object.entries(fi).map(([e, r]) => ({
  slug: e,
  name: m(e),
  items: r.map((i) => ({ name: m(
    i.replace(/(-beam|-boots|-missile)/, "").replace("x-ray", "x-ray-scope")
  ), item_slug: i }))
})), gi = [...v, ...M, ...ke, ...ye, ...Re], bi = [
  "westSandHallLeft",
  "belowBotwoonEnergyTankRight",
  "westSandHallTunnelRight"
], xi = [
  "tourianEscapeRoom4TopRight",
  "climbBottomLeft",
  "greenBrinstarMainShaftTopLeft",
  "basementLeft",
  "businessCenterMidLeft",
  "crabHoleBottomRight"
], d = {
  area: [
    ["lowerMushroomsLeft", "greenBrinstarElevator"],
    ["greenPiratesShaftBottomRight", "goldenFour"],
    ["crabMazeLeft", "leCoudeRight"],
    ["noobBridgeRight", "redTowerTopLeft"],
    ["caterpillarRoomTopRight", "redFishRoomLeft"],
    ["redBrinstarElevator", "keyhunterRoomBottom"],
    ["moatRight", "westOceanLeft"],
    ["morphBallRoomLeft", "greenHillZoneTopRight"],
    ["mainStreetBottom", "glassTunnelTop"],
    ["warehouseZeelaRoomLeft", "warehouseEntranceRight"],
    ["threeMuskateersRoomLeft", "singleChamberTopRight"],
    ["lavaDiveRight", "kronicBoostRoomBottomLeft"],
    ["crabHoleBottomLeft", "eastTunnelTopRight"],
    ["crabShaftRight", "aqueductTopLeft"],
    ["warehouseEntranceLeft", "eastTunnelRight"],
    ["crocomireSpeedwayBottom", "crocomireRoomTop"]
  ],
  boss: [
    ["phantoonRoomOut", "phantoonRoomIn"],
    ["ridleyRoomOut", "ridleyRoomIn"],
    ["kraidRoomOut", "kraidRoomIn"],
    ["draygonRoomOut", "draygonRoomIn"]
  ],
  map: {}
}, we = ([e, r]) => {
  d.map[e] = r, d.map[r] = e;
};
d.area.forEach(we);
d.boss.forEach(we);
const T = (e) => e.reduce((r, i) => [...r, ...i], []), hi = T(d.area), ki = T(d.boss), yi = {
  crater: [
    "EnergyTankGauntlet",
    "Bomb",
    "EnergyTankTerminator",
    "MorphingBall",
    "EnergyTankBrinstarCeiling",
    "PowerBombCrateriasurface",
    "MissileCrateriamoat",
    "MissileCrateriabottom",
    "MissileCrateriagauntletright",
    "MissileCrateriagauntletleft",
    "SuperMissileCrateria",
    "MissileCrateriamiddle",
    "PowerBombgreenBrinstarbottom",
    "PowerBombblueBrinstar",
    "MissileblueBrinstarmiddle",
    "MissileblueBrinstarbottom",
    "MissileblueBrinstartop",
    "MissileblueBrinstarbehindmissile"
  ],
  crocomire: [
    "EnergyTankCrocomire",
    "GrappleBeam",
    "PowerBombCrocomire",
    "MissilebelowCrocomire",
    "MissileGrappleBeam"
  ],
  "east-maridia": [
    "EnergyTankMamaturtle",
    "PlasmaBeam",
    "ReserveTankMaridia",
    "SpringBall",
    "EnergyTankBotwoon",
    "MissileleftMaridiasandpitroom",
    "MissilerightMaridiasandpitroom",
    "PowerBombrightMaridiasandpitroom",
    "MissilepinkMaridia",
    "SuperMissilepinkMaridia",
    "MissileDraygon"
  ],
  draygon: ["SpaceJump"],
  "green-brinstar": [
    "ReserveTankBrinstar",
    "ChargeBeam",
    "EnergyTankEtecoons",
    "EnergyTankWaterway",
    "EnergyTankBrinstarGate",
    "SuperMissilepinkBrinstar",
    "MissilegreenBrinstarbelowsupermissile",
    "SuperMissilegreenBrinstartop",
    "MissilegreenBrinstarbehindmissile",
    "MissilegreenBrinstarbehindreservetank",
    "MissilepinkBrinstartop",
    "MissilepinkBrinstarbottom",
    "PowerBombpinkBrinstar",
    "MissilegreenBrinstarpipe",
    "SuperMissilegreenBrinstarbottom"
  ],
  "kraids-lair": ["EnergyTankKraid", "MissileKraid"],
  kraid: ["VariaSuit"],
  "lower-norfair": [
    "ScrewAttack",
    "MissileGoldTorizo",
    "SuperMissileGoldTorizo",
    "MissileMickeyMouseroom",
    "MissilelowerNorfairabovefireflearoom",
    "PowerBomblowerNorfairabovefireflearoom",
    "PowerBombPowerBombsofshame",
    "MissilelowerNorfairnearWaveBeam"
  ],
  "red-brinstar": [
    "XRayScope",
    "Spazer",
    "PowerBombredBrinstarsidehopperroom",
    "PowerBombredBrinstarspikeroom",
    "MissileredBrinstarspikeroom"
  ],
  ridley: ["EnergyTankRidley"],
  "upper-norfair": [
    "IceBeam",
    "HiJumpBoots",
    "ReserveTankNorfair",
    "SpeedBooster",
    "WaveBeam",
    "EnergyTankFirefleas",
    "MissileNorfairReserveTank",
    "MissilebubbleNorfairgreendoor",
    "MissilebubbleNorfair",
    "MissileSpeedBooster",
    "MissileWaveBeam",
    "Missilelavaroom",
    "MissilebelowIceBeam",
    "MissileaboveCrocomire",
    "MissileHiJumpBoots",
    "EnergyTankHiJumpBoots"
  ],
  "west-maridia": [
    "MissilegreenMaridiashinespark",
    "SuperMissilegreenMaridia",
    "MissilegreenMaridiatatori",
    "SuperMissileyellowMaridia",
    "MissileyellowMaridiasupermissile",
    "MissileyellowMaridiafalsewall"
  ],
  phantoon: [],
  "wrecked-ship": [
    "ReserveTankWreckedShip",
    "EnergyTankWreckedShip",
    "RightSuperWreckedShip",
    "GravitySuit",
    "MissileoutsideWreckedShipbottom",
    "MissileoutsideWreckedShiptop",
    "MissileoutsideWreckedShipmiddle",
    "MissileWreckedShipmiddle",
    "MissileGravitySuit",
    "MissileWreckedShiptop",
    "SuperMissileWreckedShipleft"
  ],
  tourian: []
}, Ei = {
  crater: "a",
  // crAteria
  crocomire: "o",
  // crOc
  "east-maridia": "e",
  "green-brinstar": "g",
  "kraids-lair": "k",
  "lower-norfair": "l",
  "red-brinstar": "r",
  "upper-norfair": "u",
  "west-maridia": "w",
  "wrecked-ship": "p",
  // Phantoon
  tourian: "t"
}, Ri = {
  Kraid: "kraids-lair",
  Crocomire: "crocomize",
  SporeSpawn: "green-brinstar",
  Draygon: "draygon",
  Botwoon: "east-maridia",
  Ridley: "ridley",
  GoldenTorizo: "lower-norfair",
  Phantoon: "wrecked-ship",
  MotherBrain: "tourian"
}, Se = ["kraid", "phantoon", "draygon", "ridley", "mother-brain"], Be = ["crocomire", "spore-spawn", "botwoon", "golden-torizo", "bomb-torizo"], Li = {
  draygon: "east-maridia",
  phantoon: "wrecked-ship",
  kraid: "kraids-lair",
  ridley: "lower-norfair"
}, ve = [
  ...T(Object.values(yi)),
  ...Object.keys(Ri)
], p = {};
ve.forEach((e) => p[e] = "location");
ki.forEach((e) => p[e] = "boss");
hi.forEach((e) => p[e] = "area");
bi.forEach((e) => p[e] = "sand");
xi.forEach((e) => p[e] = "escape");
const Ci = ["kraid", "phantoon", "draygon", "ridley"], h = {
  GoldTorizo: "miniboss"
  // Varia has this as gold in some places, golden in others
};
ve.forEach((e) => h[e] = "item");
const Me = (e) => m(e).replace(" ", "");
Be.forEach((e) => h[Me(e)] = "miniboss");
Se.forEach((e) => h[Me(e)] = "boss");
const $i = [
  "LandingSiteRight",
  "LandingSiteTopRight",
  "KihunterBottom",
  "KihunterRight",
  "FlywayRight",
  "GreenPiratesShaftBottomRight",
  "RedBrinstarElevatorTop",
  "ClimbRight",
  "ConstructionZoneRight",
  "GreenHillZoneTopRight",
  "NoobBridgeRight",
  "MainShaftRight",
  "MainShaftBottomRight",
  "EarlySupersRight",
  "EtecoonEnergyTankLeft",
  "BigPinkTopRight",
  "BigPinkRight",
  "BigPinkBottomRight",
  "BigPinkBottomLeft",
  "RedTowerLeft",
  "RedBrinstarFirefleaLeft",
  "RedTowerElevatorTopLeft",
  "RedTowerElevatorLeft",
  "RedTowerElevatorBottomLeft",
  "BelowSpazerTopRight",
  "WestOceanRight",
  "LeCoudeBottom",
  "WreckedShipMainShaftBottom",
  "ElectricDeathRoomTopLeft",
  "BusinessCenterTopLeft",
  "BusinessCenterBottomLeft",
  "CathedralEntranceRight",
  "CathedralRight",
  "BubbleMountainTopRight",
  "BubbleMountainTopLeft",
  "SpeedBoosterHallRight",
  "SingleChamberRight",
  "DoubleChamberRight",
  "KronicBoostBottomLeft",
  "CrocomireSpeedwayBottom",
  "PostCrocomireUpperLeft",
  "PostCrocomireShaftRight",
  "RedKihunterShaftBottom",
  "WastelandLeft",
  "MainStreetBottomRight",
  "FishTankRight",
  "CrabShaftRight",
  "ColosseumBottomRight",
  "PlasmaSparkBottom",
  "OasisTop",
  "GreenBrinstarSaveStation",
  "MaridiaBottomSaveStation",
  "MaridiaAqueductSaveStation",
  "ForgottenHighwaySaveStation",
  "DraygonSaveRefillStation",
  "KraidRefillStation",
  "RedBrinstarEnergyRefill",
  "GreenBrinstarMissileRefill"
], Te = {
  "kill kraid": {
    id: "kill kraid",
    category: "bosses",
    exclusions: ["kill all G4", "kill one G4"],
    is_count: !0
  },
  "kill phantoon": {
    id: "kill phantoon",
    category: "bosses",
    exclusions: ["kill all G4", "kill one G4"],
    is_count: !0
  },
  "kill draygon": {
    id: "kill draygon",
    category: "bosses",
    exclusions: ["kill all G4", "kill one G4"],
    is_count: !0
  },
  "kill ridley": {
    id: "kill ridley",
    category: "bosses",
    exclusions: ["kill all G4", "kill one G4"],
    is_count: !0
  },
  "kill one G4": {
    id: "kill one G4",
    category: "bosses",
    category_limit: 0,
    exclusions: [
      "kill kraid",
      "kill phantoon",
      "kill draygon",
      "kill ridley",
      "kill all G4",
      "kill two G4",
      "kill three G4"
    ]
  },
  "kill two G4": {
    id: "kill two G4",
    category: "bosses",
    category_limit: 1,
    exclusions: ["kill all G4", "kill one G4", "kill three G4"]
  },
  "kill three G4": {
    id: "kill three G4",
    category: "bosses",
    category_limit: 2,
    exclusions: ["kill all G4", "kill one G4", "kill two G4"]
  },
  "kill all G4": {
    id: "kill all G4",
    category: "bosses",
    exclusions: [
      "kill kraid",
      "kill phantoon",
      "kill draygon",
      "kill ridley",
      "kill one G4",
      "kill two G4",
      "kill three G4"
    ]
  },
  "kill spore spawn": {
    id: "kill spore spawn",
    category: "minibosses",
    exclusions: ["kill all mini bosses", "kill one miniboss"],
    is_count: !0
  },
  "kill botwoon": {
    id: "kill botwoon",
    category: "minibosses",
    exclusions: ["kill all mini bosses", "kill one miniboss"],
    is_count: !0
  },
  "kill crocomire": {
    id: "kill crocomire",
    category: "minibosses",
    exclusions: ["kill all mini bosses", "kill one miniboss"],
    is_count: !0
  },
  "kill golden torizo": {
    id: "kill golden torizo",
    category: "minibosses",
    exclusions: ["kill all mini bosses", "kill one miniboss"],
    is_count: !0
  },
  "kill one miniboss": {
    id: "kill one miniboss",
    category: "minibosses",
    category_limit: 0,
    exclusions: [
      "kill spore spawn",
      "kill botwoon",
      "kill crocomire",
      "kill golden torizo",
      "kill all mini bosses",
      "kill two minibosses",
      "kill three minibosses"
    ]
  },
  "kill two minibosses": {
    id: "kill two minibosses",
    category: "minibosses",
    category_limit: 1,
    exclusions: ["kill all mini bosses", "kill one miniboss", "kill three minibosses"]
  },
  "kill three minibosses": {
    id: "kill three minibosses",
    category: "minibosses",
    category_limit: 2,
    exclusions: ["kill all mini bosses", "kill one miniboss", "kill two minibosses"]
  },
  "kill all mini bosses": {
    id: "kill all mini bosses",
    category: "minibosses",
    exclusions: [
      "kill spore spawn",
      "kill botwoon",
      "kill crocomire",
      "kill golden torizo",
      "kill one miniboss",
      "kill two minibosses",
      "kill three minibosses"
    ]
  },
  "collect 25% items": {
    id: "collect 25% items",
    category: "items",
    exclusions: ["collect 50% items", "collect 75% items", "collect 100% items"]
  },
  "collect 50% items": {
    id: "collect 50% items",
    category: "items",
    exclusions: ["collect 25% items", "collect 75% items", "collect 100% items"]
  },
  "collect 75% items": {
    id: "collect 75% items",
    category: "items",
    exclusions: ["collect 25% items", "collect 50% items", "collect 100% items"]
  },
  "collect 100% items": {
    id: "collect 100% items",
    category: "items",
    exclusions: [
      "collect 25% items",
      "collect 50% items",
      "collect 75% items",
      "collect all upgrades",
      "clear crateria",
      "clear green brinstar",
      "clear red brinstar",
      "clear wrecked ship",
      "clear kraid's lair",
      "clear upper norfair",
      "clear croc's lair",
      "clear lower norfair",
      "clear west maridia",
      "clear east maridia"
    ]
  },
  "collect all upgrades": { id: "collect all upgrades", category: "items" },
  "clear crateria": { id: "clear crateria", category: "items", disable_tourian: !0 },
  "clear green brinstar": { id: "clear green brinstar", category: "items", disable_tourian: !0 },
  "clear red brinstar": { id: "clear red brinstar", category: "items", disable_tourian: !0 },
  "clear wrecked ship": { id: "clear wrecked ship", category: "items", disable_tourian: !0 },
  "clear kraid's lair": { id: "clear kraid's lair", category: "items", disable_tourian: !0 },
  "clear upper norfair": { id: "clear upper norfair", category: "items", disable_tourian: !0 },
  "clear croc's lair": { id: "clear croc's lair", category: "items", disable_tourian: !0 },
  "clear lower norfair": { id: "clear lower norfair", category: "items", disable_tourian: !0 },
  "clear west maridia": { id: "clear west maridia", category: "items", disable_tourian: !0 },
  "clear east maridia": { id: "clear east maridia", category: "items", disable_tourian: !0 },
  "explore 25% map": {
    id: "explore 25% map",
    category: "map",
    exclusions: ["explore 50% map", "explore 75% map", "explore 100% map"]
  },
  "explore 50% map": {
    id: "explore 50% map",
    category: "map",
    exclusions: ["explore 25% map", "explore 75% map", "explore 100% map"]
  },
  "explore 75% map": {
    id: "explore 75% map",
    category: "map",
    exclusions: ["explore 50% map", "explore 25% map", "explore 100% map"]
  },
  "explore 100% map": {
    id: "explore 100% map",
    category: "map",
    exclusions: [
      "explore 50% map",
      "explore 75% map",
      "explore 25% map",
      "explore crateria",
      "explore green brinstar",
      "explore red brinstar",
      "explore wrecked ship",
      "explore kraid's lair",
      "explore upper norfair",
      "explore croc's lair",
      "explore lower norfair",
      "explore west maridia",
      "explore east maridia"
    ]
  },
  "explore crateria": { id: "explore crateria", category: "map" },
  "explore green brinstar": { id: "explore green brinstar", category: "map" },
  "explore red brinstar": { id: "explore red brinstar", category: "map" },
  "explore wrecked ship": { id: "explore wrecked ship", category: "map" },
  "explore kraid's lair": { id: "explore kraid's lair", category: "map" },
  "explore upper norfair": { id: "explore upper norfair", category: "map" },
  "explore croc's lair": { id: "explore croc's lair", category: "map" },
  "explore lower norfair": { id: "explore lower norfair", category: "map" },
  "explore west maridia": { id: "explore west maridia", category: "map" },
  "explore east maridia": { id: "explore east maridia", category: "map" },
  "tickle the red fish": { id: "tickle the red fish", category: "memes" },
  "kill the orange geemer": { id: "kill the orange geemer", category: "memes" },
  "kill shaktool": { id: "kill shaktool", category: "memes" },
  "activate chozo robots": { id: "activate chozo robots", category: "memes" },
  "visit the animals": { id: "visit the animals", category: "memes" },
  "kill king cacatac": { id: "kill king cacatac", category: "memes" },
  "kill all space pirates": {
    id: "kill all space pirates",
    category: "enemies"
  },
  "kill all ki hunters": {
    id: "kill all ki hunters",
    category: "enemies"
  },
  "kill all beetoms": {
    id: "kill all beetoms",
    category: "enemies"
  },
  "kill all cacatacs": {
    id: "kill all cacatacs",
    category: "enemies"
  },
  "kill all kagos": {
    id: "kill all kagos",
    category: "enemies"
  },
  "kill all yapping maws": {
    id: "kill all yapping maws",
    category: "enemies"
  }
}, b = {
  "charge-beam": "Charge",
  "energy-tank": "ETank",
  "grappling-beam": "Grapple",
  "gravity-suit": "Gravity",
  "hi-jump-boots": "HiJump",
  "ice-beam": "Ice",
  "morph-ball": "Morph",
  "plasma-beam": "Plasma",
  "reserve-tank": "Reserve",
  "screw-attack": "ScrewAttack",
  "spazer-beam": "Spazer",
  "super-missile": "Super",
  "varia-suit": "Varia",
  "wave-beam": "Wave",
  "x-ray": "XRayScope",
  nothing: "Nothing",
  noenergy: "NoEnergy",
  "crystal-flash": "CrystalFlash",
  "": ""
}, wi = [gi, Se, Be];
wi.forEach(
  (e) => e.forEach((r) => {
    b[r] = b[r] || m(r).replace(/ /g, "");
  })
);
const c = {};
v.forEach((e) => c[e] = 5);
M.forEach((e) => c[e] = 1);
const Si = (e) => Object.fromEntries(Object.entries(e).map(([r, i]) => [i, r])), s = {
  sm_to_varia: b,
  varia_to_sm: Si(b),
  getGameState: (e, r, i) => {
    if (!e)
      return null;
    const o = {
      inventory: {},
      locations: {},
      warps: e.lines,
      locked_warps: { ...i }
    };
    return r ? Object.entries(r).forEach(([a, t]) => {
      const f = s.variaToSm(a);
      c[f] ? o.inventory[f] = t * c[f] : o.inventory[f] = !0;
    }) : e.collectedItems.forEach((a) => {
      const t = s.variaToSm(a);
      c[t] ? o.inventory[t] = (o.inventory[t] || 0) + c[t] : o.inventory[t] = !0;
    }), o;
  },
  variaToSm(e) {
    const r = s.varia_to_sm[e];
    return r === void 0 && console.error(`Unknown varia_slug: ${e}`), r || e;
  },
  smToVaria(e) {
    const r = s.sm_to_varia[e];
    return r === void 0 && console.error(`Unknown slug: ${e}`), r || e;
  },
  variaToDisplay(e) {
    return m(s.variaToSm(e));
  },
  getIcon(e) {
    if (e === "GoldTorizo")
      return "smv-boss -map-icon -golden-torizo";
    const r = s.variaToSm(e), i = h[e];
    return i === "boss" || i === "miniboss" ? `smv-boss -map-icon -${r}` : `sm-item -${r}`;
  },
  // Objectives are currently taken from repo but will eventually be pulled in from server
  loadObjectives: (e) => {
    const r = {};
    Object.values(Te).forEach((i) => {
      i.icon = `smv-objective -${Bi(i.id)}`;
      const { category: o } = i;
      r[o] = r[o] || [], r[o].push(i);
    }), s.objective = { by_id: e, by_category: r };
  }
}, Bi = (e) => hr(e.toLowerCase().replace("'", ""));
s.loadObjectives(Te);
export {
  hi as access_points,
  gi as all_items,
  ve as all_locations,
  v as ammo,
  ke as beams,
  ki as boss_doors,
  Se as bosses,
  Ei as default_area_keys,
  vi as default_door_colors,
  Mi as door_item_by_color,
  $i as doors,
  M as energy,
  xi as escape_doors,
  Ci as golden_four,
  fi as items_by_group,
  h as location_type_map,
  yi as locations_by_area,
  Be as minibosses,
  bi as sand_doors,
  Li as subarea_by_area,
  d as vanilla_warps,
  s as varia,
  Ti as varia_item_groups,
  p as warp_type_map
};
