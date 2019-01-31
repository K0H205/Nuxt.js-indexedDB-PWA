class WordDB {
  static get DB_NAME() {
    return 'word-db'
  }

  static get WORDS_STORE_NAME() {
    return 'words'
  }

  async connect() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this)
        return
      }
      const req = indexedDB.open(WordDB.DB_NAME)

      req.onupgradeneeded = event => {
        const db = event.target.result
        db.createObjectStore(WordDB.WORDS_STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true
        })
      }

      req.onsuccess = event => {
        this.db = event.target.result
        resolve(this)
      }
    })
  }

  getTransaction(stores, readWrite = 'readwrite') {
    return this.db.transaction(stores, readWrite)
  }

  getWordsStore() {
    return this.getTransaction([WordDB.WORDS_STORE_NAME]).objectStore(
      WordDB.WORDS_STORE_NAME
    )
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      let words = []
      const store = this.getWordsStore()
      store.openCursor().onsuccess = event => {
        let cursor = event.target.result
        if (cursor) {
          words.push(cursor.value)
          cursor.continue()
        }
        resolve(words)
      }
      store.openCursor().onerror = () => {
        reject(this)
      }
    })
  }

  async add(word) {
    return new Promise((resolve, reject) => {
      const req = this.getWordsStore().add(word)
      req.onsuccess = () => {
        word['id'] = req.result
        resolve(word)
      }
      req.onerror = () => {
        reject(this)
      }
    })
  }

  async put(work) {
    return new Promise((resolve, reject) => {
      const req = this.getWordsStore().put(work)
      req.onsuccess = () => {
        resolve(work)
      }
      req.onerror = () => {
        reject(this)
      }
    })
  }

  remove(wordId) {
    this.getWordsStore().delete(wordId)
  }
}

export default new WordDB()
