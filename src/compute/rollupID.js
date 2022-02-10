const util = require('util')
const { displayItem } = require('../utilities/displayItem')

const { retrieveDatapoint } = require('../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../utilities/storeDatapoint')
const { rollupIDxMilestones } = require('./rollupIDxMilestones')

function rollupIDs(args) {

    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')
    hierarchySourceFlat.idList.forEach((id) => {

        // rollup deliverable milestone totals

        // rollup IDxMilestonesTotal and IDxTDsTotal
        let idMilestonesTotal = rollupIDxMilestones(args, id)
        let idTDsTotal = rollupIDxTDsTotal(args, id)

        // // sum IDxMilestonesTotal and IDxTDsTotal into IDxTotals
        // let idTotal = {}
        // idTotal.total = sumRollups(idMilestonesTotal.total, idTDsTotal.total)





    })

}

function sumRollups(milestones, tdsTotal) {
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

module.exports.rollupIDs = rollupIDs