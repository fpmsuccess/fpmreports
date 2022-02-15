const fs = require('fs')
const chalk = require('chalk')

function retrieveDatapoint(args, datapointName) {
    if (args.showInfoX) {
        console.info('retrieveDatapoint:', datapointName)
    }

    const dbLocation = args.jsonRoot + datapointName + '.json'
    // console.info('dbLocation:', dbLocation)
    try {
        const jsonItem = fs.readFileSync(dbLocation, { encoding: 'utf8', flag: 'r' })
        datapoint = JSON.parse(jsonItem)
    } catch (err) {
        args.stopAfterImport = true
        console.log(chalk.red('ERROR') + ': datapoint \'' + dbLocation + '\'  has not yet been created')
        return undefined
    }

    return datapoint
}

module.exports.retrieveDatapoint = retrieveDatapoint