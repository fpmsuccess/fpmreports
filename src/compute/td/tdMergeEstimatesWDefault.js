const deepmerge = require('deepmerge')

const { displayItem } = require('../../utilities/displayItem')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')

function tdMergeEstimatesWDefault(args) {
    // console.info('\INFO: importEstimatesMilestones()')

    let estimateMilestones = {}
    let defaultMilestones = {}
    let milestones = {}

    // open hierarchy source to get index to estimates (by deliverable)
    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')

    // process TD milestones estimate merged with defaults
    hierarchySourceFlat.tdList.forEach((td) => {

        // retrieve the TD Estimate and TD Default datapoints
        estimateMilestones = retrieveDatapoint(args, td['Deliverable Number'] + 'Estimate')
        defaultMilestones = retrieveDatapoint(args, 'TDDefaultMilestones')

        // deepmerge the two allowing missing estinate milestones to take default values
        //  - deepmerge(x,y) => if element of same key is present for both, the value from y will appear in the results.
        milestones = deepmerge(defaultMilestones, estimateMilestones)

        // determine if default values were used in merge
        if (milestones !== estimateMilestones
            && milestones['Person Creating Estimate'] !== defaultMilestones['Person Creating Estimate']
        ) {
            milestones['Person Creating Estimate'] = milestones['Person Creating Estimate']
                + ' (incl. some '
                + defaultMilestones['Person Creating Estimate']
                + ')'
        }

        let datapointName = td['Deliverable Number'] + 'Milestones'
        storeDatapoint(args, milestones, datapointName)

        // display if cli args indicate to do so
        displayItem(args, 'showTDxxxMilestones', milestones)
    })
}

module.exports.tdMergeEstimatesWDefault = tdMergeEstimatesWDefault