const fs = require('fs')
const { rollupTD } = require('./rollupTD')

function rollupTDs(args) {

    // start with Hierarchy Source
    dbLocation = args.jsonRoot + args.hierarchyName + 'Flat' + '.json'
    console.info('dbLocation:', dbLocation)

    const flatJson = fs.readFileSync(dbLocation, { encoding: 'utf8', flag: 'r' })
    hierarchySourceFlat = JSON.parse(flatJson)

    // start with TDs
    const tdList = hierarchySourceFlat.tdList
    // console.info(tdList)
    tdList.forEach((td) => {
        // console.info(td['Full Deliverable Name'])
        rollupTD(args, td)
    })

}

module.exports.rollupTDs = rollupTDs