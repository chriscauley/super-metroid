import { openBlock as o, createElementBlock as i, Fragment as p, renderList as u, mergeProps as $, normalizeClass as g, createCommentVNode as B, createBlock as z, resolveDynamicComponent as C, normalizeStyle as N } from "vue";
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
}, x = [
  ["energy-tank", "reserve-tank", "missile", "super-missile", "power-bomb"],
  ["charge-beam", "ice-beam", "wave-beam", "spazer-beam", "plasma-beam"],
  ["morph-ball", "varia-suit", "spring-ball", "hi-jump-boots", "space-jump"],
  ["bomb", "gravity-suit", "ridley", "speed-booster", "screw-attack"],
  ["grappling-beam", "kraid", "phantoon", "draygon", "x-ray"]
], O = x[0], I = (e, t) => !e || typeof e != "number" ? null : (t ? e * t : e).toString().padStart(2, 0).split("").map((n) => `smi-number -number-${n}`), T = (e, t) => ["ridley", "draygon", "phantoon", "kraid"].includes(e) ? [`sm-g4-head -${e}`, t && "-inactive"] : [`sm-item -${e}`, !t && "-has-not"], M = {
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
      let e = x.slice().map((r) => r.slice());
      const t = d[this.world];
      return t && (e = e.map(
        (r) => r.map(
          (n) => t[n] || n
        )
      )), this.compact && (e[4].pop(), e[4].shift(), e.shift()), e;
    },
    prepped_rows() {
      const e = d[this.world] || d.default;
      return this.row_slugs.map(
        (t) => t.map((r) => {
          var a;
          const n = this.inventory[r];
          return {
            slug: r,
            numbers: I(n, (a = e._packs) == null ? void 0 : a[r]),
            attrs: {
              class: [T(r, n), n > 99 && "-three-digits"],
              id: `grid-tracker__${r}`
            }
          };
        })
      );
    }
  },
  methods: {
    click(e, { slug: t }) {
      if (O.includes(t)) {
        const r = e.shiftKey || e.ctrlKey ? -1 : 1;
        this.$emit("add-item", t, r);
      } else
        this.$emit("toggle-item", t);
    }
  }
}, V = { class: "grid-tracker smi-tracker" }, A = ["onClick"], E = {
  key: 0,
  class: "grid-tracker__numbers"
};
function G(e, t, r, n, a, c) {
  return o(), i("div", V, [
    (o(!0), i(p, null, u(c.prepped_rows, (l, h) => (o(), i("div", {
      key: h,
      class: "grid-tracker__row"
    }, [
      (o(!0), i(p, null, u(l, (m) => (o(), i("div", $({
        key: m.id
      }, m.attrs, {
        onClick: (_) => c.click(_, m)
      }), [
        m.numbers ? (o(), i("div", E, [
          (o(!0), i(p, null, u(m.numbers, (_, j) => (o(), i("div", {
            key: j,
            class: g(_)
          }, null, 2))), 128))
        ])) : B("", !0)
      ], 16, A))), 128))
    ]))), 128))
  ]);
}
const k = /* @__PURE__ */ b(M, [["render", G]]), s = {
  item: (e) => ({ class: e }),
  group: (e, t) => [`pause-inventory__group -group-${e}`, t],
  number: (e) => s.item(`smi-number -number-${e}`),
  numbers: (e, t) => e.toString().padStart(t, 0).split("").map(s.number)
};
s.separator = s.item("flex-grow");
const S = (e) => Array(e || 0).fill().map((t, r) => r), y = (e, t) => ({
  name: "energy-tanks",
  children: S(e).map(() => s.item("smi -ietank")),
  class: s.group("energy-tanks", t)
}), v = (e) => ({
  name: e,
  class: s.group(e),
  children: [s.item("smi -" + e)]
}), K = {
  beams: ["charge", "ice", "wave", "spazer", "plasma"].map((e) => e + "-beam"),
  suits: ["varia-suit", "gravity-suit"],
  misc: ["morph-ball", "bomb", "spring-ball", "screw-attack"],
  boots: ["hi-jump-boots", "space-jump", "speed-booster"]
}, P = ["missile", "super-missile", "power-bomb", "grappling-beam", "x-ray"], D = {
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
        children: P.map((e) => ({
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
      const e = this.inventory["reserve-tank"], r = [...S(Math.floor(e)).map(() => s.item("smi -ireserve")), s.separator];
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
      return Object.entries(K).map(([e, t]) => ({
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
function F(e, t, r, n, a, c) {
  return o(), i("div", {
    class: g(c.wrapper_class)
  }, [
    (o(!0), i(p, null, u(c.groups, (l) => (o(), i("div", {
      key: l.name,
      class: g(l.class)
    }, [
      (o(!0), i(p, null, u(l.children, (h, m) => (o(), i("div", $({ key: m }, h), null, 16))), 128))
    ], 2))), 128))
  ], 2);
}
const L = /* @__PURE__ */ b(D, [["render", F]]), f = {
  grid: k,
  compact: k,
  pause: L
}, q = {
  props: {
    inventory: Object,
    controlled: Boolean,
    compact: Boolean,
    format: String,
    width: Number
  },
  computed: {
    tagName() {
      return console.log(f[this.format]), f[this.format];
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
  return o(), z(C(c.tagName), {
    inventory: r.inventory,
    controlled: r.controlled,
    compact: r.compact || r.format === "compact",
    style: N(c.style)
  }, null, 8, ["inventory", "controlled", "compact", "style"]);
}
const w = /* @__PURE__ */ b(q, [["render", H]]), Q = {
  ItemTracker: w,
  install(e) {
    e.component("SmItemTracker", w);
  }
};
export {
  Q as default
};
