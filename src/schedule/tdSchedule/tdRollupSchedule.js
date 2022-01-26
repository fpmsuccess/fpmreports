const merge = require('lodash.merge')

const { readEstTDSchedule } = require('../../import/tdImport/readEstTDSchedule.js')
const { calculateTdScheduleTotal } = require('./calculateTdScheduleTotal.js')

// tdRollupSchedule()
//      walk the deliverables for each id
//          -> read td defaultTDSchedule & td estTDSchedule
//          -> merge the est with the default to create the best hybrid
//          -> then add TDSchedule to each td

function tdRollupSchedule(deliverables) {

    deliverables.idList.forEach((id) => {

        // process each td form (from Schedule Index)
        //  - validate form input fields
        //  - verify TD Schedule estimate filename, tab
        id.tdList.forEach((td) => {
            let tdSchedule = {}
            td['Default TD Schedule'] = defaultTDSchedule
            // read estimated schedule(s)
            filename = td['Estimate Root Path'] + td['Estimate File Name']
            tab = td['Estimate Tab']
            // console.info('\t INFO: filename:', filename, '\n\ttab:', tab)
            td['Estimated TD Schedule'] = readEstTDSchedule(filename, tab)
            if (td['Estimated TD Schedule'] === null) {
                console.error('\tError in parsing TD Schedule Estimates Form spreadsheet')
                process.exit(-1)
            }
            if (typeof td['Estimated TD Schedule']['Deliverable Name - TD Estimate Form'] === 'undefined') {
                // console.info('\tINFO: td[Deliverable Name - TD Estimate Form]', td['Deliverable Name - TD Estimate Form'])
                console.error('\tError: parsing ' + indexSource + ':' + estimateScheduleTab + ' has missing \'Deliverable Name\' entry')
                process.exit(-1)
            }
            if (td['Estimated TD Schedule']['Deliverable Name'] !== td['Estimated TD Schedule']['Deliverable Name - TD Estimate Form']) {
                console.error('\tWarning: Estimate Deliverable Name does not match' 
                + '\n\t\tSchedule Index : \'' + td['Deliverable Name']
                + '\'\n\t\tEstimate       : \''
                + td['Estimated TD Schedule']['Deliverable Name - TD Estimate Form'] 
                + '\''
                + '\n\t\t        in file: ' + td['Estimate File Name'] 
                )
            }
            if (typeof td['Estimated TD Schedule']['Deliverable Number'] === 'undefined') {
                console.error('\tError: parsing ' + indexSource + ':' + estimateScheduleTab + ' has missing \'Deliverable Number\' entry')
                process.exit(-1)
            }
            // console.info('td[Estimated TD Schedule]:', util.inspect(td['Estimated TD Schedule'], false, null, true))
            td['TD Schedule'] = merge(td['Default TD Schedule'], td['Estimated TD Schedule'])
            // console.info('td[TD Schedule]:', util.inspect(td['TD Schedule'], false, null, true))
            td['TD Schedule Totals'] = calculateTdScheduleTotal(td)
            // console.info('td[TD Schedule Totals]:', util.inspect(td['TD Schedule Totals'], false, null, true))
        })
        // console.groupEnd()
    })

    return deliverables
}

module.exports.tdRollupSchedule = tdRollupSchedule