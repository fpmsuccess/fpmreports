const fs = require('fs')
// import chalk from 'chalk'
// const chalk = require('chalk')

function retrieveDatapoint(args, jsonName) {
    console.group('retrieveDatapoint')
    console.info('retrieveDatapoint:', jsonName)

    let dbLocation = ''

    // // name of the storage item
    // if (td['Estimate File Name'] === 'TDxxx-StandardCosting-Template.xlsx') {
    //     // note: this is akin to a 'magic number' as it depends upon knowing which 'Estimate File Name' entries point to a default estimate
    //     console.error('\tWARNING:', td['Full Deliverable Name'] + ' does not have a valid estimate yet!\n')
    //     estName = 'TDDefaultMilestones'
    // } else {
    //     // note: this is akin to a 'magic number' as it depends upon knowing how the json storage file was named
    //     estName = td['Deliverable ID'] + 'Estimate'
    // }

    dbLocation = args.jsonRoot + jsonName + '.json'
    // console.info('dbLocation:', dbLocation)
    const jsonItem = fs.readFileSync(dbLocation, { encoding: 'utf8', flag: 'r' })
    estimateMilestones = JSON.parse(jsonItem)

    console.groupEnd(retrieveDatapoint)

    return jsonItem
}

module.exports.retrieveDatapoint = retrieveDatapoint