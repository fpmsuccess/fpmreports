const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { displayItem } = require('../../utilities/displayItem')
const { storeDatapoint } = require('../../utilities/storeDatapoint')

function addupIDxMilestones(args, id) {

    // retrieve the deliverable milestones to rollup
    const idMilestones = retrieveDatapoint(args, id['Deliverable Number'] + 'Milestones')

    let idSpecificTotal = {}
    idSpecificTotal['Deliverable Name'] = idMilestones['Deliverable Name']
    idSpecificTotal['Deliverable Number'] = idMilestones['Deliverable Number']
    idSpecificTotal['Deliverable Difficulty Level'] = idMilestones['Deliverable Difficulty Level']
    idSpecificTotal['Recommended Skill Level'] = idMilestones['Recommended Skill Level']
    idSpecificTotal['Person Creating Estimate'] = idMilestones['Person Creating Estimate']
    idSpecificTotal['Active'] = idMilestones['Active']
    idSpecificTotal['Parent Deliverable'] = idMilestones['Parent Deliverable']

    // collect deliverable info re: difficulty and recommend skill level
    let difficulty = idMilestones['Deliverable Difficulty Level'].toLowerCase()
    let skill = idMilestones['Recommended Skill Level'].toLowerCase().split(' ').join('')

    let minManHrs = 0
    let expectedManHrs = 0
    let maxManHrs = 0
    let milestones = 0

    // process each milestone
    Object.entries(idMilestones.milestones).forEach((milestone) => {
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
    idSpecificTotal.milestoneCount = milestones
    idSpecificTotal.total = { 'min': minManHrs, 'expected': expectedManHrs, 'max': maxManHrs }
    
    // store the results
    storeDatapoint(args, idSpecificTotal, id['Deliverable Number'] + 'SpecificTotal')

    // display if cli args indicate to do so
    displayItem(args, 'showIDxSpecific', idSpecificTotal)
}

module.exports.addupIDxMilestones = addupIDxMilestones