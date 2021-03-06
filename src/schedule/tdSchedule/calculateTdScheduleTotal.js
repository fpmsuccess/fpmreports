const util = require('util')

function calculateTdScheduleTotal(td) {
    // console.group(td['Full Deliverable Name'])
    // console.info('td[TD Schedule]:', util.inspect(td['TD Schedule'], false, 1, true))

    let difficulty = td['TD Schedule']['Difficulty Level']
    difficulty = difficulty.toLowerCase()
    let skill = td['TD Schedule']['Recommended Skill Level']
    skill = skill.toLowerCase().split(' ').join('')
    let minManHrs = 0
    let expectedManHrs = 0
    let maxManHrs = 0

    // process each milestone
    Object.entries(td.milestones).forEach((mstone) => {
        milestone = mstone[1]
        typeof td['TD Schedule'][milestone][difficulty][skill]['min'] !== 'undefined'
            ? minManHrs += td['TD Schedule'][milestone][difficulty][skill]['min'] : ''
        typeof td['TD Schedule'][milestone][difficulty][skill]['expected'] !== 'undefined'
            ? expectedManHrs += td['TD Schedule'][milestone][difficulty][skill]['expected'] : ''
        typeof td['TD Schedule'][milestone][difficulty][skill]['max'] !== 'undefined'
            ? maxManHrs += td['TD Schedule'][milestone][difficulty][skill]['max'] : ''
    })
    
    // store the results
    tdTotals = {'min': 0, 'expected': 0, 'max': 0}
    tdTotals.min = minManHrs
    tdTotals.expected = expectedManHrs
    tdTotals.max = maxManHrs
    
    return tdTotals
}

module.exports.calculateTdScheduleTotal = calculateTdScheduleTotal
