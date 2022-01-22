const util = require('util')
const merge = require('lodash.merge')

function displayDeliverables(deliverables) {
    console.log(deliverables.info['Deliverable Name'])
    console.group()
    deliverables.idList.forEach((id) => {
        console.log(id['Full Deliverable Name'])
        console.group()
        id.tdList.forEach((td) => {
            console.log(td['Full Deliverable Name'])
            console.group()
            {
                let output
                let difficulty = td['TD Schedule']['Difficulty Level']
                difficulty = difficulty.toLowerCase()
                let skill = td['TD Schedule']['Recommended Skill Level']
                skill = skill.toLowerCase().split(' ').join('')
                let minManHrsOut = ''
                let expectedManHrsOut = ''
                let maxManHrsOut = ''
                
                // output the difficulty & skill levels
                output = 'difficulty: ' + difficulty + ', skill: ' + skill 

                // process each milestone
                let milestones = ['Design', "Design Review", "Coding", "Code Review", "Unit Test", "Document", "Final Review Prep", "Final Review", 'Merge To Develop']
                milestones.forEach((milestone) => {
                    minManHrsOut = typeof td['TD Schedule'][milestone][difficulty][skill]['min'] !== 'undefined'
                        ? 'minManHrs: ' + td['TD Schedule'][milestone][difficulty][skill]['min'] : ''
                    expectedManHrsOut = typeof td['TD Schedule'][milestone][difficulty][skill]['expected'] !== 'undefined'
                        ? 'expectedManHrs: ' + td['TD Schedule'][milestone][difficulty][skill]['expected'] : ''
                    maxManHrsOut = typeof td['TD Schedule'][milestone][difficulty][skill]['max'] !== 'undefined'
                        ? 'maxManHrs: ' + td['TD Schedule'][milestone][difficulty][skill]['max'] : ''

                    MAX_MILESTONE_FILL = 30
                    let milestoneFill = ''
                    for (i = 1; i <= MAX_MILESTONE_FILL - milestone.length; i++) {
                        milestoneFill += ' '
                    }
                    output = '    ' + milestone + ':'
                        + milestoneFill + ' '
                        + minManHrsOut + ', '
                        + expectedManHrsOut + ', '
                        + maxManHrsOut
                    console.info(output)
                    // console.info('td[TD Schedule]:', util.inspect(td['TD Schedule'][milestone], false, 2, true))
                })

                // process 'TD Schedule Totals'
                minManHrsOut = typeof td['TD Schedule Totals'].min !== 'undefined'
                    ? 'minManHrs: ' + td['TD Schedule Totals'].min : ''
                expectedManHrsOut = typeof td['TD Schedule Totals'].expected !== 'undefined'
                    ? 'expectedManHrs: ' + td['TD Schedule Totals'].expected : ''
                maxManHrsOut = typeof td['TD Schedule Totals'].max !== 'undefined'
                    ? 'maxManHrs: ' + td['TD Schedule Totals'].max : ''
                // console.info(td['Full Deliverable Name'], 'difficulty: ', difficulty, 'skill: ', skill, 'minManHrs:', minManHrs, 'expectedManHrs:', expectedManHrs, 'maxManHrs:', maxManHrs)
                
                let totals = 'TD Schedule Totals'
                MAX_FILL = 30
                let fill = ''
                for (i = 1; i <= MAX_FILL - totals.length; i++) {
                    fill += ' '
                }
                output = '    ' + totals + ':'
                    + fill + ' '
                    + minManHrsOut + ', '
                    + expectedManHrsOut + ', '
                    + maxManHrsOut
                console.info(output)
                // console.info('td[TD Schedule Totals]:', util.inspect(td['TD Schedule Totals'], false, 2, true))

            }
            // console.info('td[Estimated TD Schedule]:', util.inspect(td['Estimated TD Schedule'], false, null, true))
            // console.info('td[TD Schedule]:', util.inspect(td['TD Schedule']['Design'], false, 2, true))
            console.groupEnd()
        })
        console.groupEnd()
    })
    console.groupEnd()
}

module.exports.displayDeliverables = displayDeliverables
