const request = require('request')
const fs = require('fs')

function getFilenameFromUrl(url){
    return url.substring(url.lastIndexOf('/') + 1)
}

export default  function ({ url, dist, onProgress }) {
    return new Promise(function(resolve){
        // Save variable to know progress
        let received_bytes = 0
        let total_bytes = 0

        const req = request({ method: 'GET', uri: url })

        const out = fs.createWriteStream(dist + "\\" + getFilenameFromUrl(url))
        req.pipe(out)

        req.on('response', function ( data ) {
            // Change the total bytes value to get progress later.
            total_bytes = parseInt(data.headers['content-length' ])
        });

        // Get progress if callback exists
        if (onProgress){
            req.on('data', function(chunk) {
                // Update the received bytes
                received_bytes += chunk.length
                onProgress(received_bytes, total_bytes)
            })
        } else {
            req.on('data', function(chunk) {
                // Update the received bytes
                received_bytes += chunk.length
            });
        }

        req.on('end', function() {
            resolve()
        })
    })
}
