const util = require('util')

// import from data sources
const { readHierarchySource } = require('./src2/import/hierarchySource/readHierarchySource.js')
const { parseHierarchySource } = require('./src2/import/hierarchySource/parseHierarchySource.js')
const { readDefaultTDSchedue } = require('./src2/import/tdImport/readDefaultTDSchedule.js')
const { tdRollupSchedule } = require('./src2/schedule/tdSchedule/tdRollupSchedule.js')
const { idRollupSchedule } = require('./src2/schedule/idSchedule/idRollupSchedule.js')

// translate manHrs into CalendarDays

// display results to console, capture to text file, export as .csv/.xlsx
const { displayDeliverables } = require('./src2/output/displayDeliverableHierarchy.js')
const { cliArgs } = require('./src2/cliArgs/cliArgs.js')

appTopLevel()

function appTopLevel() {

    let deliverables = {}
    let defaultTDSchedule = {}

    // process cli args options
    const args = cliArgs()
    console.info('cli args', typeof args, args)

    // Hierarchy Index
    try {
        indexFile = readHierarchySource(args.fileRoot + args.hierarchySource, args.indexTab)
    }
    catch (err) {
        console.error('\nERROR: no such file or directory (schedule file) \'' + args.fileRoot + args.hierarchySource + '\'')
        process.exit(-1)
    }
    // if (indexFile === null) {
    //     console.error('\tERROR: parsing Hierarchy Index spreadsheet (' + args.hierarchySource + ':' + args.indexTab)
    //     process.exit(-1)
    // }

    deliverables = parseHierarchySource(indexFile)
    if (deliverables === null) {
        console.error('\tERROR: parsing Hierarchy Index spreadsheet')
        process.exit(-1)
    }
    
    // default std schedule costing
    defaultTDSchedule = readDefaultTDSchedue(args.fileRoot + args.hierarchySource, args.defaultTDScheduleTab)
    if (defaultTDSchedule === null) {
        console.error('\tERROR: parsing \'default TD Schedule\' tab of ' + args.hierarchySource + ' spreadsheet')
        process.exit(-1)
    }
    // console.info('defaultTDSchedule:', defaultTDSchedule)
    // console.info('defaultTDSchedule ', args.defaultTDScheduleTab,':', util.inspect(defaultTDSchedule, false, 3, true))

    // walk the deliverables list and add TD Schedule info 
    deliverables = tdRollupSchedule(deliverables, defaultTDSchedule)
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
    if (args.showDefaultTDSchedule) {
        console.info('defaultTDSchedule ', args.defaultTDScheduleTab, ':', util.inspect(defaultTDSchedule, false, 3, true))
        // console.info('defaultTDSchedule:', defaultTDSchedule)
    }
    // display the deliverable hierarchy
    if (args.showDeliverables)
        displayDeliverables(args, deliverables)
 
}