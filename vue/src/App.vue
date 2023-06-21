<template>
  <div>
    <div>
      <h2>Grid</h2>
      <sm-item-tracker
        format="grid"
        :inventory="inventory"
        @toggle-item="toggle"
        @add-item="add"
        :width="300"
        :world="world"
      />
    </div>
    <div>
      <h2>Grid + Compact</h2>
      <sm-item-tracker
        format="grid"
        :compact="true"
        :inventory="inventory"
        @toggle-item="toggle"
        @add-item="add"
        :width="300"
        :world="world"
      />
    </div>
    <div>
      <h2>Pause Inventory</h2>
      <sm-item-tracker
        format="pause"
        :inventory="inventory"
        @toggle-item="toggle"
        @add-item="add"
        :width="300"
        :world="world"
      />
    </div>
    <div>
      <h2>Pause Inventory + controlled</h2>
      <sm-item-tracker
        format="pause"
        :controlled="true"
        :inventory="inventory"
        @toggle-item="toggle"
        @add-item="add"
        :width="300"
        :world="world"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { inventory: {}, world: 'nature' }
  },
  methods: {
    toggle(slug) {
      this.inventory[slug] = !this.inventory[slug]
    },
    add(slug, quantity) {
      this.inventory[slug] = (this.inventory[slug] || 0) + quantity
    },
  },
}
</script>
