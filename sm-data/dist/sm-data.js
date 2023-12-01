var l = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function N(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Te = 1 / 0, Ee = "[object Symbol]", Le = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Ce = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Z = "\\ud800-\\udfff", $e = "\\u0300-\\u036f\\ufe20-\\ufe23", _e = "\\u20d0-\\u20f0", D = "\\u2700-\\u27bf", H = "a-z\\xdf-\\xf6\\xf8-\\xff", Oe = "\\xac\\xb1\\xd7\\xf7", Ge = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", je = "\\u2000-\\u206f", Ae = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", F = "A-Z\\xc0-\\xd6\\xd8-\\xde", ze = "\\ufe0e\\ufe0f", K = Oe + Ge + je + Ae, y = "['’]", E = "[" + K + "]", J = "[" + $e + _e + "]", V = "\\d+", Pe = "[" + D + "]", Y = "[" + H + "]", q = "[^" + Z + K + V + D + H + F + "]", Ue = "\\ud83c[\\udffb-\\udfff]", We = "(?:" + J + "|" + Ue + ")", Ie = "[^" + Z + "]", X = "(?:\\ud83c[\\udde6-\\uddff]){2}", Q = "[\\ud800-\\udbff][\\udc00-\\udfff]", n = "[" + F + "]", Ne = "\\u200d", L = "(?:" + Y + "|" + q + ")", Ze = "(?:" + n + "|" + q + ")", C = "(?:" + y + "(?:d|ll|m|re|s|t|ve))?", $ = "(?:" + y + "(?:D|LL|M|RE|S|T|VE))?", ee = We + "?", re = "[" + ze + "]?", De = "(?:" + Ne + "(?:" + [Ie, X, Q].join("|") + ")" + re + ee + ")*", He = re + ee + De, Fe = "(?:" + [Pe, X, Q].join("|") + ")" + He, Ke = RegExp(y, "g"), Je = RegExp(J, "g"), Ve = RegExp([
  n + "?" + Y + "+" + C + "(?=" + [E, n, "$"].join("|") + ")",
  Ze + "+" + $ + "(?=" + [E, n + L, "$"].join("|") + ")",
  n + "?" + L + "+" + C,
  n + "+" + $,
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
}, Xe = typeof l == "object" && l && l.Object === Object && l, Qe = typeof self == "object" && self && self.Object === Object && self, er = Xe || Qe || Function("return this")();
function rr(e, r, i, a) {
  var o = -1, t = e ? e.length : 0;
  for (a && t && (i = e[++o]); ++o < t; )
    i = r(i, e[o], o, e);
  return i;
}
function ir(e) {
  return e.match(Le) || [];
}
function or(e) {
  return function(r) {
    return e == null ? void 0 : e[r];
  };
}
var ar = or(qe);
function tr(e) {
  return Ye.test(e);
}
function sr(e) {
  return e.match(Ve) || [];
}
var lr = Object.prototype, nr = lr.toString, _ = er.Symbol, O = _ ? _.prototype : void 0, G = O ? O.toString : void 0;
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
  return typeof e == "symbol" || dr(e) && nr.call(e) == Ee;
}
function ie(e) {
  return e == null ? "" : ur(e);
}
function pr(e) {
  return e = ie(e), e && e.replace(Ce, ar).replace(Je, "");
}
var fr = cr(function(e, r, i) {
  return e + (i ? "-" : "") + r.toLowerCase();
});
function gr(e, r, i) {
  return e = ie(e), r = i ? void 0 : r, r === void 0 ? tr(e) ? sr(e) : ir(e) : e.match(r) || [];
}
var br = fr;
const xr = /* @__PURE__ */ N(br);
var hr = 1 / 0, kr = "[object Symbol]", yr = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Rr = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, x = "\\ud800-\\udfff", oe = "\\u0300-\\u036f\\ufe20-\\ufe23", ae = "\\u20d0-\\u20f0", te = "\\u2700-\\u27bf", se = "a-z\\xdf-\\xf6\\xf8-\\xff", wr = "\\xac\\xb1\\xd7\\xf7", Sr = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Br = "\\u2000-\\u206f", vr = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", le = "A-Z\\xc0-\\xd6\\xd8-\\xde", ne = "\\ufe0e\\ufe0f", ue = wr + Sr + Br + vr, R = "['’]", Mr = "[" + x + "]", j = "[" + ue + "]", g = "[" + oe + ae + "]", ce = "\\d+", Tr = "[" + te + "]", de = "[" + se + "]", me = "[^" + x + ue + ce + te + se + le + "]", k = "\\ud83c[\\udffb-\\udfff]", Er = "(?:" + g + "|" + k + ")", pe = "[^" + x + "]", w = "(?:\\ud83c[\\udde6-\\uddff]){2}", S = "[\\ud800-\\udbff][\\udc00-\\udfff]", u = "[" + le + "]", fe = "\\u200d", A = "(?:" + de + "|" + me + ")", Lr = "(?:" + u + "|" + me + ")", z = "(?:" + R + "(?:d|ll|m|re|s|t|ve))?", P = "(?:" + R + "(?:D|LL|M|RE|S|T|VE))?", ge = Er + "?", be = "[" + ne + "]?", Cr = "(?:" + fe + "(?:" + [pe, w, S].join("|") + ")" + be + ge + ")*", xe = be + ge + Cr, $r = "(?:" + [Tr, w, S].join("|") + ")" + xe, _r = "(?:" + [pe + g + "?", g, w, S, Mr].join("|") + ")", Or = RegExp(R, "g"), Gr = RegExp(g, "g"), jr = RegExp(k + "(?=" + k + ")|" + _r + xe, "g"), Ar = RegExp([
  u + "?" + de + "+" + z + "(?=" + [j, u, "$"].join("|") + ")",
  Lr + "+" + P + "(?=" + [j, u + A, "$"].join("|") + ")",
  u + "?" + A + "+" + z,
  u + "+" + P,
  ce,
  $r
].join("|"), "g"), zr = RegExp("[" + fe + x + oe + ae + ne + "]"), Pr = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Ur = {
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
}, Wr = typeof l == "object" && l && l.Object === Object && l, Ir = typeof self == "object" && self && self.Object === Object && self, Nr = Wr || Ir || Function("return this")();
function Zr(e, r, i, a) {
  var o = -1, t = e ? e.length : 0;
  for (a && t && (i = e[++o]); ++o < t; )
    i = r(i, e[o], o, e);
  return i;
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
function ei(e, r, i) {
  var a = -1, o = e.length;
  r < 0 && (r = -r > o ? 0 : o + r), i = i > o ? o : i, i < 0 && (i += o), o = r > i ? 0 : i - r >>> 0, r >>>= 0;
  for (var t = Array(o); ++a < o; )
    t[a] = e[a + r];
  return t;
}
function ri(e) {
  if (typeof e == "string")
    return e;
  if (si(e))
    return I ? I.call(e) : "";
  var r = e + "";
  return r == "0" && 1 / e == -hr ? "-0" : r;
}
function ii(e, r, i) {
  var a = e.length;
  return i = i === void 0 ? a : i, !r && i >= a ? e : ei(e, r, i);
}
function oi(e) {
  return function(r) {
    r = B(r);
    var i = he(r) ? Vr(r) : void 0, a = i ? i[0] : r.charAt(0), o = i ? ii(i, 1).join("") : r.slice(1);
    return a[e]() + o;
  };
}
function ai(e) {
  return function(r) {
    return Zr(ci(li(r).replace(Or, "")), e, "");
  };
}
function ti(e) {
  return !!e && typeof e == "object";
}
function si(e) {
  return typeof e == "symbol" || ti(e) && Qr.call(e) == kr;
}
function B(e) {
  return e == null ? "" : ri(e);
}
function li(e) {
  return e = B(e), e && e.replace(Rr, Kr).replace(Gr, "");
}
var ni = ai(function(e, r, i) {
  return e + (i ? " " : "") + ui(r);
}), ui = oi("toUpperCase");
function ci(e, r, i) {
  return e = B(e), r = i ? void 0 : r, r === void 0 ? Jr(e) ? qr(e) : Hr(e) : e.match(r) || [];
}
var di = ni;
const m = /* @__PURE__ */ N(di), vi = {
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
], mi = ["nothing"], pi = { nothing: mi, ammo: v, energy: M, beams: ke, suits: ye, items: Re }, Ti = Object.entries(pi).map(([e, r]) => ({
  slug: e,
  name: m(e),
  items: r.map((i) => ({ name: m(
    i.replace(/(-beam|-boots|-missile)/, "").replace("x-ray", "x-ray-scope")
  ), item_slug: i }))
})), fi = [...v, ...M, ...ke, ...ye, ...Re], gi = [
  "westSandHallLeft",
  "belowBotwoonEnergyTankRight",
  "westSandHallTunnelRight"
], bi = [
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
const T = (e) => e.reduce((r, i) => [...r, ...i], []), xi = T(d.area), hi = T(d.boss), ki = {
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
}, yi = {
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
  ...T(Object.values(ki)),
  ...Object.keys(yi)
], p = {};
ve.forEach((e) => p[e] = "location");
hi.forEach((e) => p[e] = "boss");
xi.forEach((e) => p[e] = "area");
gi.forEach((e) => p[e] = "sand");
bi.forEach((e) => p[e] = "escape");
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
], Ri = {
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
  "kill all space pirates": { id: "kill all space pirates", category: "enemies" },
  "kill all ki hunters": { id: "kill all ki hunters", category: "enemies" },
  "kill all beetoms": { id: "kill all beetoms", category: "enemies" },
  "kill all cacatacs": { id: "kill all cacatacs", category: "enemies" },
  "kill all kagos": { id: "kill all kagos", category: "enemies" },
  "kill all yapping maws": { id: "kill all yapping maws", category: "enemies" },
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
}, wi = [fi, Se, Be];
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
    const a = {
      inventory: {},
      locations: {},
      warps: e.lines,
      locked_warps: { ...i }
    };
    return r ? Object.entries(r).forEach(([o, t]) => {
      const f = s.variaToSm(o);
      c[f] ? a.inventory[f] = t * c[f] : a.inventory[f] = !0;
    }) : e.collectedItems.forEach((o) => {
      const t = s.variaToSm(o);
      c[t] ? a.inventory[t] = (a.inventory[t] || 0) + c[t] : a.inventory[t] = !0;
    }), a;
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
  objective: {},
  loadObjectives: (e) => {
    const r = /^(kill|collect|explore|clear|tickle|activate) (the )?/, i = {};
    Object.values(e).forEach((o) => {
      o.icon = `smv-objective -${Bi(o.id)}`, o.short = o.id.replace(r, "");
      const { category: t } = o;
      i[t] = i[t] || [], i[t].push(o);
    }), s.objective.by_id = e, s.objective.by_category = i;
    const { memes: a } = s.objective.by_category;
    a && (delete s.objective.by_category.memes, s.objective.by_category.memes = a);
  }
}, Bi = (e) => xr(e.toLowerCase().replace("'", ""));
s.loadObjectives(Ri);
export {
  xi as access_points,
  fi as all_items,
  ve as all_locations,
  v as ammo,
  ke as beams,
  hi as boss_doors,
  Se as bosses,
  Ei as default_area_keys,
  vi as default_door_colors,
  Mi as door_item_by_color,
  $i as doors,
  M as energy,
  bi as escape_doors,
  Ci as golden_four,
  pi as items_by_group,
  h as location_type_map,
  ki as locations_by_area,
  Be as minibosses,
  gi as sand_doors,
  Li as subarea_by_area,
  d as vanilla_warps,
  s as varia,
  Ti as varia_item_groups,
  p as warp_type_map
};
