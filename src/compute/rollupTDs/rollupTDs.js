const fs = require('fs')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { rollupTD } = require('./rollupTD')

function rollupTDs(args) {

    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')

    // start with TDs
    const tdList = hierarchySourceFlat.tdList
    // console.info(tdList)
    tdList.forEach((td) => {
        // console.info(td['Full Deliverable Name'])
        rollupTD(args, td)
    })

}

module.exports.rollupTDs = rollupTDs