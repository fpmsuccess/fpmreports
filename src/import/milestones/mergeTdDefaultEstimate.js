const fs = require('fs')
const util = require('util')

// const merge = require('lodash.merge')
const merge = require('deepmerge')


const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')

function mergeTdDefaultEstimate(args, td) {
    let estimateMilestones = {}
    let defaultMilestones = {}
    let tdMilestones = {}

    if (args.showInfoX) {
        console.group(td['Full Deliverable Name'])
        console.info('default source:', 'TDDefaultMilestones')
        console.info('estimate source:', td['Estimate File Name'] + ':' + td['Estimate Tab'])
    }

    // retrieve the TD estimate datapoint
    estimateMilestones = retrieveDatapoint(args, td['Deliverable Number'] + 'Estimate')
    
    // retrieve the TD Default Milestones datapoint
    defaultMilestones = retrieveDatapoint(args, 'TDDefaultMilestones')

    // merge the two allowing missing estinate milestones to take default values
    //  - merge(x,y) => if element of same key is present for both, the value from y will appear in the results.
    tdMilestones = merge(defaultMilestones, estimateMilestones)

    // if (td['Deliverable Number'] === 'TD704') {
    //     console.info('defaultMilestones:', util.inspect(defaultMilestones, false, 1, true))
    //     console.info('estimateMilestones:', util.inspect(estimateMilestones, false, 1, true))
    //     console.info('tdMilestones:', util.inspect(tdMilestones, false, 1, true))
    // }

    if (args.showInfoX) {
        console.groupEnd(td)
        console.log()
    }

    return tdMilestones
}

module.exports.mergeTdDefaultEstimate = mergeTdDefaultEstimate