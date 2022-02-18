const chalk = require('chalk')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')

function displayPDIntegrationTotal(args, pd) {
    let output 

    // retrieve the deliverable milestones to rollup
    const pdSpecificTotal = retrieveDatapoint(args, pd['Deliverable Number'] + 'SpecificTotal')
    
    // output the deliverable schedule total
    output = 'PD Integration Summary\n'
    output += scheduleTotalToString(pdSpecificTotal, 'total')
    console.log(output)

    // output the person that created estimate
    output = '  Estimate Source:'.padEnd(25, ' ')
    if (pdSpecificTotal['Person Creating Estimate'] === 'PD Default Milestones'
        || pdSpecificTotal['Person Creating Estimate'] === 'PD Zero Milestones'
    )
        output += chalk.yellow( pdSpecificTotal['Person Creating Estimate'])
    else
        output += chalk.green(pdSpecificTotal['Person Creating Estimate'])
    console.log(output)

    // generate difficulty levels output
    let difficulty = pdSpecificTotal['Deliverable Difficulty Level']
    difficultyIndex = difficulty.toLowerCase()

    // generate skill levels output
    let skill = pdSpecificTotal['Recommended Skill Level']
    skillIndex = skill.toLowerCase().split(' ').join('')

    // display output for difficulty and skill
    output = '  Difficulty and Skill:'.padEnd(25, ' ')
        + 'difficulty level: ' + difficulty
        + ', recommended skill level: ' + skill
    console.info(output)
    
    //  // output the integration effort info
    // let output
    // output = ''.padEnd(25,' ')
    //     + 'milestone count: ' + pdSpecificTotal.milestoneCount
    // console.log(output)
        
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

    output = '  Estimate (manHrs):'.padEnd(25, ' ')
        // + ':' + fill + '   '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}

module.exports.displayPDIntegrationTotal = displayPDIntegrationTotal
