const util = require('util')
const deepmerge = require('deepmerge')

const { displayItem } = require('../../utilities/displayItem')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')

idMergeEstimatesWDefault.spec()

function idMergeEstimatesWDefault.spec() {
    jsonDir = process.env.PWD + '/jsonStorage/'
    console.info('jsonDir:', jsonDir)
    let args = {
        jsonRoot: jsonDir
    }
    args.showDefaultMilestones = true
    args.showEstimateMilestones = true
    args.showMerged = false
    args.showSummed = true

    let estimateMilestones = {}
    let defaultMilestones = {}
    let mergedMilestones = {}
    let summedMilestones = {}

    // retrieve the TD Estimate and TD Default datapoints
    defaultMilestones = retrieveDatapoint(args, 'TDOneMilestones')
    estimateMilestones = retrieveDatapoint(args, 'TDTestMilestones')
    
    // deepmerge the two allowing missing estinate mergedMilestones to take default values
    //  - deepmerge(x,y) => if element of same key is present for both, the value from y will appear in the results.
    mergedMilestones = deepmerge(defaultMilestones, estimateMilestones)

    // display if cli args indicate to do so
    displayItem(args, 'showDefaultMilestones', defaultMilestones)
    displayItem(args, 'showEstimateMilestones', estimateMilestones)
    // note merged should equal estimate
    displayItem(args, 'showMerged', mergedMilestones)

    // sum merged with default
    summedMilestones = sumRollups(defaultMilestones, estimateMilestones)
    // displayItem(args, 'showSummed', summedMilestones, 9)
    console.info(util.inspect(summedMilestones, false, null, true))

}

function sumRollups(milestonesTotal, tdsTotal) {
    let results = {}
    Object.keys(milestonesTotal).forEach(key => {
        if (tdsTotal.hasOwnProperty(key)) {
            results[key] = milestonesTotal[key] + tdsTotal[key]
        } else {
            results[key] = milestonesTotal[key]
        }
    })
    return results
}

module.exports.idMergeEstimatesWDefault.spec = idMergeEstimatesWDefault.spec