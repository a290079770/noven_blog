<template>
  <section class="mc time-line">
    <section class="time-line-cont">
      <h1 class="flex flex-justify-center">
        <span class="time-line-title">书香记</span>
      </h1>

  
      <section class="time-line-item" v-for="(item,index) in timeLine">
        <section class="time-line-year">
          {{item.Year}}
        </section>
        <section v-for="(yitem,yindex) in item.Children" class="time-line-months">
          <section class="time-line-months-title">
            {{yitem.Month}}月
          </section>
          <table border="0" class="time-line-months-cont">
            <tbody>
              <tr @click="goTo('/detail',`id=${ditem.Id}`)" v-for="(ditem,dindex) in yitem.Children">
                <td width="200">{{ditem.CreateTime}}</td>
                <td width="650">{{ditem.Title}}</td>
                <td width="">{{ditem.Author}}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>

    </section>
  </section>
</template>

<script>

import { getTimeLine } from '~/assets/service/userService'
export default {
  data() {
    return {
      timeLine:[]
    }
  },
  async created() {
    this.timeLine = await getTimeLine();
  }
}
</script>

