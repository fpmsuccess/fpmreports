const chalk = require('chalk')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')

function displayTDSummary(args, td) {
    let output

    // retrieve the deliverable milestones to rollup
    const tdSpecificTotal = retrieveDatapoint(args, td['Deliverable Number'] + 'SpecificTotal')

    console.log(chalk.cyan(td['Deliverable Number'] + ' - ' + td['Deliverable Name']))
    
    // console.log('TD Development Summary')
    console.group() //for each td
    
    // start with deliverable estimated man hours
    output = scheduleTotalToString(tdSpecificTotal, 'total')
    console.info(output)

    // output the person that created estimate
    output = 'Estimate Source:'.padEnd(25, ' ')
    // + tdSpecificTotal['Person Creating Estimate']
    if (tdSpecificTotal['Person Creating Estimate'] === 'TD Default Milestones'
        || tdSpecificTotal['Person Creating Estimate'] === 'TD Zero Milestones'
        || tdSpecificTotal['Person Creating Estimate'] === 'TD One Milestones'
        || tdSpecificTotal['Person Creating Estimate'] === 'TD Test Milestones'
    )
        output += chalk.yellow(tdSpecificTotal['Person Creating Estimate'])
    else
        output += chalk.green(tdSpecificTotal['Person Creating Estimate'])
    console.info(output)

    // generate difficulty levels output
    let difficulty = tdSpecificTotal['Deliverable Difficulty Level']
    difficultyIndex = difficulty.toLowerCase()

    // generate skill levels output
    let skill = tdSpecificTotal['Recommended Skill Level']
    skillIndex = skill.toLowerCase().split(' ').join('')

    // display output for difficulty and skill
    output = 'TD Info'.padEnd(25, ' ')
        + 'difficulty level: ' + difficulty
        + ', recommended skill level: ' + skill
    console.log(output)

    // // output the general info
    // {
    //     let output
    //     output = ''.padEnd(25,' ')
    //         + 'milestone count: ' + tdSpecificTotal.milestoneCount
    //     console.log(output)
    // }

    // end with blank line
    console.log()
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

    output = 'Estimate (manHrs):'.padEnd(25, ' ')
        // + ':' + fill + '   '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}

module.exports.displayTDSummary = displayTDSummary
