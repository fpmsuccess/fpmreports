
function displayPDTotal(args, pd) {
    // console.log(pd['Full Deliverable Name'])
    console.group() // for PD
        // // output the deliverable total
        output = scheduleTotalToString(pd, 'total')
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

function scheduleTotalToString(pd, tdProperty) {
    let output = ''
    let minManHrsOut = ''
    let expectedManHrsOut = ''
    let maxManHrsOut = ''

    // process 'ID Schedule Total'
    minManHrsOut = typeof pd[tdProperty].min !== 'undefined'
        ? 'minManHrs: ' + padManHrs(pd[tdProperty].min) : ''
    expectedManHrsOut = typeof pd[tdProperty].expected !== 'undefined'
        ? 'expectedManHrs: ' + padManHrs(pd[tdProperty].expected) : ''
    maxManHrsOut = typeof pd[tdProperty].max !== 'undefined'
        ? 'maxManHrs: ' + padManHrs(pd[tdProperty].max) : ''

    output = 'PD Total'.padEnd(25, ' ')
        // + ':' + fill + '   '
        + minManHrsOut + ', '
        + expectedManHrsOut + ', '
        + maxManHrsOut

    return output
}

module.exports.displayPDTotal = displayPDTotal