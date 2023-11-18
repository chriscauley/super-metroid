var n = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function N(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ce = 1 / 0, $e = "[object Symbol]", _e = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Oe = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Z = "\\ud800-\\udfff", Ge = "\\u0300-\\u036f\\ufe20-\\ufe23", je = "\\u20d0-\\u20f0", D = "\\u2700-\\u27bf", H = "a-z\\xdf-\\xf6\\xf8-\\xff", Ae = "\\xac\\xb1\\xd7\\xf7", ze = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Pe = "\\u2000-\\u206f", Ue = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", F = "A-Z\\xc0-\\xd6\\xd8-\\xde", We = "\\ufe0e\\ufe0f", K = Ae + ze + Pe + Ue, y = "['’]", E = "[" + K + "]", J = "[" + Ge + je + "]", V = "\\d+", Ie = "[" + D + "]", Y = "[" + H + "]", q = "[^" + Z + K + V + D + H + F + "]", Ne = "\\ud83c[\\udffb-\\udfff]", Ze = "(?:" + J + "|" + Ne + ")", De = "[^" + Z + "]", X = "(?:\\ud83c[\\udde6-\\uddff]){2}", Q = "[\\ud800-\\udbff][\\udc00-\\udfff]", l = "[" + F + "]", He = "\\u200d", L = "(?:" + Y + "|" + q + ")", Fe = "(?:" + l + "|" + q + ")", C = "(?:" + y + "(?:d|ll|m|re|s|t|ve))?", $ = "(?:" + y + "(?:D|LL|M|RE|S|T|VE))?", ee = Ze + "?", re = "[" + We + "]?", Ke = "(?:" + He + "(?:" + [De, X, Q].join("|") + ")" + re + ee + ")*", Je = re + ee + Ke, Ve = "(?:" + [Ie, X, Q].join("|") + ")" + Je, Ye = RegExp(y, "g"), qe = RegExp(J, "g"), Xe = RegExp([
  l + "?" + Y + "+" + C + "(?=" + [E, l, "$"].join("|") + ")",
  Fe + "+" + $ + "(?=" + [E, l + L, "$"].join("|") + ")",
  l + "?" + L + "+" + C,
  l + "+" + $,
  V,
  Ve
].join("|"), "g"), Qe = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, er = {
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
}, rr = typeof n == "object" && n && n.Object === Object && n, or = typeof self == "object" && self && self.Object === Object && self, ir = rr || or || Function("return this")();
function tr(e, r, o, i) {
  var t = -1, a = e ? e.length : 0;
  for (i && a && (o = e[++t]); ++t < a; )
    o = r(o, e[t], t, e);
  return o;
}
function ar(e) {
  return e.match(_e) || [];
}
function sr(e) {
  return function(r) {
    return e == null ? void 0 : e[r];
  };
}
var nr = sr(er);
function lr(e) {
  return Qe.test(e);
}
function ur(e) {
  return e.match(Xe) || [];
}
var cr = Object.prototype, dr = cr.toString, _ = ir.Symbol, O = _ ? _.prototype : void 0, G = O ? O.toString : void 0;
function mr(e) {
  if (typeof e == "string")
    return e;
  if (gr(e))
    return G ? G.call(e) : "";
  var r = e + "";
  return r == "0" && 1 / e == -Ce ? "-0" : r;
}
function fr(e) {
  return function(r) {
    return tr(hr(br(r).replace(Ye, "")), e, "");
  };
}
function pr(e) {
  return !!e && typeof e == "object";
}
function gr(e) {
  return typeof e == "symbol" || pr(e) && dr.call(e) == $e;
}
function oe(e) {
  return e == null ? "" : mr(e);
}
function br(e) {
  return e = oe(e), e && e.replace(Oe, nr).replace(qe, "");
}
var xr = fr(function(e, r, o) {
  return e + (o ? "-" : "") + r.toLowerCase();
});
function hr(e, r, o) {
  return e = oe(e), r = o ? void 0 : r, r === void 0 ? lr(e) ? ur(e) : ar(e) : e.match(r) || [];
}
var kr = xr;
const yr = /* @__PURE__ */ N(kr);
var Rr = 1 / 0, wr = "[object Symbol]", Sr = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Br = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, x = "\\ud800-\\udfff", ie = "\\u0300-\\u036f\\ufe20-\\ufe23", te = "\\u20d0-\\u20f0", ae = "\\u2700-\\u27bf", se = "a-z\\xdf-\\xf6\\xf8-\\xff", vr = "\\xac\\xb1\\xd7\\xf7", Mr = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Tr = "\\u2000-\\u206f", Er = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", ne = "A-Z\\xc0-\\xd6\\xd8-\\xde", le = "\\ufe0e\\ufe0f", ue = vr + Mr + Tr + Er, R = "['’]", Lr = "[" + x + "]", j = "[" + ue + "]", g = "[" + ie + te + "]", ce = "\\d+", Cr = "[" + ae + "]", de = "[" + se + "]", me = "[^" + x + ue + ce + ae + se + ne + "]", k = "\\ud83c[\\udffb-\\udfff]", $r = "(?:" + g + "|" + k + ")", fe = "[^" + x + "]", w = "(?:\\ud83c[\\udde6-\\uddff]){2}", S = "[\\ud800-\\udbff][\\udc00-\\udfff]", u = "[" + ne + "]", pe = "\\u200d", A = "(?:" + de + "|" + me + ")", _r = "(?:" + u + "|" + me + ")", z = "(?:" + R + "(?:d|ll|m|re|s|t|ve))?", P = "(?:" + R + "(?:D|LL|M|RE|S|T|VE))?", ge = $r + "?", be = "[" + le + "]?", Or = "(?:" + pe + "(?:" + [fe, w, S].join("|") + ")" + be + ge + ")*", xe = be + ge + Or, Gr = "(?:" + [Cr, w, S].join("|") + ")" + xe, jr = "(?:" + [fe + g + "?", g, w, S, Lr].join("|") + ")", Ar = RegExp(R, "g"), zr = RegExp(g, "g"), Pr = RegExp(k + "(?=" + k + ")|" + jr + xe, "g"), Ur = RegExp([
  u + "?" + de + "+" + z + "(?=" + [j, u, "$"].join("|") + ")",
  _r + "+" + P + "(?=" + [j, u + A, "$"].join("|") + ")",
  u + "?" + A + "+" + z,
  u + "+" + P,
  ce,
  Gr
].join("|"), "g"), Wr = RegExp("[" + pe + x + ie + te + le + "]"), Ir = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Nr = {
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
}, Zr = typeof n == "object" && n && n.Object === Object && n, Dr = typeof self == "object" && self && self.Object === Object && self, Hr = Zr || Dr || Function("return this")();
function Fr(e, r, o, i) {
  var t = -1, a = e ? e.length : 0;
  for (i && a && (o = e[++t]); ++t < a; )
    o = r(o, e[t], t, e);
  return o;
}
function Kr(e) {
  return e.split("");
}
function Jr(e) {
  return e.match(Sr) || [];
}
function Vr(e) {
  return function(r) {
    return e == null ? void 0 : e[r];
  };
}
var Yr = Vr(Nr);
function he(e) {
  return Wr.test(e);
}
function qr(e) {
  return Ir.test(e);
}
function Xr(e) {
  return he(e) ? Qr(e) : Kr(e);
}
function Qr(e) {
  return e.match(Pr) || [];
}
function eo(e) {
  return e.match(Ur) || [];
}
var ro = Object.prototype, oo = ro.toString, U = Hr.Symbol, W = U ? U.prototype : void 0, I = W ? W.toString : void 0;
function io(e, r, o) {
  var i = -1, t = e.length;
  r < 0 && (r = -r > t ? 0 : t + r), o = o > t ? t : o, o < 0 && (o += t), t = r > o ? 0 : o - r >>> 0, r >>>= 0;
  for (var a = Array(t); ++i < t; )
    a[i] = e[i + r];
  return a;
}
function to(e) {
  if (typeof e == "string")
    return e;
  if (uo(e))
    return I ? I.call(e) : "";
  var r = e + "";
  return r == "0" && 1 / e == -Rr ? "-0" : r;
}
function ao(e, r, o) {
  var i = e.length;
  return o = o === void 0 ? i : o, !r && o >= i ? e : io(e, r, o);
}
function so(e) {
  return function(r) {
    r = B(r);
    var o = he(r) ? Xr(r) : void 0, i = o ? o[0] : r.charAt(0), t = o ? ao(o, 1).join("") : r.slice(1);
    return i[e]() + t;
  };
}
function no(e) {
  return function(r) {
    return Fr(po(co(r).replace(Ar, "")), e, "");
  };
}
function lo(e) {
  return !!e && typeof e == "object";
}
function uo(e) {
  return typeof e == "symbol" || lo(e) && oo.call(e) == wr;
}
function B(e) {
  return e == null ? "" : to(e);
}
function co(e) {
  return e = B(e), e && e.replace(Br, Yr).replace(zr, "");
}
var mo = no(function(e, r, o) {
  return e + (o ? " " : "") + fo(r);
}), fo = so("toUpperCase");
function po(e, r, o) {
  return e = B(e), r = o ? void 0 : r, r === void 0 ? qr(e) ? eo(e) : Jr(e) : e.match(r) || [];
}
var go = mo;
const m = /* @__PURE__ */ N(go), Mo = {
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
], bo = ["nothing"], xo = { nothing: bo, ammo: v, energy: M, beams: ke, suits: ye, items: Re }, Eo = Object.entries(xo).map(([e, r]) => ({
  slug: e,
  name: m(e),
  items: r.map((o) => ({ name: m(
    o.replace(/(-beam|-boots|-missile)/, "").replace("x-ray", "x-ray-scope")
  ), item_slug: o }))
})), ho = [...v, ...M, ...ke, ...ye, ...Re], ko = [
  "westSandHallLeft",
  "belowBotwoonEnergyTankRight",
  "westSandHallTunnelRight"
], yo = [
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
const T = (e) => e.reduce((r, o) => [...r, ...o], []), Se = T(d.area), Be = T(d.boss);
console.log(Se);
console.log(Be);
const Ro = {
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
}, wo = {
  Kraid: "kraids-lair",
  Crocomire: "crocomize",
  SporeSpawn: "green-brinstar",
  Draygon: "draygon",
  Botwoon: "east-maridia",
  Ridley: "ridley",
  GoldenTorizo: "lower-norfair",
  Phantoon: "wrecked-ship",
  MotherBrain: "tourian"
}, ve = ["kraid", "phantoon", "draygon", "ridley", "mother-brain"], Me = ["crocomire", "spore-spawn", "botwoon", "golden-torizo", "bomb-torizo"], Co = {
  draygon: "east-maridia",
  phantoon: "wrecked-ship",
  kraid: "kraids-lair",
  ridley: "lower-norfair"
}, Te = [
  ...T(Object.values(Ro)),
  ...Object.keys(wo)
], f = {};
Te.forEach((e) => f[e] = "location");
Be.forEach((e) => f[e] = "boss");
Se.forEach((e) => f[e] = "area");
ko.forEach((e) => f[e] = "sand");
yo.forEach((e) => f[e] = "escape");
const $o = ["kraid", "phantoon", "draygon", "ridley"], h = {
  GoldTorizo: "miniboss"
  // Varia has this as gold in some places, golden in others
};
Te.forEach((e) => h[e] = "item");
const Ee = (e) => m(e).replace(" ", "");
Me.forEach((e) => h[Ee(e)] = "miniboss");
ve.forEach((e) => h[Ee(e)] = "boss");
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
], Le = {
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
}, So = [ho, ve, Me];
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
    const i = {
      inventory: {},
      locations: {},
      warps: e.lines,
      locked_warps: { ...o }
    };
    return r ? Object.entries(r).forEach(([t, a]) => {
      const p = s.variaToSm(t);
      c[p] ? i.inventory[p] = a * c[p] : i.inventory[p] = !0;
    }) : e.collectedItems.forEach((t) => {
      const a = s.variaToSm(t);
      c[a] ? i.inventory[a] = (i.inventory[a] || 0) + c[a] : i.inventory[a] = !0;
    }), i;
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
  loadObjectives: (e) => {
    const r = {};
    Object.values(Le).forEach((o) => {
      o.icon = `smv-objective -${vo(o.id)}`;
      const { category: i } = o;
      r[i] = r[i] || [], r[i].push(o);
    }), s.objective = { by_id: e, by_category: r };
  }
}, vo = (e) => yr(e.toLowerCase().replace("'", ""));
s.loadObjectives(Le);
export {
  Se as access_points,
  ho as all_items,
  Te as all_locations,
  v as ammo,
  ke as beams,
  Be as boss_doors,
  ve as bosses,
  Lo as default_area_keys,
  Mo as default_door_colors,
  To as door_item_by_color,
  _o as doors,
  M as energy,
  yo as escape_doors,
  $o as golden_four,
  xo as items_by_group,
  h as location_type_map,
  Ro as locations_by_area,
  Me as minibosses,
  ko as sand_doors,
  Co as subarea_by_area,
  d as vanilla_warps,
  s as varia,
  Eo as varia_item_groups,
  f as warp_type_map
};
