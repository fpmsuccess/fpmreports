const merge = require('deepmerge')

const { displayItem } = require('../utilities/displayItem')
const { retrieveDatapoint } = require('../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../utilities/storeDatapoint.js')

function mergeEstimatesWDefaults(args) {
    // console.info('\INFO: importEstimatesMilestones()')

    let estimateMilestones = {}
    let defaultMilestones = {}
    let milestones = {}

    // process TD milestones estimate merged with defaults
    hierarchySourceFlat.tdList.forEach((td) => {

        // retrieve the TD Estimate and TD Default datapoints
        estimateMilestones = retrieveDatapoint(args, td['Deliverable Number'] + 'Estimate')
        defaultMilestones = retrieveDatapoint(args, 'TDDefaultMilestones')

        // merge the two allowing missing estinate milestones to take default values
        //  - merge(x,y) => if element of same key is present for both, the value from y will appear in the results.
        milestones = merge(defaultMilestones, estimateMilestones)

        let datapointName = td['Deliverable Number'] + 'Milestones'
        storeDatapoint(args, milestones, datapointName)

        // display if cli args indicate to do so
        displayItem(args, 'showTDxxxMilestones', milestones)
    })

    // process ID milestones estimate merged with defaults
    hierarchySourceFlat.idList.forEach((id) => {

        // retrieve the ID Estimate and ID Default datapoints
        estimateMilestones = retrieveDatapoint(args, id['Deliverable Number'] + 'Estimate')
        defaultMilestones = retrieveDatapoint(args, 'IDDefaultMilestones')

        // merge the two allowing missing estinate milestones to take default values
        //  - merge(x,y) => if element of same key is present for both, the value from y will appear in the results.
        milestones = merge(defaultMilestones, estimateMilestones)
        
        let datapointName = id['Deliverable Number'] + 'Milestones'
        storeDatapoint(args, milestones, datapointName)

        // display if cli args indicate to do so
        displayItem(args, 'showIDxMilestones', milestones)
    })

}

module.exports.mergeEstimatesWDefaults = mergeEstimatesWDefaults