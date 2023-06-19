# SM Vue

This is a component library for making Super Metroid fans sites in Vue.

## Usage

You'll first need to add the relevant css files via cdn. The first supplies all the icons for items and the second is for the inventory interface.

``` html
    <link href="https://cdn.unrest.io/super-metroid-icons/super-metroid.css" rel="stylesheet" />
    <link href="https://cdn.unrest.io/super-metroid-icons/inventory.css" rel="stylesheet" />
```

Now you can `npm install --save sm-vue` and start using it in your vue app.

``` js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import sm from 'sm-vue'

createApp(App).use(components).mount('#app')

// App.vue
<template>
  <sm-item-tracker
    format="grid"
    :inventory="inventory"
    @toggle-item="toggle"
    @add-item="add"
    :width="300"
  />
</template>

<script>
export default {
  data() {
    return { inventory: {} }
  },
  methods: {
    toggle(slug) {
      this.inventory[slug] = !this.inventory[slug]
    },
    add(slug, quantity) {
      this.inventory[slug] = (this.inventory[slug] || 0) + quantity
    }
  }
}
</script>
```

The result should be a 300px inventory tracker component. DM me on discord (@badatmetroid) if you're interested in using this library and I'll add more docs.