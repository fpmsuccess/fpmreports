const util = require('util')
const merge = require('lodash.merge')

const { readEstTDSchedule } = require('../../import/tdImport/readEstTDSchedule.js')
const { calculateTdScheduleTotal } = require('./calculateTdScheduleTotal.js')

// tdRollupSchedule()
//      walk the deliverables for each id
//          -> read td defaultTDSchedule & td estTDSchedule
//          -> merge the est with the default to create the best hybrid
//          -> then add TDSchedule to each td

function tdRollupSchedule(deliverables, defaultTDSchedule) {

    deliverables.idList.forEach((id) => {

        // process each td form (from Hierarchy Index)
        //  - validate form input fields
        //  - verify TD Schedule estimate filename, tab
        id.tdList.forEach((td) => {
            let filePath = td['Estimate Root Path']
            let fileName = td['Estimate File Name']
            let tab = td['Estimate Tab']
            let error = false
            let warning = false
            let errMessage = '\t' + td['Full Deliverable Name'] + '\n\t\t@ \'' + fileName + '\':\'' + tab + '\')'

            // read estimated schedule(s)
            // console.info('\t INFO: filename:', filename, '\n\ttab:', tab)
            td['Estimated TD Schedule'] = readEstTDSchedule(filePath, fileName, tab)
            if (td['Estimated TD Schedule'] === null) {
                console.error('\t' + td['Full Deliverable Name'] + '\n\t\tError: parsing TD Schedule Estimates spreadsheet')
                process.exit(-1)
            }
            if (typeof td['Estimated TD Schedule']['Deliverable Name - TD Estimate Form'] === 'undefined') {
                errMessage += '\n\t\t\tWarning: missing \'Deliverable Name\' entry'
                console.error('\tWarning: ', fileName, ':', tab, ' missing \'Deliverable Name\' entry')
                warning = true
            } 
            if (td['Deliverable Name'] !== td['Estimated TD Schedule']['Deliverable Name - TD Estimate Form']) {
                errMessage += '\n\t\tWarning: Estimate Deliverable Name does not match TD Deliverable Name'
                errMessage += '\n\t\t  Estimate Deliverable Name: \''
                errMessage += td['Estimated TD Schedule']['Deliverable Name - TD Estimate Form'] += '\''
                errMessage += '\n\t\t        TD Deliverable Name: \'' + td['Deliverable Name'] + '\''
                warning = true
            }
            if (typeof td['Estimated TD Schedule']['Deliverable Number'] === 'undefined') {
                errMessage += '\n\t\tWarning: missing \'Deliverable Number\' entry'
                console.error('\tWarning: ', fileName, ':', tab, ' missing \'Deliverable Number\' entry')
                warning = true
            }
            // if a parsing error has been detected, note it and continue
            if (warning) {
                console.error(errMessage)
            }
            // console.info('td[Estimated TD Schedule]:', util.inspect(td['Estimated TD Schedule'], false, null, true))


            td['Default TD Schedule'] = defaultTDSchedule
            // console.info('td[Default TD Schedule][Coding] (before merge):', td['Full Deliverable Name'], util.inspect(td['Default TD Schedule']['Coding'], false, null, true))
            // console.info('td[Estimated TD Schedule][Coding] (before merge):', td['Full Deliverable Name'], util.inspect(td['Estimated TD Schedule']['Coding'], false, null, true))
            // merge default into any missing values for TD Schedule
            // let obj = {...td['Default TD Schedule'], ...td['Estimated TD Schedule']}
            // td['TD Schedule'] = {...td['Default TD Schedule'], ...td['Estimated TD Schedule']}
            let obj = {}
            td['TD Schedule'] = MergeRecursive(td['Default TD Schedule'], td['Estimated TD Schedule'])
            // td['TD Schedule'] = merge(td['Default TD Schedule'], td['Estimated TD Schedule'])
            // console.info('td[Default TD Schedule][Coding] (after merge):', util.inspect(td['Default TD Schedule']['Coding'], false, null, true))
            console.info('td[TD Schedule] (after merge):', util.inspect(td['TD Schedule'], false, null, true))
            td['TD Schedule Totals'] = calculateTdScheduleTotal(td)
            // console.info('td[TD Schedule Totals]:', util.inspect(td['TD Schedule Totals'], false, null, true))
        })
        // console.groupEnd()
    })

    return deliverables
}

/*
* Recursively merge properties of two objects 
*/
function MergeRecursive(obj1, obj2) {

    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if (obj2[p].constructor == Object) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];

            }

        } catch (e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

        }
    }

    return obj1;
}

module.exports.tdRollupSchedule = tdRollupSchedule