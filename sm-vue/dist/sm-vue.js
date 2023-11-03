import { resolveComponent as B, openBlock as n, createElementBlock as c, normalizeClass as d, normalizeStyle as S, Fragment as h, renderList as b, createBlock as I, mergeProps as C, createCommentVNode as N } from "vue";
const _ = {
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
}, v = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [o, m] of t)
    s[o] = m;
  return s;
}, V = (e) => e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\W_]+/g, "-").toLowerCase(), O = [
  ["energy-tank", "reserve-tank", "missile", "super-missile", "power-bomb"],
  ["charge-beam", "ice-beam", "wave-beam", "spazer-beam", "plasma-beam"],
  ["morph-ball", "varia-suit", "spring-ball", "hi-jump-boots", "space-jump"],
  ["bomb", "gravity-suit", "ridley", "speed-booster", "screw-attack"],
  ["grappling-beam", "kraid", "phantoon", "draygon", "x-ray"]
], k = [
  ["cwisp", "morph-ball", "bomb", "spring-ball"],
  ["hi-jump-boots", "speed-booster", "space-jump", "screw-attack"],
  ["varia-suit", "ridley", "gravity-suit"],
  ["kraid", "phantoon", "draygon"]
], L = [
  ["cwisp", "morph-ball", "bomb", "spring-ball", "varia-suit"],
  ["hi-jump-boots", "speed-booster", "space-jump", "screw-attack", "gravity-suit"]
], M = O[0], y = (e, t, s = 2) => !e || typeof e != "number" ? null : (t ? e * t : e).toString().padStart(s, 0).split("").map((m) => `smi-number -number-${m}`), E = (e, t) => ["ridley", "draygon", "phantoon", "kraid"].includes(e) ? [`sm-g4-head -${e}`, t && "-inactive"] : [`sm-item -${e}`, !t && "-has-not"], T = {
  "kill kraid": !0,
  "kill phantoon": !0,
  "kill draygon": !0,
  "kill ridley": !0,
  kraid: !0,
  phantoon: !0,
  draygon: !0,
  ridley: !0
}, G = (e) => e.map((t) => t.filter((s) => !T[s])), P = {
  props: {
    inventory: Object,
    controlled: Boolean,
    mode: String,
    rows: Array,
    world: String,
    objectives: Object,
    width: Number,
    objective_order: Array
  },
  emits: ["add-item", "toggle-item", "toggle-objective"],
  computed: {
    vanilla_objectives() {
      return !Object.keys(this.objectives || {}).find((t) => !T[t]);
    },
    row_slugs() {
      if (this.rows)
        return this.rows;
      let e = O.map((s) => s.slice());
      const t = _[this.world];
      return this.mode === "cwisp" ? this.vanilla_objectives ? e = k.map((s) => s.slice()) : Object.keys(this.objectives || {}).length <= 6 ? e = k : e = L.map((s) => s.slice()) : this.mode === "compact" && (e[4].pop(), e[4].shift(), e.shift()), t && (e = e.map((s) => s.map((o) => t[o] || o))), this.vanilla_objectives || (e = G(e)), e;
    },
    columns() {
      return Object.keys(this.objectives || {}).length > 15 ? 6 : this.row_slugs[0].length;
    },
    prepped_rows() {
      var s, o;
      const e = _[this.world] || _.default, t = this.row_slugs.map(
        (m) => m.map((a) => {
          var l;
          const i = this.inventory[a];
          return {
            slug: a,
            numbers: y(i, (l = e._packs) == null ? void 0 : l[a]),
            attrs: {
              class: [E(a, i), i > 99 && "-three-digits"],
              id: `grid-tracker__${a}`
            }
          };
        })
      );
      if (!this.vanilla_objectives) {
        const m = Object.keys(this.objectives || {}), { columns: a } = this;
        this.mode || t[3].push(...t.pop());
        let i = t.findIndex((l) => l.length < t[0].length);
        for (i === -1 && (i = t.length); m.length > 0; ) {
          for (; ((s = t[i]) == null ? void 0 : s.length) >= a; )
            i++;
          t[i] || t.push([]);
          const l = m.shift(), u = V(l);
          let p;
          (o = this.objective_order) != null && o.includes(l) && (p = this.objective_order.indexOf(l) + 1), t[i].push({
            slug: l,
            type: "objective",
            numbers: y(p, 1, 1),
            attrs: {
              class: `smv-objective -${u} -${this.objectives[l] ? "in" : ""}active`,
              id: `grid-tracker__${u}`
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
      const t = this.columns + 2 * 0.2 + 4 * 0.1;
      return {
        fontSize: `${e / t}px`
      };
    }
  },
  methods: {
    click(e, { slug: t, type: s } = {}) {
      if (s === "objective")
        this.$emit("toggle-objective", t);
      else if (M.includes(t)) {
        const o = e.shiftKey || e.ctrlKey ? -1 : 1;
        this.$emit("add-item", t, o);
      } else
        this.$emit("toggle-item", t);
    }
  }
}, K = ["onClick"];
function F(e, t, s, o, m, a) {
  const i = B("sm-cwisp-tracker");
  return n(), c("div", {
    class: d(`grid-tracker smi-tracker ${s.controlled ? "-controlled" : ""}`),
    style: S(a.style)
  }, [
    (n(!0), c(h, null, b(a.prepped_rows, (l, u) => (n(), c("div", {
      key: u,
      class: "grid-tracker__row"
    }, [
      (n(!0), c(h, null, b(l, (p) => (n(), c("div", {
        key: p.slug,
        class: "grid-tracker__cell"
      }, [
        p.slug === "cwisp" ? (n(), I(i, {
          key: 0,
          inventory: s.inventory,
          onToggleItem: (g) => e.$emit("toggle-item", g)
        }, null, 8, ["inventory", "onToggleItem"])) : (n(), c("div", C({ key: 1 }, p.attrs, {
          onClick: (g) => a.click(g, p)
        }), null, 16, K)),
        p.numbers ? (n(), c("div", {
          key: 2,
          class: d(`grid-tracker__numbers -length-${p.numbers.length}`)
        }, [
          (n(!0), c(h, null, b(p.numbers, (g, A) => (n(), c("div", {
            key: A,
            class: d(g)
          }, null, 2))), 128))
        ], 2)) : N("", !0)
      ]))), 128))
    ]))), 128))
  ], 6);
}
const w = /* @__PURE__ */ v(P, [["render", F]]), r = {
  item: (e) => ({ class: e }),
  group: (e, t) => [`pause-inventory__group -group-${e}`, t],
  number: (e) => r.item(`smi-number -number-${e}`),
  numbers: (e, t) => e.toString().padStart(t, 0).split("").map(r.number)
};
r.separator = r.item("flex-grow");
const z = (e) => Array(e || 0).fill().map((t, s) => s), f = (e, t) => ({
  name: "energy-tanks",
  children: z(e).map(() => r.item("smi -ietank")),
  class: r.group("energy-tanks", t)
}), j = (e) => ({
  name: e,
  class: r.group(e),
  children: [r.item("smi -" + e)]
}), W = {
  beams: ["charge", "ice", "wave", "spazer", "plasma"].map((e) => e + "-beam"),
  suits: ["varia-suit", "gravity-suit"],
  misc: ["morph-ball", "bomb", "spring-ball", "screw-attack"],
  boots: ["hi-jump-boots", "space-jump", "speed-booster"]
}, Z = ["missile", "super-missile", "power-bomb", "grappling-beam", "x-ray"], q = {
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
      return this.inventory["reserve-tank"] && (e.push(j("auto")), e.push(j("reserve_text"))), e;
    },
    hud_items() {
      return {
        name: "hud-items",
        class: r.group("hud-items"),
        children: Z.map((e) => ({
          class: ["smi -i" + e, this.inventory[e] || "-inactive"],
          onclick: () => this.$emit("toggle-item", e)
        }))
      };
    },
    pack_numbers() {
      const e = _[this.world] || _.default;
      return ["missile", "super-missile", "power-bomb"].map((t) => {
        var o;
        const s = this.inventory[t] * (((o = e._packs) == null ? void 0 : o[t]) || 1);
        return {
          name: t,
          class: r.group(t),
          children: r.numbers(s || 0, t === "missile" ? 3 : 2)
        };
      });
    },
    pack_controls() {
      return ["missile", "super-missile", "power-bomb", "energy-tank", "reserve-tank"].map((t) => ({
        name: `${t} controls`,
        class: r.group(t + "-controls"),
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
      return [f(Math.min(e, 7)), f(Math.max(e - 7, 0), "-top")];
    },
    reserve_tanks() {
      const e = this.inventory["reserve-tank"], s = [...z(Math.floor(e)).map(() => r.item("smi -ireserve")), r.separator];
      return e > 0 && (100 * e).toString().split("").forEach((m) => s.push(r.item(`smi-reserve-number -number-${m}`))), {
        name: "reserve-tanks",
        class: r.group("reserve-tanks"),
        children: s
      };
    },
    energy_text() {
      return {
        name: "energy-text",
        class: r.group("energy-text"),
        children: [r.item("smi -energy"), r.separator, r.number(9), r.number(9)]
      };
    },
    item_groups() {
      return Object.entries(W).map(([e, t]) => ({
        name: e,
        class: r.group(e),
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
function D(e, t, s, o, m, a) {
  return n(), c("div", {
    class: d(a.wrapper_class),
    style: S(a.style)
  }, [
    (n(!0), c(h, null, b(a.groups, (i) => (n(), c("div", {
      key: i.name,
      class: d(i.class)
    }, [
      (n(!0), c(h, null, b(i.children, (l, u) => (n(), c("div", C({ key: u }, l), null, 16))), 128))
    ], 2))), 128))
  ], 6);
}
const $ = /* @__PURE__ */ v(q, [["render", D]]), H = ["charge-beam", "wave-beam", "ice-beam", "spazer-beam", "plasma-beam"], J = {
  props: {
    inventory: Object
  },
  emits: ["toggle-item"],
  computed: {
    beams() {
      return H.map((e) => ({
        id: e,
        class: [`sm-cwisp__cell -${e}`, this.inventory[e] ? "-active" : "-inactive"]
      }));
    }
  }
}, Q = { class: "sm-cwisp" }, R = ["onClick"];
function U(e, t, s, o, m, a) {
  return n(), c("div", Q, [
    (n(!0), c(h, null, b(a.beams, (i) => (n(), c("div", {
      class: d(i.class),
      onClick: (l) => e.$emit("toggle-item", i.id),
      key: i.id
    }, null, 10, R))), 128))
  ]);
}
const x = /* @__PURE__ */ v(J, [["render", U]]), Y = {
  GridTracker: w,
  PauseTracker: $,
  CwispTracker: x,
  install(e) {
    e.component("SmGridTracker", w), e.component("SmPauseTracker", $), e.component("SmCwispTracker", x);
  }
};
export {
  Y as default
};
