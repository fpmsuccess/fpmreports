const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { displayItem } = require('../../utilities/displayItem')
const { storeDatapoint } = require('../../utilities/storeDatapoint')

function addupPDMilestones(args, pd) {

    // retrieve the deliverable milestones to rollup
    const pdMilestones = retrieveDatapoint(args, pd['Deliverable Number'] + 'Milestones')

    let pdMilestonesTotal = {}
    pdMilestonesTotal['Deliverable Name'] = pdMilestones['Deliverable Name']
    pdMilestonesTotal['Deliverable Number'] = pdMilestones['Deliverable Number']
    pdMilestonesTotal['Deliverable Difficulty Level'] = pdMilestones['Deliverable Difficulty Level']
    pdMilestonesTotal['Recommended Skill Level'] = pdMilestones['Recommended Skill Level']
    pdMilestonesTotal['Person Creating Estimate'] = pdMilestones['Person Creating Estimate']
    pdMilestonesTotal['Active'] = pdMilestones['Active']
    pdMilestonesTotal['Parent Deliverable'] = pdMilestones['Parent Deliverable']

    // collect deliverable info re: difficulty and recommend skill level
    let difficulty = pdMilestones['Deliverable Difficulty Level'].toLowerCase()
    let skill = pdMilestones['Recommended Skill Level'].toLowerCase().split(' ').join('')

    let minManHrs = 0
    let expectedManHrs = 0
    let maxManHrs = 0
    let milestones = 0

    // process each milestone
    Object.entries(pdMilestones.milestones).forEach((milestone) => {
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
    pdMilestonesTotal.milestoneCount = milestones
    // pdMilestonesTotal.tdDefaultMilestones = tdDefaultMilestones  //bugbug - figure out a way to total default milestones!
    pdMilestonesTotal.total = { 'min': minManHrs, 'expected': expectedManHrs, 'max': maxManHrs }
    
    // store the results
    storeDatapoint(args, pdMilestonesTotal, pd['Deliverable Number'] + 'SpecificTotal')

    // display if cli args indicate to do so
    displayItem(args, 'showpdxxxSpecific', pdMilestonesTotal)
}

module.exports.addupPDMilestones = addupPDMilestones