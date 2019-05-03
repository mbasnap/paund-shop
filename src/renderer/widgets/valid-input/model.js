
class Input {
  constructor (params) {
    this.data = {
      value: '',
      error: false
    }
    Object.assign(this, params)
  }

  get error () {
    return this.data.error
  }

  set error (error) {
    this.data.error = error
  }

  get value () {
    return this.data.value
  }

  set value (value) {
    this.data = { ...this.data, value }
    this.onInput(value)
  }
  onInput () {}
}

export default Input
