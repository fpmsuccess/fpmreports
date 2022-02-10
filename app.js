const util = require('util')
const { version } = require('./package.json')

// import from data sources
const { cliArgs } = require('./src/cliArgs/cliArgs.js')
const { importHierarchy } = require('./src/import/hierarchySource/importHierarchy.js')
const { importDefaultMilestones } = require('./src/import/milestones/importDefaultMilestones.js')
const { importEstimatesMilestones } = require('./src/import/milestones/importEstimatesMilestones.js')

// calculate drones
const { mergeEstimatesWDefaults } = require('./src/compute/mergeEstimatesWDefault')
const { rollupTDs } = require('./src/compute/rollupTDs.js')
const { rollupIDs } = require('./src/compute/rollupIDs')
const { displayTDs } = require('./src/output/displayTD/displayTDs')

appTopLevel()

function appTopLevel() {

    // show app version
    console.log('\tversion: ', version)

    // process cli args options
    const args = cliArgs()

    // only show cli args if requested    
    if (args.options) {
        console.info('cli args', typeof args, args)
        console.info('typeof args.showImports:', typeof args.showImports, args.showImports)
        console.info()
    //     // process.exit(1)
    }

    // import Hierarchy Source 
    //  - rawHierarchySource: simple import from excel files
    //  - hierarchySource: as ID obejcts containing TD objects
    //  - transform raw source into hierarchySource objects (PD, ID, and TD)
    //  - save hierarchySource to storage (local file system or database)
    //  - transform raw source into hierarchySourceFlat objects (PD, ID, and TD)
    //  - hierarchySourceFlat: as flat list of ID and TD objects
    //  - save hierarchySourceFlat to storage (local file system or database)

    const hierarchySource = importHierarchy(args)
    // console.info('hierarchySource:', util.inspect(hierarchySource, false, null, true))

    // import default milestones (PD, ID, TD) and associate with specific PD, ID, or TD
    importDefaultMilestones(args)
    
    // import estimate milestones and (where necessary) merge with defaults
    importEstimatesMilestones(args)
    mergeEstimatesWDefaults(args)

    // rollup deliverable (TD, ID, PD)
    rollupTDs(args)
    // rollupIDs(args)

    // display deliverable totals
    displayTDs(args)

    // // man-hours to Calendar Days
    // // computeManHourstoCalendarDays(args)
}