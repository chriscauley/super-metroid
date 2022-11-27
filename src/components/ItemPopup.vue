<template>
  <div id="itemPopup" class="itemPopup">
    <input id="locName" name="locName" style="display: none" type="text" />
    <table class="full">
      <colgroup>
        <col class="full" />
      </colgroup>
      <tr>
        <td><p id="itemPopupText" class="center">Item to place at LOC:</p></td>
      </tr>
      <tr>
        <td>
          <ul class="thumbnails image_picker_selector">
            <li class="group" v-for="group in groups" :key="group.name">
              <ul>
                <li class="group_title">{{ group.name }}</li>
                <li v-for="item in group.items" :key="item.name">
                  <div class="thumbnail">
                    <img class="image_picker_image" :src="item.src" title="item.name" />
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </td>
      </tr>
      <tr id="hideItemVisibility" style="display: none">
        <td>Hide this item:</td>
        <td><input id="hideItem" name="hideItem" type="checkbox" /></td>
      </tr>
      <tr>
        <td colspan="2" class="blankLastRow"></td>
      </tr>
    </table>
    <table>
      <tr>
        <td class="half">
          <button id="placeItemButton" type="button" onclick="placeItem()" class="full">
            Place
          </button>
        </td>
        <td class="half">
          <button type="button" onclick="hideItemPopup()" class="full">Cancel</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { varia_item_groups } from '@/data/old'

export default {
  data() {
    return { groups: varia_item_groups }
  },
}
</script>
