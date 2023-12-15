import { openBlock as i, createElementBlock as n, Fragment as b, renderList as f, normalizeClass as p, resolveComponent as oe, normalizeStyle as V, createBlock as ne, mergeProps as Z, createCommentVNode as ae, createElementVNode as _, createTextVNode as ue, toDisplayString as k } from "vue";
const y = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [a, u] of t)
    s[a] = u;
  return s;
}, ce = ["charge-beam", "wave-beam", "ice-beam", "spazer-beam", "plasma-beam"], le = {
  props: {
    inventory: Object
  },
  emits: ["toggle-item"],
  computed: {
    beams() {
      return ce.map((e) => ({
        id: e,
        class: [`sm-cwisp__cell -${e}`, this.inventory[e] ? "-active" : "-inactive"]
      }));
    }
  }
}, de = { class: "sm-cwisp" }, me = ["onClick"];
function pe(e, t, s, a, u, o) {
  return i(), n("div", de, [
    (i(!0), n(b, null, f(o.beams, (r) => (i(), n("div", {
      class: p(r.class),
      onClick: (l) => e.$emit("toggle-item", r.id),
      key: r.id
    }, null, 10, me))), 128))
  ]);
}
const $ = /* @__PURE__ */ y(le, [["render", pe]]);
var v = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function be(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var fe = 1 / 0, he = "[object Symbol]", ge = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, _e = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, D = "\\ud800-\\udfff", xe = "\\u0300-\\u036f\\ufe20-\\ufe23", ve = "\\u20d0-\\u20f0", G = "\\u2700-\\u27bf", P = "a-z\\xdf-\\xf6\\xf8-\\xff", ye = "\\xac\\xb1\\xd7\\xf7", ke = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", we = "\\u2000-\\u206f", je = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", W = "A-Z\\xc0-\\xd6\\xd8-\\xde", $e = "\\ufe0e\\ufe0f", F = ye + ke + we + je, w = "['’]", O = "[" + F + "]", K = "[" + xe + ve + "]", J = "\\d+", Oe = "[" + G + "]", Y = "[" + P + "]", H = "[^" + D + F + J + G + P + W + "]", Se = "\\ud83c[\\udffb-\\udfff]", Ce = "(?:" + K + "|" + Se + ")", Ae = "[^" + D + "]", q = "(?:\\ud83c[\\udde6-\\uddff]){2}", Q = "[\\ud800-\\udbff][\\udc00-\\udfff]", h = "[" + W + "]", Te = "\\u200d", S = "(?:" + Y + "|" + H + ")", Ee = "(?:" + h + "|" + H + ")", C = "(?:" + w + "(?:d|ll|m|re|s|t|ve))?", A = "(?:" + w + "(?:D|LL|M|RE|S|T|VE))?", X = Ce + "?", ee = "[" + $e + "]?", Re = "(?:" + Te + "(?:" + [Ae, q, Q].join("|") + ")" + ee + X + ")*", Ie = ee + X + Re, Le = "(?:" + [Oe, q, Q].join("|") + ")" + Ie, ze = RegExp(w, "g"), Ue = RegExp(K, "g"), Ne = RegExp([
  h + "?" + Y + "+" + C + "(?=" + [O, h, "$"].join("|") + ")",
  Ee + "+" + A + "(?=" + [O, h + S, "$"].join("|") + ")",
  h + "?" + S + "+" + C,
  h + "+" + A,
  J,
  Le
].join("|"), "g"), Me = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Be = {
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
}, Ve = typeof v == "object" && v && v.Object === Object && v, Ze = typeof self == "object" && self && self.Object === Object && self, De = Ve || Ze || Function("return this")();
function Ge(e, t, s, a) {
  var u = -1, o = e ? e.length : 0;
  for (a && o && (s = e[++u]); ++u < o; )
    s = t(s, e[u], u, e);
  return s;
}
function Pe(e) {
  return e.match(ge) || [];
}
function We(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var Fe = We(Be);
function Ke(e) {
  return Me.test(e);
}
function Je(e) {
  return e.match(Ne) || [];
}
var Ye = Object.prototype, He = Ye.toString, T = De.Symbol, E = T ? T.prototype : void 0, R = E ? E.toString : void 0;
function qe(e) {
  if (typeof e == "string")
    return e;
  if (et(e))
    return R ? R.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -fe ? "-0" : t;
}
function Qe(e) {
  return function(t) {
    return Ge(rt(tt(t).replace(ze, "")), e, "");
  };
}
function Xe(e) {
  return !!e && typeof e == "object";
}
function et(e) {
  return typeof e == "symbol" || Xe(e) && He.call(e) == he;
}
function te(e) {
  return e == null ? "" : qe(e);
}
function tt(e) {
  return e = te(e), e && e.replace(_e, Fe).replace(Ue, "");
}
var st = Qe(function(e, t, s) {
  return e + (s ? "-" : "") + t.toLowerCase();
});
function rt(e, t, s) {
  return e = te(e), t = s ? void 0 : t, t === void 0 ? Ke(e) ? Je(e) : Pe(e) : e.match(t) || [];
}
var it = st;
const ot = /* @__PURE__ */ be(it), x = {
  default: {
    _packs: {
      missile: 5,
      "super-missile": 5,
      "power-bomb": 5
    }
  },
  varia: {},
  // all multipliers are 1
  nature: {
    _packs: {
      missile: 5,
      "super-missile": 3,
      "power-bomb": 2
    },
    "x-ray": "beam-burst"
  },
  vitality: {
    _packs: {
      missile: 2,
      "super-missile": 1,
      "power-bomb": 1
    }
  },
  ascent: {
    "spring-ball": "boost-ball",
    draygon: "weapons-tank",
    "x-ray": "shinespark"
  }
}, nt = (e) => ot(e.toLowerCase().replace("'", "")), se = [
  ["energy-tank", "reserve-tank", "missile", "super-missile", "power-bomb"],
  ["charge-beam", "ice-beam", "wave-beam", "spazer-beam", "plasma-beam"],
  ["morph-ball", "varia-suit", "spring-ball", "hi-jump-boots", "space-jump"],
  ["bomb", "gravity-suit", "ridley", "speed-booster", "screw-attack"],
  ["grappling-beam", "kraid", "phantoon", "draygon", "x-ray"]
], I = [
  ["cwisp", "morph-ball", "bomb", "spring-ball"],
  ["hi-jump-boots", "speed-booster", "space-jump", "screw-attack"],
  ["varia-suit", "ridley", "gravity-suit"],
  ["kraid", "phantoon", "draygon"]
], at = [
  ["cwisp", "morph-ball", "bomb", "spring-ball", "varia-suit"],
  ["hi-jump-boots", "speed-booster", "space-jump", "screw-attack", "gravity-suit"]
], ut = se[0], L = (e, t, s = 2) => !e || typeof e != "number" ? null : (t ? e * t : e).toString().padStart(s, 0).split("").map((u) => `smi-number -number-${u}`), ct = ["spore-spawn", "crocomire", "botwoon", "golden-torizo"], lt = (e, t) => j[e] || ct.includes(e) ? [`sm-g4-head -${e}`, t && "-inactive"] : [`sm-item -${e}`, !t && "-has-not"], j = {
  "kill kraid": !0,
  "kill phantoon": !0,
  "kill draygon": !0,
  "kill ridley": !0,
  kraid: !0,
  phantoon: !0,
  draygon: !0,
  ridley: !0
}, dt = (e) => e.map((t) => t.filter((s) => !j[s])), mt = {
  props: {
    inventory: Object,
    controlled: Boolean,
    mode: String,
    rows: Array,
    world: String,
    objectives: Object,
    width: Number,
    objective_order: Array
    // optional (intenally tracked if missing)
  },
  emits: ["add-item", "toggle-item", "toggle-objective"],
  data() {
    return { targets: {}, orders: [] };
  },
  computed: {
    vanilla_objectives() {
      const e = Object.keys(this.objectives || {});
      return [0, 4].includes(e.length) && !e.find((t) => !j[t]);
    },
    row_slugs() {
      if (this.rows)
        return this.rows;
      let e = se.map((s) => s.slice());
      const t = x[this.world];
      return this.mode === "cwisp" ? this.vanilla_objectives ? e = I.map((s) => s.slice()) : Object.keys(this.objectives || {}).length <= 6 ? e = I : e = at.map((s) => s.slice()) : this.mode === "compact" && (e[4].pop(), e[4].shift(), e.shift()), t && (e = e.map((s) => s.map((a) => t[a] || a))), this.vanilla_objectives || (e = dt(e)), e;
    },
    columns() {
      return Object.keys(this.objectives || {}).length > 15 ? 6 : this.row_slugs[0].length;
    },
    prepped_rows() {
      var s;
      const e = x[this.world] || x.default, t = this.row_slugs.map(
        (a) => a.map((u) => {
          var r;
          const o = this.inventory[u];
          return {
            slug: u,
            numbers: L(o, (r = e._packs) == null ? void 0 : r[u]),
            attrs: {
              class: [lt(u, o), o > 99 && "-three-digits"],
              id: `grid-tracker__${u}`
            }
          };
        })
      );
      if (!this.vanilla_objectives) {
        const a = Object.keys(this.objectives || {}), { columns: u } = this;
        this.mode || t[3].push(...t.pop());
        let o = t.findIndex((r) => r.length < t[0].length);
        for (o === -1 && (o = t.length); a.length > 0; ) {
          for (; ((s = t[o]) == null ? void 0 : s.length) >= u; )
            o++;
          t[o] || t.push([]);
          const r = a.shift(), l = nt(r), m = this.objective_order || this.orders;
          let d;
          m != null && m.includes(r) && (d = m.indexOf(r) + 1), t[o].push({
            // slug vs id is a bit confusing because the varia "ids" are human readable
            slug: r,
            type: "objective",
            numbers: L(d, 1, 1),
            target: this.targets[r],
            attrs: {
              class: `smv-objective -${l} -${this.objectives[r] ? "in" : ""}active`,
              id: `grid-tracker__${l}`
            }
          });
        }
      }
      return t;
    },
    style() {
      const { width: e } = this;
      if (!e)
        return {};
      const t = this.columns + 2 * 0.2 + (this.columns - 1) * 0.1;
      return { fontSize: `${e / t}px` };
    }
  },
  watch: {
    objectives() {
      Object.keys(this.objectives).forEach((t) => {
        this.objectives[t] && !this.orders.includes(t) && this.orders.push(t);
      }), this.orders = this.orders.filter((t) => this.objectives[t]);
    }
  },
  methods: {
    click(e, { slug: t, type: s } = {}) {
      if (s === "objective")
        this.objectives[t] === void 0 ? console.error("trying to toggle non-existant objective") : e.shiftKey || e.ctrlKey ? this.targets[t] = !this.targets[t] : this.$emit("toggle-objective", t);
      else if (ut.includes(t)) {
        const a = e.shiftKey || e.ctrlKey ? -1 : 1;
        !this.controlled && this.$emit("add-item", t, a);
      } else
        !this.controlled && this.$emit("toggle-item", t);
    }
  }
}, pt = ["onClick"], bt = {
  key: 3,
  class: "fa fa-crosshairs _targeted"
};
function ft(e, t, s, a, u, o) {
  const r = oe("sm-cwisp-tracker");
  return i(), n("div", {
    class: p(`grid-tracker smi-tracker ${s.controlled ? "-controlled" : ""}`),
    style: V(o.style)
  }, [
    (i(!0), n(b, null, f(o.prepped_rows, (l, m) => (i(), n("div", {
      key: m,
      class: "grid-tracker__row"
    }, [
      (i(!0), n(b, null, f(l, (d) => (i(), n("div", {
        key: d.slug,
        class: "grid-tracker__cell"
      }, [
        d.slug === "cwisp" ? (i(), ne(r, {
          key: 0,
          inventory: s.inventory,
          onToggleItem: (g) => !s.controlled && e.$emit("toggle-item", g)
        }, null, 8, ["inventory", "onToggleItem"])) : (i(), n("div", Z({ key: 1 }, d.attrs, {
          onClick: (g) => o.click(g, d)
        }), null, 16, pt)),
        d.numbers ? (i(), n("div", {
          key: 2,
          class: p(`grid-tracker__numbers -length-${d.numbers.length}`)
        }, [
          (i(!0), n(b, null, f(d.numbers, (g, ie) => (i(), n("div", {
            key: ie,
            class: p(g)
          }, null, 2))), 128))
        ], 2)) : d.target ? (i(), n("i", bt)) : ae("", !0)
      ]))), 128))
    ]))), 128))
  ], 6);
}
const z = /* @__PURE__ */ y(mt, [["render", ft]]), c = {
  item: (e) => ({ class: e }),
  group: (e, t) => [`pause-inventory__group -group-${e}`, t],
  number: (e) => c.item(`smi-number -number-${e}`),
  numbers: (e, t) => e.toString().padStart(t, 0).split("").map(c.number)
};
c.separator = c.item("flex-grow");
const re = (e) => Array(e || 0).fill().map((t, s) => s), U = (e, t) => ({
  name: "energy-tanks",
  children: re(e).map(() => c.item("smi -ietank")),
  class: c.group("energy-tanks", t)
}), N = (e) => ({
  name: e,
  class: c.group(e),
  children: [c.item("smi -" + e)]
}), ht = {
  beams: ["charge", "ice", "wave", "spazer", "plasma"].map((e) => e + "-beam"),
  suits: ["varia-suit", "gravity-suit"],
  misc: ["morph-ball", "bomb", "spring-ball", "screw-attack"],
  boots: ["hi-jump-boots", "space-jump", "speed-booster"]
}, gt = ["missile", "super-missile", "power-bomb", "grappling-beam", "x-ray"], _t = {
  props: {
    inventory: Object,
    controlled: Boolean,
    world: String,
    width: Number
  },
  emits: ["add-item", "toggle-item"],
  computed: {
    wrapper_class() {
      return [
        "pause-inventory smi-pause-screen",
        this.controlled && "-controlled",
        this.inventory["super-missile"] > 99 && "-high-super-missile",
        this.inventory["power-bomb"] > 99 && "-high-power-bomb"
      ];
    },
    groups() {
      const e = [
        ...this.energy_tanks,
        this.hud_items,
        this.reserve_tanks,
        this.energy_text,
        ...this.pack_numbers,
        ...this.item_groups,
        ...this.pack_controls
      ];
      return this.inventory["reserve-tank"] && (e.push(N("auto")), e.push(N("reserve_text"))), e;
    },
    hud_items() {
      return {
        name: "hud-items",
        class: c.group("hud-items"),
        children: gt.map((e) => ({
          class: ["smi -i" + e, this.inventory[e] || "-inactive"],
          onclick: () => this.$emit("toggle-item", e)
        }))
      };
    },
    pack_numbers() {
      const e = x[this.world] || x.default;
      return ["missile", "super-missile", "power-bomb"].map((t) => {
        var a;
        const s = this.inventory[t] * (((a = e._packs) == null ? void 0 : a[t]) || 1);
        return {
          name: t,
          class: c.group(t),
          children: c.numbers(s || 0, t === "missile" ? 3 : 2)
        };
      });
    },
    pack_controls() {
      return ["missile", "super-missile", "power-bomb", "energy-tank", "reserve-tank"].map((t) => ({
        name: `${t} controls`,
        class: c.group(t + "-controls"),
        children: [
          {
            class: "_plus",
            onclick: () => this.$emit("add-item", t, 1)
          },
          {
            class: "_minus",
            onclick: () => this.$emit("add-item", t, -1)
          }
        ]
      }));
    },
    energy_tanks() {
      const e = this.inventory["energy-tank"];
      return [U(Math.min(e, 7)), U(Math.max(e - 7, 0), "-top")];
    },
    reserve_tanks() {
      const e = this.inventory["reserve-tank"], s = [...re(Math.floor(e)).map(() => c.item("smi -ireserve")), c.separator];
      return e > 0 && (100 * e).toString().split("").forEach((u) => s.push(c.item(`smi-reserve-number -number-${u}`))), {
        name: "reserve-tanks",
        class: c.group("reserve-tanks"),
        children: s
      };
    },
    energy_text() {
      return {
        name: "energy-text",
        class: c.group("energy-text"),
        children: [c.item("smi -energy"), c.separator, c.number(9), c.number(9)]
      };
    },
    item_groups() {
      return Object.entries(ht).map(([e, t]) => ({
        name: e,
        class: c.group(e),
        children: t.map((s) => ({
          class: [`smi-pause-item -${s}`, this.inventory[s] || "-inactive"],
          onclick: () => this.$emit("toggle-item", s)
        }))
      }));
    },
    style() {
      return this.width && { "--inventory-px": `${this.width / 256}px` };
    }
  }
};
function xt(e, t, s, a, u, o) {
  return i(), n("div", {
    class: p(o.wrapper_class),
    style: V(o.style)
  }, [
    (i(!0), n(b, null, f(o.groups, (r) => (i(), n("div", {
      key: r.name,
      class: p(r.class)
    }, [
      (i(!0), n(b, null, f(r.children, (l, m) => (i(), n("div", Z({ key: m }, l), null, 16))), 128))
    ], 2))), 128))
  ], 6);
}
const M = /* @__PURE__ */ y(_t, [["render", xt]]), vt = {
  bosses: "danger",
  minibosses: "warning",
  items: "primary",
  map: "success",
  memes: "info",
  enemies: "default"
}, yt = {
  props: {
    categories: Array,
    is_random: Boolean,
    short_names: Boolean
  },
  emits: ["toggle-objective", "toggle-category"],
  methods: {
    getClass(e) {
      return [`btn btn-${e.selected ? vt[e.category] : "empty"} -objective`, e.disabled && "-disabled"];
    }
  }
}, kt = { class: "objective-selector" }, wt = { key: 0 }, jt = ["checked", "onInput"], $t = { key: 1 }, Ot = { class: "objective-selector__button-list" }, St = ["title", "onClick"], Ct = { class: "objective-selector__name" };
function At(e, t, s, a, u, o) {
  return i(), n("div", kt, [
    (i(!0), n(b, null, f(s.categories, (r) => (i(), n("div", {
      class: "objective-selector__category",
      key: r.id
    }, [
      _("h4", {
        class: p(r.class)
      }, [
        s.is_random ? (i(), n("label", wt, [
          _("input", {
            type: "checkbox",
            checked: r.checked,
            onInput: (l) => e.$emit("toggle-category", r)
          }, null, 40, jt),
          ue(" " + k(r.id), 1)
        ])) : (i(), n("div", $t, k(r.id), 1))
      ], 2),
      _("div", Ot, [
        (i(!0), n(b, null, f(r.objectives, (l) => (i(), n("button", {
          key: l.id,
          class: p(o.getClass(l)),
          title: l.disabled,
          onClick: (m) => !l.disabled && e.$emit("toggle-objective", l.id)
        }, [
          _("i", {
            class: p(l.icon)
          }, null, 2),
          _("span", Ct, k(s.short_names ? l.short : l.id), 1)
        ], 10, St))), 128))
      ])
    ]))), 128))
  ]);
}
const B = /* @__PURE__ */ y(yt, [["render", At]]), Et = {
  CwispTracker: $,
  GridTracker: z,
  PauseTracker: M,
  ObjectiveSelector: B,
  install(e) {
    e.component("SmCwispTracker", $), e.component("SmGridTracker", z), e.component("SmPauseTracker", M), e.component("SmObjectiveSelector", B);
  }
};
export {
  Et as default
};
