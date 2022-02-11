const fs = require('fs')
// import chalk from 'chalk'
// const chalk = require('chalk')

function retrieveDatapoint(args, datapointName) {
    if (args.showInfoX) {
        console.info('retrieveDatapoint:', datapointName)
    }

    const dbLocation = args.jsonRoot + datapointName + '.json'
    // console.info('dbLocation:', dbLocation)
    const jsonItem = fs.readFileSync(dbLocation, { encoding: 'utf8', flag: 'r' })
    datapoint = JSON.parse(jsonItem)

    return datapoint
}

module.exports.retrieveDatapoint = retrieveDatapoint