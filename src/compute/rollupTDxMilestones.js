const { retrieveDatapoint } = require('../utilities/retrieveDatapoint')
const { displayItem } = require('../utilities/displayItem')
const { storeDatapoint } = require('../utilities/storeDatapoint')

function rollupTDxMilestones(args, td) {

    // retrieve the deliverable milestones to rollup
    const tdMilestones = retrieveDatapoint(args, td['Deliverable Number'] + 'Milestones')
    // console.info('tdMilestones:', util.inspect(tdMilestones, false, 1, true))

    let tdMilestonesTotal = {}
    tdMilestonesTotal['Deliverable Name'] = tdMilestones['Deliverable Name']
    tdMilestonesTotal['Deliverable Number'] = tdMilestones['Deliverable Number']
    tdMilestonesTotal['Deliverable Difficulty Level'] = tdMilestones['Deliverable Difficulty Level']
    tdMilestonesTotal['Recommended Skill Level'] = tdMilestones['Recommended Skill Level']
    tdMilestonesTotal['Person Creating Estimate'] = tdMilestones['Person Creating Estimate']
    tdMilestonesTotal['Active'] = tdMilestones['Active']
    tdMilestonesTotal['Parent Deliverable'] = tdMilestones['Parent Deliverable']

    // collect deliverable info re: difficulty and recommend skill level
    let difficulty = tdMilestones['Deliverable Difficulty Level'].toLowerCase()
    let skill = tdMilestones['Recommended Skill Level'].toLowerCase().split(' ').join('')

    let minManHrs = 0
    let expectedManHrs = 0
    let maxManHrs = 0
    let milestones = 0

    // process each milestone
    Object.entries(tdMilestones.milestones).forEach((milestone) => {

        // NOTE: need the milestone[1] offset because of how Object.entries converts the object
        typeof milestone[1][difficulty][skill]['min'] !== 'undefined'
            ? minManHrs += milestone[1][difficulty][skill]['min'] : ''
        typeof milestone[1][difficulty][skill]['expected'] !== 'undefined'
            ? expectedManHrs += milestone[1][difficulty][skill]['expected'] : ''
        typeof milestone[1][difficulty][skill]['max'] !== 'undefined'
            ? maxManHrs += milestone[1][difficulty][skill]['max'] : ''

        milestones++
            
    })

    // capture the results
    tdMilestonesTotal.milestoneCount = milestones
    tdMilestonesTotal.total = { 'min': minManHrs, 'expected': expectedManHrs, 'max': maxManHrs }
    
    // store the results
    storeDatapoint(args, tdMilestonesTotal, td['Deliverable Number'] + 'MilestonesTotal')

    // display if cli args indicate to do so
    displayItem(args, 'showTDxxxMilestonesTotal', tdMilestonesTotal)
}

module.exports.rollupTDxMilestones = rollupTDxMilestones