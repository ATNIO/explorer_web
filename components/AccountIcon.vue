<template>
    <canvas :width="size * 2" :height="size * 2" ref="canvas" data-jdenticon-value="default">
    </canvas>
</template>
<script>
import jdenticon from 'jdenticon'

export default {
  name: "AccountIcon",
  props: ["value", "size"],
  created () {
    const $this = this
  },
  watch: {
  	value () {
	  this.update()
	}
  },
  methods: {
    update() {
	  jdenticon.update(this.$refs.canvas, this.value, 0);
    }
  },
  mounted() {
    this.update()
  }
};
</script>
<style lang="less" scoped>
</style>
