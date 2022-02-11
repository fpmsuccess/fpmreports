const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../../utilities/storeDatapoint')
const { displayItem } = require('../../utilities/displayItem')

function addupTDxxxMilestones(args, d) {

    // retrieve the deliverable milestones to rollup
    const rollup = retrieveDatapoint(args, d['Deliverable Number'] + 'Milestones')

    let total = {
        'Deliverable Name': rollup['Deliverable Name'],
        'Deliverable Number': rollup['Deliverable Number'],
        'Deliverable Difficulty Level': rollup['Deliverable Difficulty Level'],
        'Recommended Skill Level': rollup['Recommended Skill Level'],
        'Person Creating Estimate':  rollup['Person Creating Estimate'],
        'Active': rollup['Active'],
        'Parent Deliverable': rollup['Parent Deliverable']
    }

    // collect deliverable info re: difficulty and recommend skill level
    let difficulty = rollup['Deliverable Difficulty Level'].toLowerCase()
    let skill = rollup['Recommended Skill Level'].toLowerCase().split(' ').join('')

    let minManHrs = 0
    let expectedManHrs = 0
    let maxManHrs = 0
    let milestones = 0

    // process each milestone
    Object.entries(rollup.milestones).forEach((milestone) => {

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
    total.milestoneCount = milestones
    total.total = { 'min': minManHrs, 'expected': expectedManHrs, 'max': maxManHrs }
    
    // store the results
    storeDatapoint(args, total, d['Deliverable Number'] + 'SpecificTotal')
}

module.exports.addupTDxxxMilestones = addupTDxxxMilestones