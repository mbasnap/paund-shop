
const getValues = function (inputs) {
  return inputs.reduce((obj, { name, value }) => ({ ...obj, [name]: value }), {})
}

const setErrors = function (errors) {
  let setError = ([name, error]) => {
    this[name].error = error
  }
  Object.entries(errors).forEach(setError)
}

export { getValues, setErrors }
