const { displayItem } = require('../utilities/displayItem')

const { retrieveDatapoint } = require('../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../utilities/storeDatapoint')
const { rollupIDxMilestones } = require('./rollupIDxMilestones')
const { rollupIDxTDsTotal } = require('./rollupIDxTDsTotal')

function rollupIDs(args) {

    // retieve the list of IDs to process
    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')

    hierarchySourceFlat.idList.forEach((id) => {

        // retrieve the deliverable milestones to rollup
        let idMilestones = retrieveDatapoint(args, id['Deliverable Number'] + 'Milestones')
        // console.info('idMilestones:', util.inspect(idMilestones, false, 1, true))

        // collect deliverable info re: difficulty and recommend skill level
        let difficulty = idMilestones['Deliverable Difficulty Level']
        let skill = idMilestones['Recommended Skill Level']

        // rollup the ID milestones by themselves
        let idMilestonesTotal = rollupIDxMilestones(args, idMilestones, difficulty, skill)
        let idTDsTotal = rollupIDxTDsTotal(args, id) 

        let idTotal = {}


        // store the datapoint
        storeDatapoint(args, idTotal, id['Deliverable Number'] + 'Total')

        // display if cli args indicate to do so
        displayItem(args, 'showIDxTotal', idTotal)
    })
}

module.exports.rollupIDs = rollupIDs