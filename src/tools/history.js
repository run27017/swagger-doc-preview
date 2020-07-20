const history = []

export default {
  push (url) {
    history.push(url)
  },
  *[Symbol.iterator] () {
    yield* history.slice().reverse()
  }
}
