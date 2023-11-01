import { resolveComponent as T, openBlock as a, createElementBlock as c, normalizeClass as g, Fragment as p, renderList as d, createBlock as j, mergeProps as x, createCommentVNode as B, resolveDynamicComponent as z, normalizeStyle as A } from "vue";
const b = {
  default: {
    _packs: {
      missile: 5,
      "super-missile": 5,
      "power-bomb": 5
    }
  },
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
  const s = e.__vccOpts || e;
  for (const [r, l] of t)
    s[r] = l;
  return s;
}, N = (e) => e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase(), S = [
  ["energy-tank", "reserve-tank", "missile", "super-missile", "power-bomb"],
  ["charge-beam", "ice-beam", "wave-beam", "spazer-beam", "plasma-beam"],
  ["morph-ball", "varia-suit", "spring-ball", "hi-jump-boots", "space-jump"],
  ["bomb", "gravity-suit", "ridley", "speed-booster", "screw-attack"],
  ["grappling-beam", "kraid", "phantoon", "draygon", "x-ray"]
], v = [
  ["cwisp", "morph-ball", "bomb", "spring-ball"],
  ["hi-jump-boots", "speed-booster", "space-jump", "screw-attack"],
  ["varia-suit", "ridley", "gravity-suit"],
  ["kraid", "phantoon", "draygon"]
], V = [
  ["cwisp", "morph-ball", "bomb", "spring-ball", "varia-suit"],
  ["hi-jump-boots", "speed-booster", "space-jump", "screw-attack", "gravity-suit"]
], L = S[0], M = (e, t) => !e || typeof e != "number" ? null : (t ? e * t : e).toString().padStart(2, 0).split("").map((r) => `smi-number -number-${r}`), E = (e, t) => ["ridley", "draygon", "phantoon", "kraid"].includes(e) ? [`sm-g4-head -${e}`, t && "-inactive"] : [`sm-item -${e}`, !t && "-has-not"], C = {
  "kill kraid": !0,
  "kill phantoon": !0,
  "kill draygon": !0,
  "kill ridley": !0,
  kraid: !0,
  phantoon: !0,
  draygon: !0,
  ridley: !0
}, G = (e) => e.map((t) => t.filter((s) => !C[s])), K = {
  props: {
    inventory: Object,
    controlled: Boolean,
    mode: String,
    rows: Array,
    world: String,
    objectives: Object
  },
  emits: ["add-item", "toggle-item", "toggle-objective"],
  computed: {
    vanilla_objectives() {
      return !Object.keys(this.objectives || {}).find((t) => !C[t]);
    },
    row_slugs() {
      if (this.rows)
        return this.rows;
      let e = S.map((s) => s.slice());
      const t = b[this.world];
      return this.mode === "cwisp" ? this.vanilla_objectives ? e = v.map((s) => s.slice()) : Object.keys(this.objectives || {}).length <= 6 ? e = v : e = V.map((s) => s.slice()) : this.mode === "compact" && (e[4].pop(), e[4].shift(), e.shift()), t && (e = e.map((s) => s.map((r) => t[r] || r))), this.vanilla_objectives || (e = G(e)), e;
    },
    prepped_rows() {
      var s;
      const e = b[this.world] || b.default, t = this.row_slugs.map(
        (r) => r.map((l) => {
          var i;
          const o = this.inventory[l];
          return {
            slug: l,
            numbers: M(o, (i = e._packs) == null ? void 0 : i[l]),
            attrs: {
              class: [E(l, o), o > 99 && "-three-digits"],
              id: `grid-tracker__${l}`
            }
          };
        })
      );
      if (!this.vanilla_objectives) {
        const r = Object.keys(this.objectives || {}), l = r.length > 15 ? 6 : t[0].length;
        this.mode || t[3].push(...t.pop());
        let o = t.findIndex((i) => i.length < t[0].length);
        for (o === -1 && (o = t.length); r.length > 0; ) {
          for (; ((s = t[o]) == null ? void 0 : s.length) >= l; )
            o++;
          t[o] || t.push([]);
          const i = r.shift(), m = N(i);
          t[o].push({
            slug: i,
            type: "objective",
            attrs: {
              class: `smv-objective -${m} -${this.objectives[i] ? "in" : ""}active`,
              id: `grid-tracker__${m}`
            }
          });
        }
      }
      return t;
    }
  },
  methods: {
    click(e, { slug: t, type: s } = {}) {
      if (s === "objective")
        this.$emit("toggle-objective", t);
      else if (L.includes(t)) {
        const r = e.shiftKey || e.ctrlKey ? -1 : 1;
        this.$emit("add-item", t, r);
      } else
        this.$emit("toggle-item", t);
    }
  }
}, P = ["onClick"], D = {
  key: 0,
  class: "grid-tracker__numbers"
};
function F(e, t, s, r, l, o) {
  const i = T("sm-cwisp-tracker");
  return a(), c("div", {
    class: g(`grid-tracker smi-tracker ${s.controlled ? "-controlled" : ""}`)
  }, [
    (a(!0), c(p, null, d(o.prepped_rows, (m, k) => (a(), c("div", {
      key: k,
      class: "grid-tracker__row"
    }, [
      (a(!0), c(p, null, d(m, (u) => (a(), c(p, {
        key: u.slug
      }, [
        u.slug === "cwisp" ? (a(), j(i, {
          key: 0,
          inventory: s.inventory,
          onToggleItem: (h) => e.$emit("toggle-item", h)
        }, null, 8, ["inventory", "onToggleItem"])) : (a(), c("div", x({ key: 1 }, u.attrs, {
          onClick: (h) => o.click(h, u)
        }), [
          u.numbers ? (a(), c("div", D, [
            (a(!0), c(p, null, d(u.numbers, (h, O) => (a(), c("div", {
              key: O,
              class: g(h)
            }, null, 2))), 128))
          ])) : B("", !0)
        ], 16, P))
      ], 64))), 128))
    ]))), 128))
  ], 2);
}
const y = /* @__PURE__ */ _(K, [["render", F]]), n = {
  item: (e) => ({ class: e }),
  group: (e, t) => [`pause-inventory__group -group-${e}`, t],
  number: (e) => n.item(`smi-number -number-${e}`),
  numbers: (e, t) => e.toString().padStart(t, 0).split("").map(n.number)
};
n.separator = n.item("flex-grow");
const I = (e) => Array(e || 0).fill().map((t, s) => s), w = (e, t) => ({
  name: "energy-tanks",
  children: I(e).map(() => n.item("smi -ietank")),
  class: n.group("energy-tanks", t)
}), f = (e) => ({
  name: e,
  class: n.group(e),
  children: [n.item("smi -" + e)]
}), Z = {
  beams: ["charge", "ice", "wave", "spazer", "plasma"].map((e) => e + "-beam"),
  suits: ["varia-suit", "gravity-suit"],
  misc: ["morph-ball", "bomb", "spring-ball", "screw-attack"],
  boots: ["hi-jump-boots", "space-jump", "speed-booster"]
}, q = ["missile", "super-missile", "power-bomb", "grappling-beam", "x-ray"], H = {
  props: {
    inventory: Object,
    controlled: Boolean,
    world: String
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
      return this.inventory["reserve-tank"] && (e.push(f("auto")), e.push(f("reserve_text"))), e;
    },
    hud_items() {
      return {
        name: "hud-items",
        class: n.group("hud-items"),
        children: q.map((e) => ({
          class: ["smi -i" + e, this.inventory[e] || "-inactive"],
          onclick: () => this.$emit("toggle-item", e)
        }))
      };
    },
    pack_numbers() {
      const e = b[this.world] || b.default;
      return ["missile", "super-missile", "power-bomb"].map((t) => {
        var r;
        const s = this.inventory[t] * (((r = e._packs) == null ? void 0 : r[t]) || 1);
        return {
          name: t,
          class: n.group(t),
          children: n.numbers(s || 0, t === "missile" ? 3 : 2)
        };
      });
    },
    pack_controls() {
      return ["missile", "super-missile", "power-bomb", "energy-tank", "reserve-tank"].map((t) => ({
        name: `${t} controls`,
        class: n.group(t + "-controls"),
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
      return [w(Math.min(e, 7)), w(Math.max(e - 7, 0), "-top")];
    },
    reserve_tanks() {
      const e = this.inventory["reserve-tank"], s = [...I(Math.floor(e)).map(() => n.item("smi -ireserve")), n.separator];
      return e > 0 && (100 * e).toString().split("").forEach((l) => s.push(n.item(`smi-reserve-number -number-${l}`))), {
        name: "reserve-tanks",
        class: n.group("reserve-tanks"),
        children: s
      };
    },
    energy_text() {
      return {
        name: "energy-text",
        class: n.group("energy-text"),
        children: [n.item("smi -energy"), n.separator, n.number(9), n.number(9)]
      };
    },
    item_groups() {
      return Object.entries(Z).map(([e, t]) => ({
        name: e,
        class: n.group(e),
        children: t.map((s) => ({
          class: [`smi-pause-item -${s}`, this.inventory[s] || "-inactive"],
          onclick: () => this.$emit("toggle-item", s)
        }))
      }));
    }
  }
};
function J(e, t, s, r, l, o) {
  return a(), c("div", {
    class: g(o.wrapper_class)
  }, [
    (a(!0), c(p, null, d(o.groups, (i) => (a(), c("div", {
      key: i.name,
      class: g(i.class)
    }, [
      (a(!0), c(p, null, d(i.children, (m, k) => (a(), c("div", x({ key: k }, m), null, 16))), 128))
    ], 2))), 128))
  ], 2);
}
const Q = /* @__PURE__ */ _(H, [["render", J]]), R = {
  grid: y,
  compact: y,
  pause: Q
}, U = {
  name: "ItemTracker",
  props: {
    inventory: Object,
    controlled: Boolean,
    compact: Boolean,
    format: String,
    width: Number
  },
  emits: ["add-item", "toggle-item"],
  computed: {
    tagName() {
      return R[this.format];
    },
    style() {
      const { width: e } = this;
      if (!e)
        return {};
      const t = 5 + 2 * 0.2 + 4 * 0.1;
      return {
        "--inventory-px": `${e / 256}px`,
        fontSize: `${e / t}px`
      };
    }
  }
};
function W(e, t, s, r, l, o) {
  return a(), j(z(o.tagName), {
    inventory: s.inventory,
    controlled: s.controlled,
    compact: s.compact || s.format === "compact",
    style: A(o.style),
    onAddItem: t[0] || (t[0] = (i, m) => !s.controlled && e.$emit("add-item", i, m)),
    onToggleItem: t[1] || (t[1] = (i) => !s.controlled && e.$emit("toggle-item", i))
  }, null, 40, ["inventory", "controlled", "compact", "style"]);
}
const $ = /* @__PURE__ */ _(U, [["render", W]]), X = ["charge-beam", "wave-beam", "ice-beam", "spazer-beam", "plasma-beam"], Y = {
  props: {
    inventory: Object
  },
  emits: ["toggle-item"],
  computed: {
    beams() {
      return X.map((e) => ({
        id: e,
        class: [`sm-cwisp__cell -${e}`, this.inventory[e] ? "-active" : "-inactive"]
      }));
    }
  }
}, ee = { class: "sm-cwisp" }, te = ["onClick"];
function se(e, t, s, r, l, o) {
  return a(), c("div", ee, [
    (a(!0), c(p, null, d(o.beams, (i) => (a(), c("div", {
      class: g(i.class),
      onClick: (m) => e.$emit("toggle-item", i.id),
      key: i.id
    }, null, 10, te))), 128))
  ]);
}
const re = /* @__PURE__ */ _(Y, [["render", se]]), ne = {
  ItemTracker: $,
  install(e) {
    e.component("SmItemTracker", $), e.component("SmCwispTracker", re);
  }
};
export {
  ne as default
};
