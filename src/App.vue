<template>
  <div id="app">
    <keep-alive :include="$store.state.keepPages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      keepPages: ['Tabbar']
    }
  }
}
</script>

<style lang="less">
</style>
