const history = []
let db = null

export default {
  prepare () {
    return new Promise((resolve, reject) => {
      db = openDatabase('swaggerdoc', '1.0', 'Swagger Doc Preview 项目的数据文件', 2 * 1024 * 1024)
      db.transaction(function (tx) { 
        tx.executeSql('CREATE TABLE IF NOT EXISTS history (url)')
      })
      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM history', [], function (tx, results) {
          const len = results.rows.length
          for (let i = 0; i < len; i++){
            history.push(results.rows.item(i).url)
          }

          resolve()
        }, null)
      })
    })
  },
  push (url) {
    history.push(url)
    db.transaction(function (tx) {
      tx.executeSql(`INSERT INTO history(url) VALUES ('${url}')`)
    })
  },
  *[Symbol.iterator] () {
    yield* history.slice().reverse()
  },
  query (keyword) {
    const urls = []
    return new Promise((resolve, reject) => {
      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM history where url like ?', [`%${keyword}%`], function (tx, results) {
          const len = results.rows.length
          for (let i = 0; i < len; i++){
            urls.push(results.rows.item(i).url)
          }

          resolve(urls)
        }, function () {
          console.error('执行查询历史的操作出错', arguments)
        })
      })
    })
  }
}
