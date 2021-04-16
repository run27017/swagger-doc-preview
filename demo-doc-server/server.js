const http = require('http')
const url = require('url')
const fs = require('fs')
const { resolve } = require('path')

const port = process.argv[2] || 5000

function createSendFileRoute(routeName) {
  return {
    path: new RegExp('^/' + routeName),
    handler (data, request, response) {
      response.writeHead(200, { 'content-type': 'application/json' })
      const docPath = resolve(__dirname, `${routeName}.yaml`)
      fs.createReadStream(docPath).pipe(response)
    }
  }
}

const routes = [
  createSendFileRoute('simple'),
  createSendFileRoute('petstore'),
  {
    path: '/',
    handler (data, request, response) {
      const paths = ['/simple', '/simple01', '/simple02', '/petstore', '/petstore01', '/petstore02']
      const pathsDesc = paths.map(p => `- ${p}`).join('\n')
      response.end(`请访问如下模式的路径：\n\n${pathsDesc}`)
    }
  }
]

http.createServer(function (request, response) {
  // 设置跨域效果
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Request-Method', '*')
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  response.setHeader('Access-Control-Allow-Headers', '*')
  if (request.method === 'OPTIONS') {
    response.writeHead(200)
    response.end()
    return
  }

  let path = url.parse(request.url).pathname
  let data = ''

  console.log('Receive request', path)

  request.on('data', function (chunk) {
    data += chunk
  })

  request.on('end', function () {
    for (const route of routes) {
      if (Object.prototype.toString.call(route.path) === '[object RegExp]' && route.path.test(path)) {
        return route.handler(data, request, response)
      }
      if (Object.prototype.toString.call(route.path) === '[object String]' && path === route.path) {
        return route.handler(data, request, response)
      }
    }

    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('404 NOT FOUND')
  })
}).listen(port, err => {
  if (err) {
    console.log(`Something bad happened: ${err}.`)
  } else {
    console.log(`Server is listening on ${port}.`)
  }
})
