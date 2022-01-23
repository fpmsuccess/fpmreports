const util = require('util')
const merge = require('lodash.merge')

// import from data sources
const { readScheduleIndex } = require('./services/import/scheduleIndex/readScheduleIndex.js')
const { parseScheduleIndex } = require('./services/import/scheduleIndex/parseScheduleIndex.js')
const { readDefaultStdSch } = require('./services/import/tdImport/readDefaultTDSch.js')
const { readEstTDSchedule } = require('./services/import/tdImport/readEstTDSchedule.js')

// calculate TDTotal (from milestones), IDTotal (from TDTotals) + IDI, PDTotal from IDTotals + PDI, 
const { calculateTdScheduleTotal } = require('./services/tdSchedule/calculateTdScheduleTotal.js')

// translate manHrs into CalendarDays

// display results to console, capture to text file, export as .csv/.xlsx
const { displayDeliverables } = require('./services/output/displayDeliverableHierarchy.js')

deliverables = {}
defaultTDSchedule = {}
estTDSchedule = {}

appTopLevel()

function appTopLevel() {
    const fileRoot = '/mnt/f/Dropbox/Companies/FPM Success, LLC/Consulting Contracts/ApsiWifi/People/Kevin/Std Costing/'
    const indexSource = 'elbert - std costing.xlsx'
    const indexTab = 'Schedule Index'
    const defaultTDScheduleTab = 'Default TD Schedule'
    // const defaultIDScheduleTab = 'Default ID Schedule'
    // const defaultPDScheduleTab = 'Default PD Schedule'
    // const estimateScheduleTab = 'TDxxx Form'
    // const estimateScheduleSource = 'some path/filename'  // note: this is available via the indexTab
    const estimateScheduleTab = 'TDxxx'

    // Schedule Index
    indexFile = readScheduleIndex(fileRoot + indexSource, indexTab)
    if (indexFile === null) {
        console.error('\tError in parsing Schedule Index spreadsheet (' + indexSource + ':' + indexTab)
        process.exit(-1)
    }
    // console.log('rows in index', indexFile.length)
    // console.info('index:', indexFile)
    deliverables = parseScheduleIndex(indexFile)
    if (deliverables === null) {
        console.error('\tError in parsing Schedule Index spreadsheet')
        process.exit(-1)
    }
    // console.info('deliverables:', util.inspect(deliverables, false, 4, true))
    // console.info('deliverables:', deliverables)
    
    // default std schedule costing
    defaultTDSchedule = readDefaultStdSch(fileRoot + indexSource, defaultTDScheduleTab)
    if (defaultTDSchedule === null) {
        console.error('\tError in parsing \'default TD Schedule\' tab of ' + indexSource + ' spreadsheet')
        process.exit(-1)
    }
    // console.info('defaultTDSchedule:', defaultTDSchedule)
    // console.info('defaultTDSchedule:', util.inspect(defaultTDSchedule, false, 3, true))

    // walk the deliverables and add defaultTDSchedule, estTDSchedule, and TDSchedule to each TD
    deliverables.idList.forEach((id) => {
        id.tdList.forEach((td) => {
            let tdSchedule = {}
            td['Default TD Schedule'] = defaultTDSchedule
            // read estimated schedule(s)
            filename = fileRoot + td['Estimate File Name']
            tab = td['Estimate Tab']
            // console.info('\t INFO: filename:', filename, '\n\ttab:', tab)
            td['Estimated TD Schedule'] = readEstTDSchedule(filename, tab)
            if (td['Estimated TD Schedule'] === null) {
                console.error('\tError in parsing TD Schedule Estimates Form spreadsheet')
                process.exit(-1)
            }
            // console.info('\tInfo: td:', td)
            if (typeof td['Estimated TD Schedule']['Deliverable Name - TD Estimate Form'] === 'undefined') {
                // console.info('\tINFO: td[Deliverable Name - TD Estimate Form]', td['Deliverable Name - TD Estimate Form'])
                console.error('\tError: parsing ' + indexSource + ':' + estimateScheduleTab + ' has missing \'Deliverable Name\' entry')
                process.exit(-1)
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

    // display the deliverable structure
    displayDeliverables(deliverables)

    // console.info('deliverables:', util.inspect(deliverables, false, 4, true))
    // console.info('deliverables.idList:', util.inspect(deliverables.idList, false, 3, true))
}