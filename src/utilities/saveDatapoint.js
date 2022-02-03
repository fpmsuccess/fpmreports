const fs = require('fs')

function saveDatapoint(args, data, datapointName) {
    // console.info('saveDatapointSource()', savePath, saveFile)

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
    // console.info('saveDatapoint() jsonName:', jsonName)
    const str = JSON.stringify(data, null, 2)

    fs.writeFileSync(jsonName, str, (err) => {
        if (err) throw err
        console.info('ERROR: datapoint:', datapointName, 
            ' was not successfully stored!')
    })
}

module.exports.saveDatapoint = saveDatapoint
