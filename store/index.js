import Vuex from 'vuex'
import wordDb from '~/assets/word-db'
import _ from 'lodash'
export default () =>
  new Vuex.Store({
    state: {
      words: []
    },

    getters: {
      words: state => state.words
      // words: state => state.words.filter(todo => todo.status === 'todo')
    },

    mutations: {
      addWord(state, word) {
        state.words.push(word)
      },

      setWords(state, words) {
        state.words = words
      },

      clearWords(state) {
        state.words = []
      },

      toggleWord(state, toggleWord) {
        const word = state.words.find(word => word.id === toggleWord.id)
        if (word) {
          word.completed = toggleWord.completed
        }
      }

      //   remove(state, { word }) {
      //     state.words.splice(state.list.indexOf(word), 1)
      //   }

      // updateWord(state, newWord) {
      //   const todo = state.words.find(word => word.id === newWord.id)
      //   if (word) {
      //     word.english = newWord.english
      //     word.translation = newWord.translation
      //   }
      // },

      // toggleWord(state, newWord) {
      //   const todo = state.words.find(word => word.id === newWord.id)
      //   if (word) {
      //     word.completed = !newWord.completed
      //   }
    },

    actions: {
      async fetchWords({ commit }) {
        commit('clearWords')
        const db = await wordDb.connect()
        db.getAll().then(
          res => {
            commit('setWords', res)
          },
          err => {
            console.log('error')
          }
        )
      },

      async addWord({ commit }, req) {
        const db = await wordDb.connect()
        db.add(req).then(
          res => {
            commit('addWord', res)
          },
          err => {
            console.log('error')
          }
        )
      },

      async toggleWord({ commit }, req) {
        const db = await wordDb.connect()
        db.put(req).then(
          res => {
            commit('toggleWord', res)
          },
          err => {
            console.log('error')
          }
        )
      }
    }
  })
