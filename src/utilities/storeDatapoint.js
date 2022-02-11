const fs = require('fs')

function storeDatapoint(args, data, datapointName) {
    if (args.showInfoX) {
        console.info('storeDatapoint:', datapointName)
    }

    // ensure savePath exists
    fs.mkdir(args.jsonRoot, { recursive: true }, (err) => {
        if (err) throw err
    })

    let jsonName = ''
    let index = datapointName.lastIndexOf('.')
    if (index === -1) {
        jsonName = args.jsonRoot + datapointName + '.json'
    } else {
        jsonName = args.jsonRoot + datapointName.substr(0, index) + '.json'
    }
    // console.info('storeDatapoint() jsonName:', jsonName)
    const str = JSON.stringify(data, null, 2)

    fs.writeFileSync(jsonName, str, (err) => {
        if (err) {
            console.info('ERROR: datapoint:', datapointName, 
                ' was not successfully stored!')
            throw err
        }
    })
}

module.exports.storeDatapoint = storeDatapoint
