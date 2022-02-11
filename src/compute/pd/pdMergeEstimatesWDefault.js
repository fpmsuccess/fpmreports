const merge = require('deepmerge')

const { displayItem } = require('../../utilities/displayItem')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')

function pdMergeEstimatesWDefault(args) {
    // console.info('\INFO: pdMergeEstimatesWDefault()')

    let estimateMilestones = {}
    let defaultMilestones = {}
    let milestones = {}

    // open hierarchy source to get index to estimates (by deliverable)
    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')
    const pd = hierarchySourceFlat.productInfo

    // process PD milestones estimate merged with defaults
    estimateMilestones = retrieveDatapoint(args, pd['Deliverable Number'] + 'Estimate')
    defaultMilestones = retrieveDatapoint(args, 'PDDefaultMilestones')

    // merge the two allowing missing estinate milestones to take default values
    //  - merge(x,y) => if element of same key is present for both, the value from y will appear in the results.
    milestones = merge(defaultMilestones, estimateMilestones)
    
    let datapointName = pd['Deliverable Number'] + 'Milestones'
    storeDatapoint(args, milestones, datapointName)

    // display if cli args indicate to do so
    displayItem(args, 'showPDMilestones', milestones)

}

module.exports.pdMergeEstimatesWDefault = pdMergeEstimatesWDefault