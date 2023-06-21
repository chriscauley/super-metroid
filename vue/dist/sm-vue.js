import { openBlock as i, createElementBlock as o, Fragment as p, renderList as u, mergeProps as w, normalizeClass as g, createCommentVNode as j, createBlock as B, resolveDynamicComponent as z, normalizeStyle as C } from "vue";
const d = {
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
  }
}, b = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, a] of t)
    r[n] = a;
  return r;
}, $ = [
  ["energy-tank", "reserve-tank", "missile", "super-missile", "power-bomb"],
  ["charge-beam", "ice-beam", "wave-beam", "spazer-beam", "plasma-beam"],
  ["morph-ball", "varia-suit", "spring-ball", "hi-jump-boots", "space-jump"],
  ["bomb", "gravity-suit", "ridley", "speed-booster", "screw-attack"],
  ["grappling-beam", "kraid", "phantoon", "draygon", "x-ray"]
], I = $[0], N = (e, t) => !e || typeof e != "number" ? null : (t ? e * t : e).toString().padStart(2, 0).split("").map((n) => `smi-number -number-${n}`), O = (e, t) => ["ridley", "draygon", "phantoon", "kraid"].includes(e) ? [`sm-g4-head -${e}`, t && "-inactive"] : [`sm-item -${e}`, !t && "-has-not"], T = {
  props: {
    inventory: Object,
    controlled: Boolean,
    compact: Boolean,
    rows: Array,
    world: String
  },
  emits: ["add-item", "toggle-item"],
  computed: {
    row_slugs() {
      if (this.rows)
        return this.rows;
      let e = $.slice().map((r) => r.slice());
      const t = d[this.world];
      return t && (e = e.map((r) => r.map((n) => t[n] || n))), this.compact && (e[4].pop(), e[4].shift(), e.shift()), e;
    },
    prepped_rows() {
      const e = d[this.world] || d.default;
      return this.row_slugs.map(
        (t) => t.map((r) => {
          var a;
          const n = this.inventory[r];
          return {
            slug: r,
            numbers: N(n, (a = e._packs) == null ? void 0 : a[r]),
            attrs: {
              class: [O(r, n), n > 99 && "-three-digits"],
              id: `grid-tracker__${r}`
            }
          };
        })
      );
    }
  },
  methods: {
    click(e, { slug: t }) {
      if (I.includes(t)) {
        const r = e.shiftKey || e.ctrlKey ? -1 : 1;
        this.$emit("add-item", t, r);
      } else
        this.$emit("toggle-item", t);
    }
  }
}, M = { class: "grid-tracker smi-tracker" }, V = ["onClick"], A = {
  key: 0,
  class: "grid-tracker__numbers"
};
function E(e, t, r, n, a, c) {
  return i(), o("div", M, [
    (i(!0), o(p, null, u(c.prepped_rows, (l, h) => (i(), o("div", {
      key: h,
      class: "grid-tracker__row"
    }, [
      (i(!0), o(p, null, u(l, (m) => (i(), o("div", w({
        key: m.id
      }, m.attrs, {
        onClick: (_) => c.click(_, m)
      }), [
        m.numbers ? (i(), o("div", A, [
          (i(!0), o(p, null, u(m.numbers, (_, S) => (i(), o("div", {
            key: S,
            class: g(_)
          }, null, 2))), 128))
        ])) : j("", !0)
      ], 16, V))), 128))
    ]))), 128))
  ]);
}
const k = /* @__PURE__ */ b(T, [["render", E]]), s = {
  item: (e) => ({ class: e }),
  group: (e, t) => [`pause-inventory__group -group-${e}`, t],
  number: (e) => s.item(`smi-number -number-${e}`),
  numbers: (e, t) => e.toString().padStart(t, 0).split("").map(s.number)
};
s.separator = s.item("flex-grow");
const x = (e) => Array(e || 0).fill().map((t, r) => r), y = (e, t) => ({
  name: "energy-tanks",
  children: x(e).map(() => s.item("smi -ietank")),
  class: s.group("energy-tanks", t)
}), v = (e) => ({
  name: e,
  class: s.group(e),
  children: [s.item("smi -" + e)]
}), G = {
  beams: ["charge", "ice", "wave", "spazer", "plasma"].map((e) => e + "-beam"),
  suits: ["varia-suit", "gravity-suit"],
  misc: ["morph-ball", "bomb", "spring-ball", "screw-attack"],
  boots: ["hi-jump-boots", "space-jump", "speed-booster"]
}, K = ["missile", "super-missile", "power-bomb", "grappling-beam", "x-ray"], P = {
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
      return this.inventory["reserve-tank"] && (e.push(v("auto")), e.push(v("reserve_text"))), e;
    },
    hud_items() {
      return {
        name: "hud-items",
        class: s.group("hud-items"),
        children: K.map((e) => ({
          class: ["smi -i" + e, this.inventory[e] || "-inactive"],
          onclick: () => this.$emit("toggle-item", e)
        }))
      };
    },
    pack_numbers() {
      const e = d[this.world] || d.default;
      return ["missile", "super-missile", "power-bomb"].map((t) => {
        var n;
        const r = this.inventory[t] * (((n = e._packs) == null ? void 0 : n[t]) || 1);
        return {
          name: t,
          class: s.group(t),
          children: s.numbers(r || 0, t === "missile" ? 3 : 2)
        };
      });
    },
    pack_controls() {
      return ["missile", "super-missile", "power-bomb", "energy-tank", "reserve-tank"].map((t) => ({
        name: `${t} controls`,
        class: s.group(t + "-controls"),
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
      return [y(Math.min(e, 7)), y(Math.max(e - 7, 0), "-top")];
    },
    reserve_tanks() {
      const e = this.inventory["reserve-tank"], r = [...x(Math.floor(e)).map(() => s.item("smi -ireserve")), s.separator];
      return e > 0 && (100 * e).toString().split("").forEach((a) => r.push(s.item(`smi-reserve-number -number-${a}`))), {
        name: "reserve-tanks",
        class: s.group("reserve-tanks"),
        children: r
      };
    },
    energy_text() {
      return {
        name: "energy-text",
        class: s.group("energy-text"),
        children: [s.item("smi -energy"), s.separator, s.number(9), s.number(9)]
      };
    },
    item_groups() {
      return Object.entries(G).map(([e, t]) => ({
        name: e,
        class: s.group(e),
        children: t.map((r) => ({
          class: [`smi-pause-item -${r}`, this.inventory[r] || "-inactive"],
          onclick: () => this.$emit("toggle-item", r)
        }))
      }));
    }
  }
};
function D(e, t, r, n, a, c) {
  return i(), o("div", {
    class: g(c.wrapper_class)
  }, [
    (i(!0), o(p, null, u(c.groups, (l) => (i(), o("div", {
      key: l.name,
      class: g(l.class)
    }, [
      (i(!0), o(p, null, u(l.children, (h, m) => (i(), o("div", w({ key: m }, h), null, 16))), 128))
    ], 2))), 128))
  ], 2);
}
const F = /* @__PURE__ */ b(P, [["render", D]]), L = {
  grid: k,
  compact: k,
  pause: F
}, q = {
  name: "ItemTracker",
  props: {
    inventory: Object,
    controlled: Boolean,
    compact: Boolean,
    format: String,
    width: Number
  },
  computed: {
    tagName() {
      return L[this.format];
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
function H(e, t, r, n, a, c) {
  return i(), B(z(c.tagName), {
    inventory: r.inventory,
    controlled: r.controlled,
    compact: r.compact || r.format === "compact",
    style: C(c.style)
  }, null, 8, ["inventory", "controlled", "compact", "style"]);
}
const f = /* @__PURE__ */ b(q, [["render", H]]), Q = {
  ItemTracker: f,
  install(e) {
    e.component("SmItemTracker", f);
  }
};
export {
  Q as default
};
