<template lang="pug">
  .fotter
    el-menu(
      default-active="activeIndex2"
      mode="horizontal"
      collapse-transition=false
      background-color="#545c64"
      active-text-color="#ffd04b"
      text-color="#fff"
      )
      el-menu-item(index="1")
        i(class="el-icon-edit-outline") 
          div Lesson
      el-menu-item(index="2")
        i(class="el-icon-document")
          div Vocabulary
</template>
<script>
import _ from 'lodash'
export default {
  methods: {
    addWord() {
      if (!this.english || !this.translation) return
      const word = {
        english: this.english,
        translation: this.translation,
        completed: false
      }
      this.$store.dispatch('addWord', word)
      this.english = ''
      this.translation = ''
      this.$notify({
        title: '単語を追加しました！',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss">
.fotter {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
  margin: 0;
}
.el-menu-item {
  width: calc(100% / 2);
  text-align: center;
  div {
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    font-size: 12px;
  }
}
</style>
