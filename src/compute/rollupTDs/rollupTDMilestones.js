const util = require('util')

function rollupTDMilestones(deliverable, milestone) {
    // console.group(deliverable['Full Deliverable Name'])
    // console.info('td[TD Schedule]:', util.inspect(td['TD Schedule'], false, 1, true))

    let difficulty = deliverable['TD Schedule']['Difficulty Level']
    difficulty = difficulty.toLowerCase()
    let skill = td['TD Schedule']['Recommended Skill Level']
    skill = skill.toLowerCase().split(' ').join('')
    let minManHrs = 0
    let expectedManHrs = 0
    let maxManHrs = 0

    // process each milestone
    let milestones = ['Design', "Design Review", "Coding", "Code Review", "Unit Test", "Document", "Final Review Prep", "Final Review", 'Merge To Develop']
    milestones.forEach((milestone) => {
        typeof td['TD Schedule'][milestone][difficulty][skill]['min'] !== 'undefined'
            ? minManHrs += td['TD Schedule'][milestone][difficulty][skill]['min'] : ''
        typeof td['TD Schedule'][milestone][difficulty][skill]['expected'] !== 'undefined'
            ? expectedManHrs += td['TD Schedule'][milestone][difficulty][skill]['expected'] : ''
        typeof td['TD Schedule'][milestone][difficulty][skill]['max'] !== 'undefined'
            ? maxManHrs += td['TD Schedule'][milestone][difficulty][skill]['max'] : ''
    })
    // console.info(td['Full Deliverable Name'], 'difficulty: ', difficulty, 'skill: ', skill, 'minManHrs:', minManHrs, 'expectedManHrs:', expectedManHrs, 'maxManHrs:', maxManHrs)

    // store the results
    tdTotals = { 'min': 0, 'expected': 0, 'max': 0 }
    tdTotals.min = minManHrs
    tdTotals.expected = expectedManHrs
    tdTotals.max = maxManHrs
    // console.info(tdTotals)

    // console.info('tdTotals:', util.inspect(tdTotals, false, 2, true))
    // console.groupEnd(td['Full Deliverable Name'])

    // return {}
    return tdTotals
}

module.exports.rollupTDMilestones = rollupTDMilestones