const util = require('util')

function tdDisplay(args, td) {
    console.log(td['Full Deliverable Name'])
    console.group() //for each td

    // output the deliverable schedule total
    output = scheduleTotalToString(td, 'TD Schedule Totals')
    console.info(output)
    // console.info('td[TD Schedule Totals]:', util.inspect(td['TD Schedule Totals'], false, 2, true))

    // output the difficulty & skill levels
    {
        let output
        let difficulty = td['TD Schedule']['Difficulty Level']
        difficultyIndex = difficulty.toLowerCase()
        let skill = td['TD Schedule']['Recommended Skill Level']
        skillIndex = skill.toLowerCase().split(' ').join('')
        output = 'TD Info'.padEnd(25, ' ')
            + 'difficulty level: ' + difficulty
            + ', recommended skill level: ' + skill
        console.log(output)
    }
    // process each milestone
    if (args.showLevel === 'milestones') {
        console.group('Milestones')  // for each milestone
        let milestones = ['Design', "Design Review", "Coding", "Code Review", "Unit Test", "Document", "Final Review Prep", "Final Review", 'Merge To Develop']
        milestones.forEach((milestone) => {
            output = scheduleRenderToString(td, 'TD Schedule', milestone, difficultyIndex, skillIndex)
            console.log(output)
            // console.info('td[TD Schedule]:', util.inspect(td['TD Schedule'][milestone], false, 2, true))
        })
        console.groupEnd('Milestones')
        console.log()   // leave a blank line at the end of the TD milestone display
    }
    console.groupEnd()
}

function padManHrs(manHrs) {
    pad = ''.concat(manHrs)
    MAX_FILL = 4
    let fill = ''
    for (i = 1; i <= MAX_FILL - pad.length; i++) {
        fill += ' '
    }
    return fill.concat(pad)
}

function scheduleTotalToString(td, tdProperty) {
    let output = ''
    let minManHrsOut = ''
    let expectedManHrsOut = ''
    let maxManHrsOut = ''

    // process 'TD Schedule Total'
    minManHrsOut = typeof td[tdProperty].min !== 'undefined'
        ? 'minManHrs: ' + padManHrs(td[tdProperty].min) : ''
    expectedManHrsOut = typeof td[tdProperty].expected !== 'undefined'
        ? 'expectedManHrs: ' + padManHrs(td[tdProperty].expected) : ''
    maxManHrsOut = typeof td[tdProperty].max !== 'undefined'
        ? 'maxManHrs: ' + padManHrs(td['TD Schedule Totals'].max) : ''
    // console.info(td['Full Deliverable Name'], 'difficulty: ', difficulty, 'skill: ', skill, 'minManHrs:', minManHrs, 'expectedManHrs:', expectedManHrs, 'maxManHrs:', maxManHrs)

    output = 'TD Schedule Total'.padEnd(25, ' ')
        // + ':' + fill + '   '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}
function scheduleRenderToString(td, tdProperty, milestone, difficultyIndex, skillIndex) {
    let output
    let minManHrsOut = ''
    let expectedManHrsOut = ''
    let maxManHrsOut = ''

    minManHrsOut = typeof td[tdProperty][milestone][difficultyIndex][skillIndex]['min'] !== 'undefined'
        ? 'minManHrs: ' + padManHrs(td[tdProperty][milestone][difficultyIndex][skillIndex]['min']) : ''
    expectedManHrsOut = typeof td[tdProperty][milestone][difficultyIndex][skillIndex]['expected'] !== 'undefined'
        ? 'expectedManHrs: ' + padManHrs(td[tdProperty][milestone][difficultyIndex][skillIndex]['expected']) : ''
    maxManHrsOut = typeof td[tdProperty][milestone][difficultyIndex][skillIndex]['max'] !== 'undefined'
        ? 'maxManHrs: ' + padManHrs(td[tdProperty][milestone][difficultyIndex][skillIndex]['max']) : ''

    MAX_MILESTONE_FILL = 30
    let milestoneFill = ''
    for (i = 1; i <= MAX_MILESTONE_FILL - milestone.length; i++) {
        milestoneFill += ' '
    }
    output = milestone + ':'
        + milestoneFill + ' '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}

module.exports.tdDisplay = tdDisplay
