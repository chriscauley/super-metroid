<template>
  <div>
    <h3>Objective Icon key</h3>
    <div class="objective-help">
      <div
        v-for="(objectives, category) in objectives_by_category"
        :key="category"
        class="objective-help__category"
      >
        <h4 class="objective-help__category-name">{{ category }}</h4>
        <div class="objective-help__list">
          <div v-for="(column, i) in getColumns(objectives)" :key="i">
            <div v-for="objective in column" :key="objective.id" class="objective-help__item">
              <i :class="objective.icon" />
              <div class="objective-help__title">
                {{ objective.id }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <h3>Objective Notes</h3>
      <ul class="browser-default">
        <li>
          <b>Clear AREA</b>: collect all available items of the current major split in 'area' (eg
          major/minor, chozo, or full). Forces 'VARIA HUD' on to see how many are left in each area.
          <br />
          <b>These objectives are incompatible with Scavenger Hunt and Disabled Tourian.</b>
        </li>
        <li>
          <b>Collect All Upgrades</b>: collect all items except ammo, energy, and reserve tanks.
        </li>
        <li>
          <b>Tickle the Red Fish</b>: use grapple on the
          <a href="https://wiki.supermetroid.run/Red_Fish_Room" target="_blank">Red Fish</a>
        </li>
        <li>
          <b>Kill the orange Geemer</b>: kill the orange Geemer that follows you on the little
          bridge before
          <a href="https://wiki.supermetroid.run/Bowling_Alley" target="_blank">Bowling Alley</a>
        </li>
        <li>
          <b>Kill Shaktool</b>: "pay a visit" to
          <a href="https://wiki.supermetroid.run/Shaktool_Room" target="_blank">Shaktool</a>
        </li>
        <li>
          <b>Activate Chozo Robots</b>: kill
          <a href="https://wiki.supermetroid.run/Bomb_Torizo" target="_blank">Bomb Torizo</a>, kill
          <a href="https://wiki.supermetroid.run/Golden_Torizo%27s_Room" target="_blank"></a>Golden
          Torizo, activate he
          <a href="https://wiki.supermetroid.run/Acid_Statue_Room" target="_blank">Acid Statue</a>,
          and the
          <a href="https://wiki.supermetroid.run/Bowling_Alley" target="_blank">Bowling Chozo</a>
          <br />
          <b>Note:</b> If VARIA tweaks are disabled, Bomb Torizo will not wake up without Bombs and
          the Acid Statue will not activate without Space Jump, greatly increasing the length of the
          seed.
        </li>
        <li>
          <b>Visit the Animals</b>: Go visit the
          <a href="https://wiki.supermetroid.run/Green_Brinstar_Main_Shaft" target="_blank"
            >Etecoons</a
          >
          and the <a href="https://wiki.supermetroid.run/Dachora_Room" target="_blank">Dachora</a>
        </li>
        <li>
          <b>Kill King Cacatac</b>: kill the most evil boss of Super Metroid, contemplating its
          subjects from the top of
          <a href="https://wiki.supermetroid.run/Bubble_Mountain" target="_blank"
            >Bubble Mountain</a
          >
        </li>
      </ul>
      <hr />
      <h3>Other Notes</h3>
      <ul class="browser-default">
        <li>
          If you leave the list empty no objective is required to access Tourian, ie. it's open.
        </li>
        <li>
          See the Tourian parameter to enable fast Tourian or trigger the escape when all objectives
          are completed.
        </li>
        <li>Current percentage of collected items is displayed in the inventory pause menu.</li>
        <li>
          100% items and 100% map are excluded by default when randomizing the objectives list as
          they cover too much of the other objectives.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { varia } from 'sm-data'

export default {
  data() {
    return {
      objectives_by_category: varia.objective.by_category,
    }
  },
  methods: {
    getColumns(objectives) {
      if (objectives.length > 8) {
        return [objectives.slice(0, 8), objectives.slice(8)]
      }
      return [objectives]
    },
  },
}
</script>
