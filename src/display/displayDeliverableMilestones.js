const util = require('util')

function displayDeliverableMilestones(args, deliverable) {

    console.group() //for each deliverable

    let output
    let difficulty = deliverable['Deliverable Difficulty Level']
    difficultyIndex = difficulty.toLowerCase()
    let skill = deliverable['Recommended Skill Level']
    skillIndex = skill.toLowerCase().split(' ').join('')

    // process each milestone
    console.group('Milestones')  // for each milestone
    Object.entries(deliverable.milestones).forEach((mstone) => {
        // NOTE: need the milestone[1] offset because of how Object.entries converts the object
        milestone = mstone[1]   
        // console.info('milestone:', milestone)
        output = scheduleRenderToString(mstone[0], milestone, difficultyIndex, skillIndex)
        console.log(output)
    })
    console.groupEnd('Milestones')
    console.log()   // leave a blank line at the end of the TD milestone display

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

module.exports.displayDeliverableMilestones = displayDeliverableMilestones
