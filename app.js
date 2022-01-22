const util = require('util')
const merge = require('lodash.merge')

const { readScheduleIndex } = require('./services/scheduleIndex/readScheduleIndex.js')
const { parseScheduleIndex } = require('./services/scheduleIndex/parseScheduleIndex.js')
const { readDefaultStdSch } = require('./services/tdSchedule/readDefaultTDSch.js')
const { readEstTDSchedule } = require('./services/tdSchedule/readEstTDSchedule.js')
const { calculateTdScheduleTotal } = require('./services/tdSchedule/calculateTdScheduleTotal.js')
const { displayDeliverables } = require('./services/output/displayDeliverables.js')

deliverables = {}
defaultTDSchedule = {}
estTDSchedule = {}

appTopLevel()

function appTopLevel() {
    const fileRoot = '/mnt/f/Dropbox/Companies/FPM Success, LLC/Consulting Contracts/ApsiWifi/People/Kevin/Std Costing/'
    const indexSource = 'elbert - std costing.xlsx'
    const indexTab = 'Schedule Index'
    const defaultTDScheduleTab = 'Default TD Schedule'
    const estimateScheduleTab = 'TDxxx'

    // Schedule Index
    indexFile = readScheduleIndex(fileRoot + indexSource, indexTab)
    // console.log('rows in index', indexFile.length)
    // console.info('index:', indexFile)
    deliverables = parseScheduleIndex(indexFile)
    // console.info('deliverables:', util.inspect(deliverables, false, 4, true))
    // console.info('deliverables:', deliverables)
    
    // default std schedule costing
    defaultTDSchedule = readDefaultStdSch(fileRoot + indexSource, defaultTDScheduleTab)
    // console.info('defaultTDSchedule:', defaultTDSchedule)
    // console.info('defaultTDSchedule:', util.inspect(defaultTDSchedule, false, 3, true))

    // walk the deliverables and add defaultTDSchedule, estTDSchedule, and TDSchedule to each TD
    deliverables.idList.forEach((id) => {
        id.tdList.forEach((td) => {
            let tdSchedule = {}
            td['Default TD Schedule'] = defaultTDSchedule
            // read estimated schedule(s)
            td['Estimated TD Schedule'] = readEstTDSchedule(fileRoot + indexSource, estimateScheduleTab)
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

    // console.info('deliverables:', util.inspect(deliverables, false, 6, true))
    // console.info('deliverables.idList:', util.inspect(deliverables.idList, false, 3, true))
}