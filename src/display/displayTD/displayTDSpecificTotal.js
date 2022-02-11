const util = require('util')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')

function displayTDSpecificTotal(args, td) {

    // retrieve the deliverable milestones to rollup
    const tdSpecificTotal = retrieveDatapoint(args, td['Deliverable Number'] + 'SpecificTotal')

    console.log(tdSpecificTotal['Deliverable Number'] + ' - ' + tdSpecificTotal['Deliverable Name'])
    console.group() //for each td

    // output the person that created estimate
    output = 'Estimate Created by:'.padEnd(25, ' ')
        + tdSpecificTotal['Person Creating Estimate']
    console.info(output)

    // output the difficulty & skill levels
    {
        let output
        let difficulty = tdSpecificTotal['Deliverable Difficulty Level']
        difficultyIndex = difficulty.toLowerCase()
        let skill = tdSpecificTotal['Recommended Skill Level']
        skillIndex = skill.toLowerCase().split(' ').join('')
        output = 'TD Info'.padEnd(25, ' ')
            + 'difficulty level: ' + difficulty
            + ', recommended skill level: ' + skill
        console.log(output)
    }
    // output the general info
    {
        let output
        output = ''.padEnd(25,' ')
            + 'milestone count: ' + tdSpecificTotal.milestoneCount
        console.log(output)
    }

    // // output the deliverable schedule total
    output = scheduleTotalToString(tdSpecificTotal, 'total')
    console.info(output)

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
        ? 'maxManHrs: ' + padManHrs(td[tdProperty].max) : ''
    // console.info(td['Full Deliverable Name'], 'difficulty: ', difficulty, 'skill: ', skill, 'minManHrs:', minManHrs, 'expectedManHrs:', expectedManHrs, 'maxManHrs:', maxManHrs)

    output = 'TD Specific Total'.padEnd(25, ' ')
        // + ':' + fill + '   '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}

module.exports.displayTDSpecificTotal = displayTDSpecificTotal
