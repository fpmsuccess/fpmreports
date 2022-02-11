const util = require('util')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')

function displayIDSpecificTotal(args, id) {

    console.info('')

    // retrieve the deliverable milestones to rollup
    const idSpecificTotal = retrieveDatapoint(args, id['Deliverable Number'] + 'SpecificTotal')

    console.log(idSpecificTotal['Deliverable Number'] + ' - ' + idSpecificTotal['Deliverable Name'])
    console.group() //for each id

    // output the person that created estimate
    output = 'Estimate Created by:'.padEnd(25, ' ')
        + idSpecificTotal['Person Creating Estimate']
    console.info(output)

    // output the difficulty & skill levels
    {
        let output
        let difficulty = idSpecificTotal['Deliverable Difficulty Level']
        difficultyIndex = difficulty.toLowerCase()
        let skill = idSpecificTotal['Recommended Skill Level']
        skillIndex = skill.toLowerCase().split(' ').join('')
        output = 'ID Info'.padEnd(25, ' ')
            + 'difficulty level: ' + difficulty
            + ', recommended skill level: ' + skill
        console.log(output)
    }
    // output the general info
    {
        let output
        output = ''.padEnd(25,' ')
            + 'milestone count: ' + idSpecificTotal.milestoneCount
        console.log(output)
    }

    // // output the deliverable schedule total
    output = scheduleTotalToString(idSpecificTotal, 'total')
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

function scheduleTotalToString(id, tdProperty) {
    let output = ''
    let minManHrsOut = ''
    let expectedManHrsOut = ''
    let maxManHrsOut = ''

    // process 'ID Schedule Total'
    minManHrsOut = typeof id[tdProperty].min !== 'undefined'
        ? 'minManHrs: ' + padManHrs(id[tdProperty].min) : ''
    expectedManHrsOut = typeof id[tdProperty].expected !== 'undefined'
        ? 'expectedManHrs: ' + padManHrs(id[tdProperty].expected) : ''
    maxManHrsOut = typeof id[tdProperty].max !== 'undefined'
        ? 'maxManHrs: ' + padManHrs(id[tdProperty].max) : ''
    // console.info(id['Full Deliverable Name'], 'difficulty: ', difficulty, 'skill: ', skill, 'minManHrs:', minManHrs, 'expectedManHrs:', expectedManHrs, 'maxManHrs:', maxManHrs)

    output = 'ID Specific Total'.padEnd(25, ' ')
        // + ':' + fill + '   '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}

module.exports.displayIDSpecificTotal = displayIDSpecificTotal
