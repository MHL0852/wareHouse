<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true, active}"
    pane="labelPane"
    @draw="draw">
    <div v-text="text" @click="handleClick"></div>
  </bm-overlay>
</template>

<script>
    export default {
        name: "over-lay"
    }
</script>

<style scoped>

</style>
