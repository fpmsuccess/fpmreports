
function displayIDTotal(args, id) {
    // console.log(id['Full Deliverable Name'])
    console.group() // for TDs
        // console.log('ID Total (man hours):', id.total)
        // // output the deliverable schedule total
        output = scheduleTotalToString(id, 'total')
        console.log(output)
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

    output = 'ID Total'.padEnd(25, ' ')
        // + ':' + fill + '   '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}

module.exports.displayIDTotal = displayIDTotal