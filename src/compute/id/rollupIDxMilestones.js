const { displayItem } = require("../utilities/displayItem")
const { retrieveDatapoint } = require("../utilities/retrieveDatapoint")
const { storeDatapoint } = require("../utilities/storeDatapoint")

function rollupIDxMilestones(args, id) {

    // retrieve the deliverable milestones to rollup
    idMilestones = retrieveDatapoint(args, id['Deliverable Number'] + 'Milestones')
    // console.info('idMilestones:', util.inspect(idMilestones, false, 1, true))

    let idMilestonesTotal = {}
    idMilestonesTotal['Deliverable Name'] = idMilestones['Deliverable Name']
    idMilestonesTotal['Deliverable Number'] = idMilestones['Deliverable Number']
    idMilestonesTotal['Deliverable Difficulty Level'] = idMilestones['Deliverable Difficulty Level']
    idMilestonesTotal['Recommended Skill Level'] = idMilestones['Recommended Skill Level']
    idMilestonesTotal['Person Creating Estimate'] = idMilestones['Person Creating Estimate']

    // collect deliverable info re: difficulty and recommend skill level
    let difficulty = tdMilestones['Deliverable Difficulty Level'].toLowerCase()
    let skill = tdMilestones['Recommended Skill Level'].toLowerCase().split(' ').join('')

    let minManHrs = 0
    let expectedManHrs = 0
    let maxManHrs = 0
    let milestones = 0

    // process each milestone
    Object.entries(idMilestones.milestones).forEach((milestone) => {

        typeof milestone[1][difficulty][skill]['min'] !== 'undefined'
            ? minManHrs += milestone[1][difficulty][skill]['min'] : ''
        typeof milestone[1][difficulty][skill]['expected'] !== 'undefined'
            ? expectedManHrs += milestone[1][difficulty][skill]['expected'] : ''
        typeof milestone[1][difficulty][skill]['max'] !== 'undefined'
            ? maxManHrs += milestone[1][difficulty][skill]['max'] : ''

        milestones ++

    })

    // capture the results
    idMilestonesTotal.milestoneCount = milestones
    idMilestonesTotal.total = { 'min': minManHrs, 'expected': expectedManHrs, 'max': maxManHrs }

    // store the results
    storeDatapoint(args, idMilestonesTotal, id['Deliverable Number'] + 'Specific')

    // display if cli args indicate to do so
    displayItem(args, 'showIDxSpecific', idMilestonesTotal)

    return idMilestonesTotal
}

module.exports.rollupIDxMilestones = rollupIDxMilestones