<template>
  <div>
    <div style="font-size: 64px">
      <sm-cwisp-tracker :inventory="inventory" @toggle-item="toggle" />
    </div>
    <div class="flex">
      <div>
        <h2>Grid + Cwisp</h2>
        <div>
          <sm-grid-tracker
            :inventory="inventory"
            @toggle-item="toggle"
            @add-item="add"
            :width="300"
            :world="world"
            mode="cwisp"
          />
        </div>
      </div>
      <div>
        <h2>Grid + Cwisp + 1 obj</h2>
        <div>
          <sm-grid-tracker
            :inventory="inventory"
            @toggle-objective="toggleObjective"
            @toggle-item="toggle"
            @add-item="add"
            :width="300"
            :world="world"
            mode="cwisp"
            :objectives="getObjectives(1)"
          />
        </div>
      </div>
      <div>
        <h2>Grid + Cwisp + 8 obj</h2>
        <div>
          <sm-grid-tracker
            :inventory="inventory"
            @toggle-objective="toggleObjective"
            @toggle-item="toggle"
            @add-item="add"
            :width="300"
            :world="world"
            mode="cwisp"
            :objectives="getObjectives(8)"
          />
        </div>
      </div>
      <div>
        <h2>Grid + Cwisp + 18 obj</h2>
        <div>
          <sm-grid-tracker
            :inventory="inventory"
            @toggle-objective="toggleObjective"
            @toggle-item="toggle"
            @add-item="add"
            :width="300"
            :world="world"
            mode="cwisp"
            :objectives="getObjectives(18)"
          />
        </div>
      </div>
      <div>
        <h2>Grid</h2>
        <div>
          <sm-grid-tracker
            mode="grid"
            :inventory="inventory"
            @toggle-item="toggle"
            @toggle-objective="toggleObjective"
            @add-item="add"
            :width="300"
            :world="world"
            :objectives="getObjectives(18)"
          />
        </div>
      </div>
    </div>
    <div>
      <h2>Grid + Compact</h2>
      <div>
        <sm-grid-tracker
          mode="compact"
          :inventory="inventory"
          @toggle-item="toggle"
          @add-item="add"
          :width="300"
          :world="world"
        />
      </div>
    </div>
    <div>
      <h2>Pause Inventory</h2>
      <div>
        <sm-pause-tracker
          :inventory="inventory"
          @toggle-item="toggle"
          @add-item="add"
          :width="300"
          :world="world"
        />
      </div>
    </div>
    <div>
      <h2>Pause Inventory + controlled</h2>
      <div>
        <sm-pause-tracker
          :controlled="true"
          :inventory="inventory"
          @toggle-item="toggle"
          @add-item="add"
          :width="300"
          :world="world"
        />
      </div>
    </div>
  </div>
</template>

<script>
const objectives = [
  'kill the orange geemer',
  'tickle the red fish',
  'clear crateria',
  'kill ridley',
  'explore kraids lair',
  'kill three g 4',
  'kill botwoon',
  'kill golden torizo',
  'activate chozo robots',
  'collect-25-items',
  'visit the animals',
  'kill kraid',
  'kill three minibosses',
  'explore 75 map',
  'explore west maridia',
  'kill spore spawn',
  'kill king cacatac',
  'collect all upgrades',
]

export default {
  data() {
    return {
      inventory: {},
      world: 'nature',
      objectives: Object.fromEntries(objectives.map((o) => [o, false])),
    }
  },
  methods: {
    getObjectives(count) {
      return Object.fromEntries(
        objectives.slice(0, count).map((slug) => [slug, this.objectives[slug]]),
      )
    },
    toggleObjective(slug) {
      this.objectives[slug] = !this.objectives[slug]
    },
    toggle(slug) {
      this.inventory[slug] = !this.inventory[slug]
    },
    add(slug, quantity) {
      this.inventory[slug] = (this.inventory[slug] || 0) + quantity
    },
  },
}
</script>
