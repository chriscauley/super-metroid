import ItemList from './ItemList.vue';

export default {
  ItemList,
  install(app) {
    app.component('ItemList', ItemList)
  }
}