const util = require('util')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')

function displayPDSpecificTotal(args, pd) {

    // retrieve the deliverable milestones to rollup
    const pdSpecificTotal = retrieveDatapoint(args, pd['Deliverable Number'] + 'SpecificTotal')

    console.log(pdSpecificTotal['Deliverable Number'] + ' - ' + pdSpecificTotal['Deliverable Name'])
    console.group() //for each pd

    // output the person that created estimate
    output = 'Estimate Created by:'.padEnd(25, ' ')
        + pdSpecificTotal['Person Creating Estimate']
    console.info(output)

    // output the difficulty & skill levels
    {
        let output
        let difficulty = pdSpecificTotal['Deliverable Difficulty Level']
        difficultyIndex = difficulty.toLowerCase()
        let skill = pdSpecificTotal['Recommended Skill Level']
        skillIndex = skill.toLowerCase().split(' ').join('')
        output = 'PD Info'.padEnd(25, ' ')
            + 'difficulty level: ' + difficulty
            + ', recommended skill level: ' + skill
        console.log(output)
    }
    // output the general info
    {
        let output
        output = ''.padEnd(25,' ')
            + 'milestone count: ' + pdSpecificTotal.milestoneCount
        console.log(output)
    }

    // // output the deliverable schedule total
    output = scheduleTotalToString(pdSpecificTotal, 'total')
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

function scheduleTotalToString(pd, pdProperty) {
    let output = ''
    let minManHrsOut = ''
    let expectedManHrsOut = ''
    let maxManHrsOut = ''

    // process 'PD Schedule Total'
    minManHrsOut = typeof pd[pdProperty].min !== 'undefined'
        ? 'minManHrs: ' + padManHrs(pd[pdProperty].min) : ''
    expectedManHrsOut = typeof pd[pdProperty].expected !== 'undefined'
        ? 'expectedManHrs: ' + padManHrs(pd[pdProperty].expected) : ''
    maxManHrsOut = typeof pd[pdProperty].max !== 'undefined'
        ? 'maxManHrs: ' + padManHrs(pd[pdProperty].max) : ''
    // console.info(pd['Full Deliverable Name'], 'difficulty: ', difficulty, 'skill: ', skill, 'minManHrs:', minManHrs, 'expectedManHrs:', expectedManHrs, 'maxManHrs:', maxManHrs)

    output = 'PD Specific Total'.padEnd(25, ' ')
        // + ':' + fill + '   '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}

module.exports.displayPDSpecificTotal = displayPDSpecificTotal
