<template>
  <section class="mc index">
    <section class="flex flex-justify-between index-body">
      <section class="index-list"> 
        
      </section>

      <section class="index-intros">
        <intro-container>
          222
        </intro-container>
      </section>
    </section>
  </section>
</template>

<script>
import introContainer from '~/components/introContainer'
export default {
  data() {
    return {}
  },
  components:{
    'intro-container':introContainer,
  },

  methods:{

  },

  mounted() {
     console.log(111)
  }
}
</script>

<style scoped lang="less">

</style>
