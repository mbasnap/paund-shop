const child = require('child_process').execFile
export default  (path) => child(path)
