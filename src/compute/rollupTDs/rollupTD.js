const fs = require('fs')
// const merge = require('lodash.merge')
const merge = require('deepmerge')


const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../../utilities/storeDatapoint')

function rollupTD(args, td) {
    let estimateMilestones = {}
    let defaultMilestones = {}
    let tdMilestones = {}

    if (args.showInfo) {
        console.group(td['Full Deliverable Name'])
        console.info('default source:', 'TDDefaultMilestones')
        console.info('estimate source:', td['Estimate File Name'] + ':' + td['Estimate Tab'])
    }

    // determine the TD Estimate datapoint name and retrieve it
    if (td['Estimate File Name'] === args.hierarchySource) {
        // note: this is akin to a 'magic number' as it depends upon knowing which 'Estimate File Name' entries point to a default estimate
        console.error('\tWARNING:', td['Full Deliverable Name'] 
        + ' does not have its own estimate yet!'
        + '\n\t\t(it is using default estimate)'
        )
        estName = 'TDDefaultMilestones'
    } else {
        // note: this is akin to a 'magic number' as it depends upon knowing how the json storage file was named
        estName = td['Deliverable ID'] + 'Estimate'
    }

    // retrieve the TD estimate datapoint
    estimateMilestones = retrieveDatapoint(args, estName)
    
    // retrieve the TD Default Milestones datapoint
    defaultMilestones = retrieveDatapoint(args, 'TDDefaultMilestones')

    // merge the two allowing missing estinate milestones to take default values
    tdMilestones = merge(defaultMilestones, estimateMilestones)
    storeDatapoint(args, tdMilestones, td['Deliverable ID'] + 'Milestones')

    if (args.showInfo) {
        console.groupEnd(td)
        console.log()
    }
}

module.exports.rollupTD = rollupTD