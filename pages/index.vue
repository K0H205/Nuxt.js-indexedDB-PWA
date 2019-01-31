<template lang="pug">
  div
    el-tabs(type="border-card" stretch)
      el-tab-pane(label="おぼえよう！")
        el-table(
          :data="unCompletedWords"
          style="width: 100%"
        )
          el-table-column(prop="english" label="英単語" width="120")
          el-table-column(prop="translation" label="訳" width="120")
          el-table-column(width="40")
            template(slot-scope="scope")
              el-button(type="primary" icon="el-icon-refresh" size="mini" @click="toggleWord(scope.row)" circle)
      el-tab-pane(label="おぼえた！")
        el-table(
          :data="completedWords"
          style="width: 100%"
        )
          el-table-column(prop="english" label="英単語" width="120")
          el-table-column(prop="translation" label="訳" width="120")
          el-table-column(width="40")
            template(slot-scope="scope")
              el-button(type="primary" icon="el-icon-refresh" size="mini" @click="toggleWord(scope.row)" circle)
</template>
<script>
import _ from 'lodash'
export default {
  data() {
    return {
      english: '',
      translation: ''
    }
  },

  fetch({ store }) {
    store.dispatch('fetchWords')
  },

  computed: {
    completedWords() {
      return this.$store.getters.words.filter(val => val.completed)
    },

    unCompletedWords() {
      return this.$store.getters.words.filter(val => !val.completed)
    }
    // ...mapGetters(['words'])
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
      this.$notify({
        title: '単語を追加しました！',
        type: 'success'
      })
    },

    toggleWord(word) {
      word.completed = !word.completed
      this.$store.dispatch('toggleWord', word)
    }
  }
}
</script>
