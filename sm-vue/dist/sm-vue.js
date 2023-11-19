import { resolveComponent as re, openBlock as a, createElementBlock as c, normalizeClass as b, normalizeStyle as z, Fragment as f, renderList as h, createBlock as se, mergeProps as M, createCommentVNode as ie } from "vue";
var v = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function oe(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ne = 1 / 0, ue = "[object Symbol]", ae = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, ce = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, N = "\\ud800-\\udfff", le = "\\u0300-\\u036f\\ufe20-\\ufe23", de = "\\u20d0-\\u20f0", Z = "\\u2700-\\u27bf", G = "a-z\\xdf-\\xf6\\xf8-\\xff", me = "\\xac\\xb1\\xd7\\xf7", pe = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", be = "\\u2000-\\u206f", fe = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", P = "A-Z\\xc0-\\xd6\\xd8-\\xde", he = "\\ufe0e\\ufe0f", B = me + pe + be + fe, y = "['’]", k = "[" + B + "]", D = "[" + le + de + "]", V = "\\d+", ge = "[" + Z + "]", W = "[" + G + "]", F = "[^" + N + B + V + Z + G + P + "]", xe = "\\ud83c[\\udffb-\\udfff]", ve = "(?:" + D + "|" + xe + ")", ye = "[^" + N + "]", K = "(?:\\ud83c[\\udde6-\\uddff]){2}", J = "[\\ud800-\\udbff][\\udc00-\\udfff]", p = "[" + P + "]", _e = "\\u200d", w = "(?:" + W + "|" + F + ")", ke = "(?:" + p + "|" + F + ")", j = "(?:" + y + "(?:d|ll|m|re|s|t|ve))?", $ = "(?:" + y + "(?:D|LL|M|RE|S|T|VE))?", Y = ve + "?", H = "[" + he + "]?", we = "(?:" + _e + "(?:" + [ye, K, J].join("|") + ")" + H + Y + ")*", je = H + Y + we, $e = "(?:" + [ge, K, J].join("|") + ")" + je, Oe = RegExp(y, "g"), Se = RegExp(D, "g"), Ae = RegExp([
  p + "?" + W + "+" + j + "(?=" + [k, p, "$"].join("|") + ")",
  ke + "+" + $ + "(?=" + [k, p + w, "$"].join("|") + ")",
  p + "?" + w + "+" + j,
  p + "+" + $,
  V,
  $e
].join("|"), "g"), Ce = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Re = {
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
}, Te = typeof v == "object" && v && v.Object === Object && v, Ee = typeof self == "object" && self && self.Object === Object && self, Le = Te || Ee || Function("return this")();
function Ie(e, t, r, o) {
  var n = -1, s = e ? e.length : 0;
  for (o && s && (r = e[++n]); ++n < s; )
    r = t(r, e[n], n, e);
  return r;
}
function Ue(e) {
  return e.match(ae) || [];
}
function ze(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var Me = ze(Re);
function Ne(e) {
  return Ce.test(e);
}
function Ze(e) {
  return e.match(Ae) || [];
}
var Ge = Object.prototype, Pe = Ge.toString, O = Le.Symbol, S = O ? O.prototype : void 0, A = S ? S.toString : void 0;
function Be(e) {
  if (typeof e == "string")
    return e;
  if (We(e))
    return A ? A.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -ne ? "-0" : t;
}
function De(e) {
  return function(t) {
    return Ie(Je(Fe(t).replace(Oe, "")), e, "");
  };
}
function Ve(e) {
  return !!e && typeof e == "object";
}
function We(e) {
  return typeof e == "symbol" || Ve(e) && Pe.call(e) == ue;
}
function q(e) {
  return e == null ? "" : Be(e);
}
function Fe(e) {
  return e = q(e), e && e.replace(ce, Me).replace(Se, "");
}
var Ke = De(function(e, t, r) {
  return e + (r ? "-" : "") + t.toLowerCase();
});
function Je(e, t, r) {
  return e = q(e), t = r ? void 0 : t, t === void 0 ? Ne(e) ? Ze(e) : Ue(e) : e.match(t) || [];
}
var Ye = Ke;
const He = /* @__PURE__ */ oe(Ye), x = {
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
}, _ = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [o, n] of t)
    r[o] = n;
  return r;
}, qe = (e) => He(e.toLowerCase().replace("'", "")), Q = [
  ["energy-tank", "reserve-tank", "missile", "super-missile", "power-bomb"],
  ["charge-beam", "ice-beam", "wave-beam", "spazer-beam", "plasma-beam"],
  ["morph-ball", "varia-suit", "spring-ball", "hi-jump-boots", "space-jump"],
  ["bomb", "gravity-suit", "ridley", "speed-booster", "screw-attack"],
  ["grappling-beam", "kraid", "phantoon", "draygon", "x-ray"]
], C = [
  ["cwisp", "morph-ball", "bomb", "spring-ball"],
  ["hi-jump-boots", "speed-booster", "space-jump", "screw-attack"],
  ["varia-suit", "ridley", "gravity-suit"],
  ["kraid", "phantoon", "draygon"]
], Qe = [
  ["cwisp", "morph-ball", "bomb", "spring-ball", "varia-suit"],
  ["hi-jump-boots", "speed-booster", "space-jump", "screw-attack", "gravity-suit"]
], Xe = Q[0], R = (e, t, r = 2) => !e || typeof e != "number" ? null : (t ? e * t : e).toString().padStart(r, 0).split("").map((n) => `smi-number -number-${n}`), et = (e, t) => ["ridley", "draygon", "phantoon", "kraid"].includes(e) ? [`sm-g4-head -${e}`, t && "-inactive"] : [`sm-item -${e}`, !t && "-has-not"], X = {
  "kill kraid": !0,
  "kill phantoon": !0,
  "kill draygon": !0,
  "kill ridley": !0,
  kraid: !0,
  phantoon: !0,
  draygon: !0,
  ridley: !0
}, tt = (e) => e.map((t) => t.filter((r) => !X[r])), rt = {
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
  watch: {
    objectives() {
      Object.keys(this.objectives).forEach((t) => {
        this.objectives[t] && !this.orders.includes(t) && this.orders.push(t);
      }), this.orders = this.orders.filter((t) => this.objectives[t]);
    }
  },
  emits: ["add-item", "toggle-item", "toggle-objective"],
  data() {
    return { targets: {}, orders: [] };
  },
  computed: {
    vanilla_objectives() {
      const e = Object.keys(this.objectives || {});
      return e.length === 4 && !e.find((t) => !X[t]);
    },
    row_slugs() {
      if (this.rows)
        return this.rows;
      let e = Q.map((r) => r.slice());
      const t = x[this.world];
      return this.mode === "cwisp" ? this.vanilla_objectives ? e = C.map((r) => r.slice()) : Object.keys(this.objectives || {}).length <= 6 ? e = C : e = Qe.map((r) => r.slice()) : this.mode === "compact" && (e[4].pop(), e[4].shift(), e.shift()), t && (e = e.map((r) => r.map((o) => t[o] || o))), this.vanilla_objectives || (e = tt(e)), e;
    },
    columns() {
      return Object.keys(this.objectives || {}).length > 15 ? 6 : this.row_slugs[0].length;
    },
    prepped_rows() {
      var r;
      const e = x[this.world] || x.default, t = this.row_slugs.map(
        (o) => o.map((n) => {
          var u;
          const s = this.inventory[n];
          return {
            slug: n,
            numbers: R(s, (u = e._packs) == null ? void 0 : u[n]),
            attrs: {
              class: [et(n, s), s > 99 && "-three-digits"],
              id: `grid-tracker__${n}`
            }
          };
        })
      );
      if (!this.vanilla_objectives) {
        const o = Object.keys(this.objectives || {}), { columns: n } = this;
        this.mode || t[3].push(...t.pop());
        let s = t.findIndex((u) => u.length < t[0].length);
        for (s === -1 && (s = t.length); o.length > 0; ) {
          for (; ((r = t[s]) == null ? void 0 : r.length) >= n; )
            s++;
          t[s] || t.push([]);
          const u = o.shift(), m = qe(u), d = this.objective_order || this.orders;
          let l;
          d != null && d.includes(u) && (l = d.indexOf(u) + 1), t[s].push({
            // slug vs id is a bit confusing because the varia "ids" are human readable
            slug: u,
            type: "objective",
            numbers: R(l, 1, 1),
            target: this.targets[u],
            attrs: {
              class: `smv-objective -${m} -${this.objectives[u] ? "in" : ""}active`,
              id: `grid-tracker__${m}`
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
  methods: {
    click(e, { slug: t, type: r } = {}) {
      if (r === "objective")
        this.objectives[t] === void 0 ? console.error("trying to toggle non-existant objective") : e.shiftKey || e.ctrlKey ? this.targets[t] = !this.targets[t] : this.$emit("toggle-objective", t);
      else if (Xe.includes(t)) {
        const o = e.shiftKey || e.ctrlKey ? -1 : 1;
        !this.controlled && this.$emit("add-item", t, o);
      } else
        !this.controlled && this.$emit("toggle-item", t);
    }
  }
}, st = ["onClick"], it = {
  key: 3,
  class: "fa fa-crosshairs _targeted"
};
function ot(e, t, r, o, n, s) {
  const u = re("sm-cwisp-tracker");
  return a(), c("div", {
    class: b(`grid-tracker smi-tracker ${r.controlled ? "-controlled" : ""}`),
    style: z(s.style)
  }, [
    (a(!0), c(f, null, h(s.prepped_rows, (m, d) => (a(), c("div", {
      key: d,
      class: "grid-tracker__row"
    }, [
      (a(!0), c(f, null, h(m, (l) => (a(), c("div", {
        key: l.slug,
        class: "grid-tracker__cell"
      }, [
        l.slug === "cwisp" ? (a(), se(u, {
          key: 0,
          inventory: r.inventory,
          onToggleItem: (g) => !r.controlled && e.$emit("toggle-item", g)
        }, null, 8, ["inventory", "onToggleItem"])) : (a(), c("div", M({ key: 1 }, l.attrs, {
          onClick: (g) => s.click(g, l)
        }), null, 16, st)),
        l.numbers ? (a(), c("div", {
          key: 2,
          class: b(`grid-tracker__numbers -length-${l.numbers.length}`)
        }, [
          (a(!0), c(f, null, h(l.numbers, (g, te) => (a(), c("div", {
            key: te,
            class: b(g)
          }, null, 2))), 128))
        ], 2)) : l.target ? (a(), c("i", it)) : ie("", !0)
      ]))), 128))
    ]))), 128))
  ], 6);
}
const T = /* @__PURE__ */ _(rt, [["render", ot]]), i = {
  item: (e) => ({ class: e }),
  group: (e, t) => [`pause-inventory__group -group-${e}`, t],
  number: (e) => i.item(`smi-number -number-${e}`),
  numbers: (e, t) => e.toString().padStart(t, 0).split("").map(i.number)
};
i.separator = i.item("flex-grow");
const ee = (e) => Array(e || 0).fill().map((t, r) => r), E = (e, t) => ({
  name: "energy-tanks",
  children: ee(e).map(() => i.item("smi -ietank")),
  class: i.group("energy-tanks", t)
}), L = (e) => ({
  name: e,
  class: i.group(e),
  children: [i.item("smi -" + e)]
}), nt = {
  beams: ["charge", "ice", "wave", "spazer", "plasma"].map((e) => e + "-beam"),
  suits: ["varia-suit", "gravity-suit"],
  misc: ["morph-ball", "bomb", "spring-ball", "screw-attack"],
  boots: ["hi-jump-boots", "space-jump", "speed-booster"]
}, ut = ["missile", "super-missile", "power-bomb", "grappling-beam", "x-ray"], at = {
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
      return this.inventory["reserve-tank"] && (e.push(L("auto")), e.push(L("reserve_text"))), e;
    },
    hud_items() {
      return {
        name: "hud-items",
        class: i.group("hud-items"),
        children: ut.map((e) => ({
          class: ["smi -i" + e, this.inventory[e] || "-inactive"],
          onclick: () => this.$emit("toggle-item", e)
        }))
      };
    },
    pack_numbers() {
      const e = x[this.world] || x.default;
      return ["missile", "super-missile", "power-bomb"].map((t) => {
        var o;
        const r = this.inventory[t] * (((o = e._packs) == null ? void 0 : o[t]) || 1);
        return {
          name: t,
          class: i.group(t),
          children: i.numbers(r || 0, t === "missile" ? 3 : 2)
        };
      });
    },
    pack_controls() {
      return ["missile", "super-missile", "power-bomb", "energy-tank", "reserve-tank"].map((t) => ({
        name: `${t} controls`,
        class: i.group(t + "-controls"),
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
      return [E(Math.min(e, 7)), E(Math.max(e - 7, 0), "-top")];
    },
    reserve_tanks() {
      const e = this.inventory["reserve-tank"], r = [...ee(Math.floor(e)).map(() => i.item("smi -ireserve")), i.separator];
      return e > 0 && (100 * e).toString().split("").forEach((n) => r.push(i.item(`smi-reserve-number -number-${n}`))), {
        name: "reserve-tanks",
        class: i.group("reserve-tanks"),
        children: r
      };
    },
    energy_text() {
      return {
        name: "energy-text",
        class: i.group("energy-text"),
        children: [i.item("smi -energy"), i.separator, i.number(9), i.number(9)]
      };
    },
    item_groups() {
      return Object.entries(nt).map(([e, t]) => ({
        name: e,
        class: i.group(e),
        children: t.map((r) => ({
          class: [`smi-pause-item -${r}`, this.inventory[r] || "-inactive"],
          onclick: () => this.$emit("toggle-item", r)
        }))
      }));
    },
    style() {
      return this.width && { "--inventory-px": `${this.width / 256}px` };
    }
  }
};
function ct(e, t, r, o, n, s) {
  return a(), c("div", {
    class: b(s.wrapper_class),
    style: z(s.style)
  }, [
    (a(!0), c(f, null, h(s.groups, (u) => (a(), c("div", {
      key: u.name,
      class: b(u.class)
    }, [
      (a(!0), c(f, null, h(u.children, (m, d) => (a(), c("div", M({ key: d }, m), null, 16))), 128))
    ], 2))), 128))
  ], 6);
}
const I = /* @__PURE__ */ _(at, [["render", ct]]), lt = ["charge-beam", "wave-beam", "ice-beam", "spazer-beam", "plasma-beam"], dt = {
  props: {
    inventory: Object
  },
  emits: ["toggle-item"],
  computed: {
    beams() {
      return lt.map((e) => ({
        id: e,
        class: [`sm-cwisp__cell -${e}`, this.inventory[e] ? "-active" : "-inactive"]
      }));
    }
  }
}, mt = { class: "sm-cwisp" }, pt = ["onClick"];
function bt(e, t, r, o, n, s) {
  return a(), c("div", mt, [
    (a(!0), c(f, null, h(s.beams, (u) => (a(), c("div", {
      class: b(u.class),
      onClick: (m) => e.$emit("toggle-item", u.id),
      key: u.id
    }, null, 10, pt))), 128))
  ]);
}
const U = /* @__PURE__ */ _(dt, [["render", bt]]), ht = {
  GridTracker: T,
  PauseTracker: I,
  CwispTracker: U,
  install(e) {
    e.component("SmGridTracker", T), e.component("SmPauseTracker", I), e.component("SmCwispTracker", U);
  }
};
export {
  ht as default
};
