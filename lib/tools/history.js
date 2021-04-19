let db = null

export default {
  prepare () {
    return new Promise((resolve, reject) => {
      db = openDatabase('swaggerdoc', '1.0', 'Swagger Doc Preview 项目的数据文件', 2 * 1024 * 1024)
      db.transaction(function (tx) { 
        tx.executeSql('CREATE TABLE IF NOT EXISTS history (url, updated_at)')
      })
      resolve()
    })
  },
  push (url) {
    return new Promise((resolve, reject) => {
      db.transaction(function (tx) {
        tx.executeSql(
          'SELECT * FROM history WHERE url = ?', [url], 
          function (tx, results) {
            if (results.rows.length > 0) {
              tx.executeSql('UPDATE history SET updated_at = ? WHERE url = ?', [new Date(), url], function () {
                resolve()
              }, console.error)
            } else {
              tx.executeSql('INSERT INTO history(url, updated_at) VALUES (?, ?)', [url, new Date()], function () {
                resolve()
              }, console.error)
            }
          },
          function (tx, error) {
            console.error('查询 url 是否存在出错', error)
          }
        )
      })
    })
  },
  query (keyword, limit = 10) {
    const urls = []
    let sql, params
    if (keyword) {
      sql = 'SELECT * FROM history WHERE url LIKE ? ORDER BY updated_at DESC LIMIT ?'
      params = [`%${keyword}%`, limit]
    } else {
      sql = 'SELECT * FROM history ORDER BY updated_at DESC LIMIT ?'
      params = [limit]
    }
    return new Promise((resolve, reject) => {
      db.transaction(function (tx) {
        tx.executeSql(sql, params, function (tx, results) {
          const len = results.rows.length
          for (let i = 0; i < len; i++){
            urls.push(results.rows.item(i).url)
          }

          resolve(urls)
        }, function (tx, error) {
          console.error('执行查询历史的操作出错', error)
        })
      })
    })
  }
}
