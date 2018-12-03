<template>
  <section class="mc time-line">
    <section class="time-line-cont">
      <h1 class="flex flex-justify-center">
        <span class="time-line-title">书香记</span>
      </h1>

  
      <section class="time-line-item" v-for="(item,index) in 3">
        <section class="time-line-year">
          2018
        </section>
        <section class="time-line-months">
          <section class="time-line-months-title">
            10月
          </section>
          <table class="time-line-months-cont">
            <tbody>
              <tr>
                <td width="200">1</td>
                <td width="650">2</td>
                <td width="">3</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>

    </section>
  </section>
</template>

<script>
export default {

}
</script>

