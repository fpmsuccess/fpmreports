const util = require('util')


// calculateIdScheduleTotal()
//      ID Schedule = sumIDIMilestones() + sumTDs()
//      sumIDIMilestones(id['Specification']
function calculateIDScheduleTotal(id) {
    // console.group(id['Full Deliverable Name'])
    // console.info('id[ID Schedule]:', util.inspect(id['ID Schedule'], false, 1, true))

    let minManHrs = 0
    let expectedManHrs = 0
    let maxManHrs = 0
    
    // process each TD
    id.tdList.forEach((td) => {
        // console.info('td[Deliverable Name]:', td['Deliverable Name'])
        // console.info('td[TD Schedule Totals]:', td['TD Schedule Totals'])
        minManHrs += td['TD Schedule Totals']['min']
        expectedManHrs += td['TD Schedule Totals']['expected']
        maxManHrs += td['TD Schedule Totals']['max']
    })
    
    // store the results
    idTotals = {'min': 0, 'expected': 0, 'max': 0}
    idTotals.min = minManHrs
    idTotals.expected = expectedManHrs
    idTotals.max = maxManHrs
    // console.info('id:', id['Deliverable Name'], idTotals)

    // console.info('idTotals:', util.inspect(tdTotals, false, 2, true))
    // console.groupEnd(id['Full Deliverable Name'])

    // return {}
    return idTotals
}

module.exports.calculateIDScheduleTotal = calculateIDScheduleTotal
