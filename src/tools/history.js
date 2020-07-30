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
        tx.executeSql('INSERT INTO history(url, updated_at) VALUES (?, ?)', [url, new Date()], function () {
          resolve()
        })
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
