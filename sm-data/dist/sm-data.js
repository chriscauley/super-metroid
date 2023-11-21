var n = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function N(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Te = 1 / 0, Ee = "[object Symbol]", Le = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ce = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Z = "\\ud800-\\udfff", $e = "\\u0300-\\u036f\\ufe20-\\ufe23", _e = "\\u20d0-\\u20f0", D = "\\u2700-\\u27bf", H = "a-z\\xdf-\\xf6\\xf8-\\xff", Oe = "\\xac\\xb1\\xd7\\xf7", Ge = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", je = "\\u2000-\\u206f", Ae = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", F = "A-Z\\xc0-\\xd6\\xd8-\\xde", ze = "\\ufe0e\\ufe0f", K = Oe + Ge + je + Ae, y = "['’]", E = "[" + K + "]", J = "[" + $e + _e + "]", V = "\\d+", Pe = "[" + D + "]", Y = "[" + H + "]", q = "[^" + Z + K + V + D + H + F + "]", Ue = "\\ud83c[\\udffb-\\udfff]", We = "(?:" + J + "|" + Ue + ")", Ie = "[^" + Z + "]", X = "(?:\\ud83c[\\udde6-\\uddff]){2}", Q = "[\\ud800-\\udbff][\\udc00-\\udfff]", l = "[" + F + "]", Ne = "\\u200d", L = "(?:" + Y + "|" + q + ")", Ze = "(?:" + l + "|" + q + ")", C = "(?:" + y + "(?:d|ll|m|re|s|t|ve))?", $ = "(?:" + y + "(?:D|LL|M|RE|S|T|VE))?", ee = We + "?", re = "[" + ze + "]?", De = "(?:" + Ne + "(?:" + [Ie, X, Q].join("|") + ")" + re + ee + ")*", He = re + ee + De, Fe = "(?:" + [Pe, X, Q].join("|") + ")" + He, Ke = RegExp(y, "g"), Je = RegExp(J, "g"), Ve = RegExp([
  l + "?" + Y + "+" + C + "(?=" + [E, l, "$"].join("|") + ")",
  Ze + "+" + $ + "(?=" + [E, l + L, "$"].join("|") + ")",
  l + "?" + L + "+" + C,
  l + "+" + $,
  V,
  Fe
].join("|"), "g"), Ye = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, qe = {
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
}, Xe = typeof n == "object" && n && n.Object === Object && n, Qe = typeof self == "object" && self && self.Object === Object && self, er = Xe || Qe || Function("return this")();
function rr(e, r, o, t) {
  var i = -1, a = e ? e.length : 0;
  for (t && a && (o = e[++i]); ++i < a; )
    o = r(o, e[i], i, e);
  return o;
}
function or(e) {
  return e.match(Le) || [];
}
function ir(e) {
  return function(r) {
    return e == null ? void 0 : e[r];
  };
}
var tr = ir(qe);
function ar(e) {
  return Ye.test(e);
}
function sr(e) {
  return e.match(Ve) || [];
}
var nr = Object.prototype, lr = nr.toString, _ = er.Symbol, O = _ ? _.prototype : void 0, G = O ? O.toString : void 0;
function ur(e) {
  if (typeof e == "string")
    return e;
  if (mr(e))
    return G ? G.call(e) : "";
  var r = e + "";
  return r == "0" && 1 / e == -Te ? "-0" : r;
}
function cr(e) {
  return function(r) {
    return rr(gr(pr(r).replace(Ke, "")), e, "");
  };
}
function dr(e) {
  return !!e && typeof e == "object";
}
function mr(e) {
  return typeof e == "symbol" || dr(e) && lr.call(e) == Ee;
}
function oe(e) {
  return e == null ? "" : ur(e);
}
function pr(e) {
  return e = oe(e), e && e.replace(Ce, tr).replace(Je, "");
}
var fr = cr(function(e, r, o) {
  return e + (o ? "-" : "") + r.toLowerCase();
});
function gr(e, r, o) {
  return e = oe(e), r = o ? void 0 : r, r === void 0 ? ar(e) ? sr(e) : or(e) : e.match(r) || [];
}
var br = fr;
const xr = /* @__PURE__ */ N(br);
var hr = 1 / 0, kr = "[object Symbol]", yr = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Rr = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, x = "\\ud800-\\udfff", ie = "\\u0300-\\u036f\\ufe20-\\ufe23", te = "\\u20d0-\\u20f0", ae = "\\u2700-\\u27bf", se = "a-z\\xdf-\\xf6\\xf8-\\xff", wr = "\\xac\\xb1\\xd7\\xf7", Sr = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Br = "\\u2000-\\u206f", vr = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", ne = "A-Z\\xc0-\\xd6\\xd8-\\xde", le = "\\ufe0e\\ufe0f", ue = wr + Sr + Br + vr, R = "['’]", Mr = "[" + x + "]", j = "[" + ue + "]", g = "[" + ie + te + "]", ce = "\\d+", Tr = "[" + ae + "]", de = "[" + se + "]", me = "[^" + x + ue + ce + ae + se + ne + "]", k = "\\ud83c[\\udffb-\\udfff]", Er = "(?:" + g + "|" + k + ")", pe = "[^" + x + "]", w = "(?:\\ud83c[\\udde6-\\uddff]){2}", S = "[\\ud800-\\udbff][\\udc00-\\udfff]", u = "[" + ne + "]", fe = "\\u200d", A = "(?:" + de + "|" + me + ")", Lr = "(?:" + u + "|" + me + ")", z = "(?:" + R + "(?:d|ll|m|re|s|t|ve))?", P = "(?:" + R + "(?:D|LL|M|RE|S|T|VE))?", ge = Er + "?", be = "[" + le + "]?", Cr = "(?:" + fe + "(?:" + [pe, w, S].join("|") + ")" + be + ge + ")*", xe = be + ge + Cr, $r = "(?:" + [Tr, w, S].join("|") + ")" + xe, _r = "(?:" + [pe + g + "?", g, w, S, Mr].join("|") + ")", Or = RegExp(R, "g"), Gr = RegExp(g, "g"), jr = RegExp(k + "(?=" + k + ")|" + _r + xe, "g"), Ar = RegExp([
  u + "?" + de + "+" + z + "(?=" + [j, u, "$"].join("|") + ")",
  Lr + "+" + P + "(?=" + [j, u + A, "$"].join("|") + ")",
  u + "?" + A + "+" + z,
  u + "+" + P,
  ce,
  $r
].join("|"), "g"), zr = RegExp("[" + fe + x + ie + te + le + "]"), Pr = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Ur = {
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
}, Wr = typeof n == "object" && n && n.Object === Object && n, Ir = typeof self == "object" && self && self.Object === Object && self, Nr = Wr || Ir || Function("return this")();
function Zr(e, r, o, t) {
  var i = -1, a = e ? e.length : 0;
  for (t && a && (o = e[++i]); ++i < a; )
    o = r(o, e[i], i, e);
  return o;
}
function Dr(e) {
  return e.split("");
}
function Hr(e) {
  return e.match(yr) || [];
}
function Fr(e) {
  return function(r) {
    return e == null ? void 0 : e[r];
  };
}
var Kr = Fr(Ur);
function he(e) {
  return zr.test(e);
}
function Jr(e) {
  return Pr.test(e);
}
function Vr(e) {
  return he(e) ? Yr(e) : Dr(e);
}
function Yr(e) {
  return e.match(jr) || [];
}
function qr(e) {
  return e.match(Ar) || [];
}
var Xr = Object.prototype, Qr = Xr.toString, U = Nr.Symbol, W = U ? U.prototype : void 0, I = W ? W.toString : void 0;
function eo(e, r, o) {
  var t = -1, i = e.length;
  r < 0 && (r = -r > i ? 0 : i + r), o = o > i ? i : o, o < 0 && (o += i), i = r > o ? 0 : o - r >>> 0, r >>>= 0;
  for (var a = Array(i); ++t < i; )
    a[t] = e[t + r];
  return a;
}
function ro(e) {
  if (typeof e == "string")
    return e;
  if (so(e))
    return I ? I.call(e) : "";
  var r = e + "";
  return r == "0" && 1 / e == -hr ? "-0" : r;
}
function oo(e, r, o) {
  var t = e.length;
  return o = o === void 0 ? t : o, !r && o >= t ? e : eo(e, r, o);
}
function io(e) {
  return function(r) {
    r = B(r);
    var o = he(r) ? Vr(r) : void 0, t = o ? o[0] : r.charAt(0), i = o ? oo(o, 1).join("") : r.slice(1);
    return t[e]() + i;
  };
}
function to(e) {
  return function(r) {
    return Zr(co(no(r).replace(Or, "")), e, "");
  };
}
function ao(e) {
  return !!e && typeof e == "object";
}
function so(e) {
  return typeof e == "symbol" || ao(e) && Qr.call(e) == kr;
}
function B(e) {
  return e == null ? "" : ro(e);
}
function no(e) {
  return e = B(e), e && e.replace(Rr, Kr).replace(Gr, "");
}
var lo = to(function(e, r, o) {
  return e + (o ? " " : "") + uo(r);
}), uo = io("toUpperCase");
function co(e, r, o) {
  return e = B(e), r = o ? void 0 : r, r === void 0 ? Jr(e) ? qr(e) : Hr(e) : e.match(r) || [];
}
var mo = lo;
const m = /* @__PURE__ */ N(mo), Mo = {
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
}, To = {
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
], po = ["nothing"], fo = { nothing: po, ammo: v, energy: M, beams: ke, suits: ye, items: Re }, Eo = Object.entries(fo).map(([e, r]) => ({
  slug: e,
  name: m(e),
  items: r.map((o) => ({ name: m(
    o.replace(/(-beam|-boots|-missile)/, "").replace("x-ray", "x-ray-scope")
  ), item_slug: o }))
})), go = [...v, ...M, ...ke, ...ye, ...Re], bo = [
  "westSandHallLeft",
  "belowBotwoonEnergyTankRight",
  "westSandHallTunnelRight"
], xo = [
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
const T = (e) => e.reduce((r, o) => [...r, ...o], []), ho = T(d.area), ko = T(d.boss), yo = {
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
}, Lo = {
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
}, Ro = {
  Kraid: "kraids-lair",
  Crocomire: "crocomize",
  SporeSpawn: "green-brinstar",
  Draygon: "draygon",
  Botwoon: "east-maridia",
  Ridley: "ridley",
  GoldenTorizo: "lower-norfair",
  Phantoon: "wrecked-ship",
  MotherBrain: "tourian"
}, Se = ["kraid", "phantoon", "draygon", "ridley", "mother-brain"], Be = ["crocomire", "spore-spawn", "botwoon", "golden-torizo", "bomb-torizo"], Co = {
  draygon: "east-maridia",
  phantoon: "wrecked-ship",
  kraid: "kraids-lair",
  ridley: "lower-norfair"
}, ve = [
  ...T(Object.values(yo)),
  ...Object.keys(Ro)
], p = {};
ve.forEach((e) => p[e] = "location");
ko.forEach((e) => p[e] = "boss");
ho.forEach((e) => p[e] = "area");
bo.forEach((e) => p[e] = "sand");
xo.forEach((e) => p[e] = "escape");
const $o = ["kraid", "phantoon", "draygon", "ridley"], h = {
  GoldTorizo: "miniboss"
  // Varia has this as gold in some places, golden in others
};
ve.forEach((e) => h[e] = "item");
const Me = (e) => m(e).replace(" ", "");
Be.forEach((e) => h[Me(e)] = "miniboss");
Se.forEach((e) => h[Me(e)] = "boss");
const _o = [
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
], wo = {
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
  "kill king cacatac": { id: "kill king cacatac", category: "memes" }
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
}, So = [go, Se, Be];
So.forEach(
  (e) => e.forEach((r) => {
    b[r] = b[r] || m(r).replace(/ /g, "");
  })
);
const c = {};
v.forEach((e) => c[e] = 5);
M.forEach((e) => c[e] = 1);
const Bo = (e) => Object.fromEntries(Object.entries(e).map(([r, o]) => [o, r])), s = {
  sm_to_varia: b,
  varia_to_sm: Bo(b),
  getGameState: (e, r, o) => {
    if (!e)
      return null;
    const t = {
      inventory: {},
      locations: {},
      warps: e.lines,
      locked_warps: { ...o }
    };
    return r ? Object.entries(r).forEach(([i, a]) => {
      const f = s.variaToSm(i);
      c[f] ? t.inventory[f] = a * c[f] : t.inventory[f] = !0;
    }) : e.collectedItems.forEach((i) => {
      const a = s.variaToSm(i);
      c[a] ? t.inventory[a] = (t.inventory[a] || 0) + c[a] : t.inventory[a] = !0;
    }), t;
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
    const r = s.variaToSm(e), o = h[e];
    return o === "boss" || o === "miniboss" ? `smv-boss -map-icon -${r}` : `sm-item -${r}`;
  },
  // Objectives are currently taken from repo but will eventually be pulled in from server
  objective: {},
  loadObjectives: (e) => {
    const r = /^(kill|collect|explore|clear|tickle|activate) (the )?/, o = {};
    Object.values(e).forEach((t) => {
      t.icon = `smv-objective -${vo(t.id)}`, t.short = t.id.replace(r, "");
      const { category: i } = t;
      o[i] = o[i] || [], o[i].push(t);
    }), s.objective.by_id = e, s.objective.by_category = o;
  }
}, vo = (e) => xr(e.toLowerCase().replace("'", ""));
s.loadObjectives(wo);
export {
  ho as access_points,
  go as all_items,
  ve as all_locations,
  v as ammo,
  ke as beams,
  ko as boss_doors,
  Se as bosses,
  Lo as default_area_keys,
  Mo as default_door_colors,
  To as door_item_by_color,
  _o as doors,
  M as energy,
  xo as escape_doors,
  $o as golden_four,
  fo as items_by_group,
  h as location_type_map,
  yo as locations_by_area,
  Be as minibosses,
  bo as sand_doors,
  Co as subarea_by_area,
  d as vanilla_warps,
  s as varia,
  Eo as varia_item_groups,
  p as warp_type_map
};
