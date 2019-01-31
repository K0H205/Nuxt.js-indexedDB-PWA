<template lang="pug">
  div
    el-dialog(inline="true" title="単語を追加" :visible.sync="dialogFormVisible")
      el-form(label-width="10px")
        el-form-item(label="English")
          el-input(v-model="english")
        el-form-item(label="訳")
          el-input(v-model="translation")
          .submit
            el-button(type="primary" @click="addWord") 登録!
      span(slot="footer" class="dialog-footer")
    .trigger-icon
      el-button(type="warning" icon="el-icon-circle-plus-outline" size="" @click="dialogFormVisible = true" circle)
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      english: '',
      translation: '',
      dialogFormVisible: false
    }
  },
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
      this.dialogFormVisible = false
    }
  }
}
</script>
<style>
.trigger-icon {
  position: fixed;
  bottom: 3.5%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  z-index: 2;
}
.el-dialog {
  width: 70%;
  height: 60%;
}
.submit {
  margin: 20px 2px;
  text-align: right;
}
</style>
