const deepmerge = require('deepmerge')

const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { displayItem } = require('../../utilities/displayItem')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')

function idMergeEstimatesWDefault(args) {
    // console.info('\INFO: importEstimatesMilestones()')

    let estimateMilestones = {}
    let defaultMilestones = {}
    let milestones = {}

    // open hierarchy source to get index to estimates (by deliverable)
    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')

    // process ID milestones estimate merged with defaults
    hierarchySourceFlat.idList.forEach((id) => {

        // retrieve the ID Estimate and ID Default datapoints
        estimateMilestones = retrieveDatapoint(args, id['Deliverable Number'] + 'Estimate')
        defaultMilestones = retrieveDatapoint(args, 'IDDefaultMilestones')

        // deepmerge the two allowing missing estinate milestones to take default values
        //  - deepmerge(x,y) => if element of same key is present for both, the value from y will appear in the results.
        milestones = deepmerge(defaultMilestones, estimateMilestones)
        
        let datapointName = id['Deliverable Number'] + 'Milestones'
        storeDatapoint(args, milestones, datapointName)

        // display if cli args indicate to do so
        displayItem(args, 'showIDxMilestones', milestones)
    })

}

module.exports.idMergeEstimatesWDefault = idMergeEstimatesWDefault