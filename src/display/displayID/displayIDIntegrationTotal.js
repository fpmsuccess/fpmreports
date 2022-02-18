const chalk = require('chalk')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')

function displayIDIntegrationTotal(args, id) {
    let output 

    // retrieve the deliverable milestones to rollup
    const idSpecificTotal = retrieveDatapoint(args, id['Deliverable Number'] + 'SpecificTotal')

    // // output the deliverable schedule total
    output = 'ID Integration Summary\n'
    output += scheduleTotalToString(idSpecificTotal, 'total')
    console.log(output)

    // output the person that created estimate
    output = '  Estimate Source:'.padEnd(25, ' ')
    if (idSpecificTotal['Person Creating Estimate'] === 'ID Default Milestones'
        || idSpecificTotal['Person Creating Estimate'] === 'ID Zero Milestones'
        || idSpecificTotal['Person Creating Estimate'] === 'ID Test Milestones'
    )
        output += chalk.yellow(idSpecificTotal['Person Creating Estimate'])
    else
        output += chalk.green(idSpecificTotal['Person Creating Estimate'])
    console.info(output)

    // generate difficulty output
    let difficulty = idSpecificTotal['Deliverable Difficulty Level']
    difficultyIndex = difficulty.toLowerCase()

    // generate skill levels output
    let skill = idSpecificTotal['Recommended Skill Level']
    skillIndex = skill.toLowerCase().split(' ').join('')

    // display output for difficulty and skill
    output = '  ID Info'.padEnd(25, ' ')
        + 'difficulty level: ' + difficulty
        + ', recommended skill level: ' + skill
    console.log(output)

    // // output milestone info
    // {
    //     let output
    //     output = ''.padEnd(25,' ')
    //         + 'milestone count: ' + idSpecificTotal.milestoneCount
    //     console.log(output)
    // }
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

    output = '  Estimate (manHrs)::'.padEnd(25, ' ')
        // + ':' + fill + '   '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}

module.exports.displayIDIntegrationTotal = displayIDIntegrationTotal
