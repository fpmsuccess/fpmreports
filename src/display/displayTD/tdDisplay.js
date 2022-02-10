const util = require('util')

function tdDisplay(args, tdMilestonesTotal, tdMilestones) {
    // console.info('args.showOnlyActiveTDs:', args.showOnlyActiveTDs)
    // console.info('td.Active:', td.Active)
    // if ((args.showOnlyActiveTDs || args.showOnlyActiveIDs) && tdMilestonesTotal.Active)
    //     return

    let target = args.displayTDxxxTotal
    if ( target && (target === tdMilestonesTotal['Deliverable Number'] || typeof args.displayTDxxxTotal == 'boolean')) {

        console.log(tdMilestonesTotal['Deliverable Number'] + ':' + tdMilestonesTotal['Deliverable Name'])
        console.group() //for each td

        // output the person that created estimate
        output = 'Estimate Created by:'.padEnd(25, ' ')
            + tdMilestonesTotal['Person Creating Estimate']
        console.info(output)

        // // output the deliverable schedule total
        output = scheduleTotalToString(tdMilestonesTotal, 'total')
        console.info(output)
        // console.info('tdMilestonesTotal[TD Schedule Totals]:', util.inspect(tdMilestonesTotal['TD Schedule Totals'], false, 2, true))

        // output the difficulty & skill levels
        {
            let output
            let difficulty = tdMilestonesTotal['Deliverable Difficulty Level']
            difficultyIndex = difficulty.toLowerCase()
            let skill = tdMilestonesTotal['Recommended Skill Level']
            skillIndex = skill.toLowerCase().split(' ').join('')
            output = 'TD Info'.padEnd(25, ' ')
                + 'difficulty level: ' + difficulty
                + ', recommended skill level: ' + skill
            console.log(output)
        }

        // // process each milestone
        // if (args.showLevel === 'milestones') {
            console.group('Milestones')  // for each milestone
            Object.entries(tdMilestones.milestones).forEach((mstone) => {
                milestone = mstone[1]   // NOTE: need the mstone[1] offset because of how Object.entries converts the object
                output = scheduleRenderToString(mstone[0], milestone, difficultyIndex, skillIndex)
                console.log(output)
            })
            console.groupEnd('Milestones')
            console.log()   // leave a blank line at the end of the TD milestone display
        // }
        console.groupEnd()
    }
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

    output = 'TD Milestones Total'.padEnd(25, ' ')
        // + ':' + fill + '   '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}
function scheduleRenderToString(name, milestone, difficultyIndex, skillIndex) {

    let output
    let minManHrsOut = ''
    let expectedManHrsOut = ''
    let maxManHrsOut = ''

    minManHrsOut = typeof milestone[difficultyIndex][skillIndex]['min'] !== 'undefined'
        ? 'minManHrs: ' + padManHrs(milestone[difficultyIndex][skillIndex]['min']) : ''
    expectedManHrsOut = typeof milestone[difficultyIndex][skillIndex]['expected'] !== 'undefined'
        ? 'expectedManHrs: ' + padManHrs(milestone[difficultyIndex][skillIndex]['expected']) : ''
    maxManHrsOut = typeof milestone[difficultyIndex][skillIndex]['max'] !== 'undefined'
        ? 'maxManHrs: ' + padManHrs(milestone[difficultyIndex][skillIndex]['max']) : ''

    MAX_MILESTONE_FILL = 30
    let milestoneFill = ''
    for (i = 1; i <= MAX_MILESTONE_FILL - milestone.length; i++) {
        milestoneFill += ' '
    }
    output = 
        (name + ':').padEnd(30, ' ')
        + milestoneFill + ' '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}

module.exports.tdDisplay = tdDisplay
