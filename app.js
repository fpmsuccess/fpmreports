const util = require('util')

// import from data sources
const { readScheduleIndex } = require('./src/import/scheduleIndex/readScheduleIndex.js')
const { parseScheduleIndex } = require('./src/import/scheduleIndex/parseScheduleIndex.js')
const { readDefaultStdSch } = require('./src/import/tdImport/readDefaultTDSch.js')
const { tdRollupSchedule } = require('./src/schedule/tdSchedule/tdRollupSchedule.js')
const { idRollupSchedule } = require('./src/schedule/idSchedule/idRollupSchedule.js')

// translate manHrs into CalendarDays

// display results to console, capture to text file, export as .csv/.xlsx
const { displayDeliverables } = require('./src/output/displayDeliverableHierarchy.js')
const { cliArgs } = require('./src/cliArgs/cliArgs.js')

deliverables = {}
defaultTDSchedule = {}
estTDSchedule = {}

appTopLevel()

function appTopLevel() {

    // process cli args options
    const args = cliArgs()
    // console.info('cli args', typeof args, args)

    // Schedule Index
    try {
        indexFile = readScheduleIndex(args.fileRoot + args.indexSource, args.indexTab)
    }
    catch (err) {
        console.error('\nError: no such file or directory (schedule file) \'' + args.fileRoot + args.indexSource + '\'')
        process.exit(-1)
    }
    // if (indexFile === null) {
    //     console.error('\tError in parsing Schedule Index spreadsheet (' + args.indexSource + ':' + args.indexTab)
    //     process.exit(-1)
    // }

    deliverables = parseScheduleIndex(indexFile)
    if (deliverables === null) {
        console.error('\tError in parsing Schedule Index spreadsheet')
        process.exit(-1)
    }
    
    // default std schedule costing
    defaultTDSchedule = readDefaultStdSch(args.fileRoot + args.indexSource, args.defaultTDScheduleTab)
    if (defaultTDSchedule === null) {
        console.error('\tError in parsing \'default TD Schedule\' tab of ' + args.indexSource + ' spreadsheet')
        process.exit(-1)
    }
    // console.info('defaultTDSchedule:', defaultTDSchedule)
    // console.info('defaultTDSchedule:', util.inspect(defaultTDSchedule, false, 3, true))

    // walk the deliverables list and add TD Schedule info 
    deliverables = tdRollupSchedule(deliverables)
    if (deliverables === null) {
        console.error('\tError in adding TD Schedule info to deliverables list')
        process.exit(-1)
    }

    // walk the deliverables list and add ID Schedule info 
    deliverables = idRollupSchedule(deliverables)
    if (deliverables === null) {
        console.error('\tError in adding TD Schedule info to deliverables list')
        process.exit(-1)
    }



    // display the raw content
    if (args.showScheduleIndex) {
        console.info('index:', indexFile)
    }
    if (args.showDeliverablesX) {
        console.info('deliverables:', util.inspect(deliverables, false, 4, true))
        // console.info('deliverables.idList:', util.inspect(deliverables.idList, false, 3, true))
    }
    // display the deliverable hierarchy
    if (args.showDeliverables)
        displayDeliverables(args, deliverables)
 
}