const util = require('util')
const { storeDatapoint } = require('../utilities/storeDatapoint')

function rollupIDMilestones(args, tdMilestones) {
    console.group()
    if (args.showInfoX) {
        console.info('\INFO: rollupIDMilestones()')
        console.info('')
    }

    // collect deliverable info re: difficulty and recommend skill level
    let difficulty = tdMilestones['Deliverable Difficulty Level']
    let skill = tdMilestones['Recommended Skill Level']
    difficulty = difficulty.toLowerCase()
    skill = skill.toLowerCase().split(' ').join('')

    let minManHrs = 0
    let expectedManHrs = 0
    let maxManHrs = 0
    
    // console.info('tdMilestones:', util.inspect(tdMilestones, false, null, true))

    // process each milestone
    let milestoneList = tdMilestones.milestones
    Object.entries(tdMilestones.milestones).forEach((milestone) => {
    // for (const milestone in milestoneList) {
        // console.info('milestone:', milestone)
        // console.info('milestone[1]:', util.inspect(milestone[1], false, null, true))

        typeof milestone[1][difficulty][skill]['min'] !== 'undefined'
            ? minManHrs += milestone[1][difficulty][skill]['min'] : ''
        typeof milestone[1][difficulty][skill]['expected'] !== 'undefined'
            ? expectedManHrs += milestone[1][difficulty][skill]['expected'] : ''
        typeof milestone[1][difficulty][skill]['max'] !== 'undefined'
            ? maxManHrs += milestone[1][difficulty][skill]['max'] : ''
    })

    // store the results
    let tdTotals = { 'min': 0, 'expected': 0, 'max': 0 }
    tdTotals.min = minManHrs
    tdTotals.expected = expectedManHrs
    tdTotals.max = maxManHrs
    // console.info('tdTotals:', util.inspect(tdTotals, false, null, true))

    // // store the datapoint
    // storeDatapoint(args, tdRollup, td['Deliverable Name'] + 'Rollup')
    
    console.groupEnd()  

    return tdTotals
}

module.exports.rollupIDMilestones = rollupIDMilestones