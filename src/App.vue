<template>
  <div class="box">
    <TheSidebar></TheSidebar>
    <TheHeader></TheHeader>
    <TheContent></TheContent>
  </div>
</template>

<script>
import TheSidebar from './layout/TheSidebar.vue'
import TheHeader from './layout/TheHeader'
import TheContent from './layout/TheContent'
export default {
  name: 'App',
  components: {
    TheSidebar,
    TheHeader,
    TheContent,
  }
}
</script>
<style>
  @import url('./style/main.css');
</style>