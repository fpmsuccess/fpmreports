const util = require('util')
const { version } = require('./package.json')

// import from data sources
const { importHierarchy } = require('./src/import/hierarchySource/importHierarchy.js')
const { importDefaultMilestones } = require('./src/import/milestones/importDefaultMilestones.js')
const { importEstimateMilestones } = require('./src/import/milestones/importEstimateMilestones.js')

// WORK
//  - import default milestones
//  - import estimate milestones
//  - rollup deliverable (TD, ID, PD)
//  - translate manHrs into CalendarDays

// display results to console, capture to text file, export as .csv/.xlsx
const { displayDeliverables } = require('./src/output/displayDeliverableHierarchy.js')
const { cliArgs } = require('./src/cliArgs/cliArgs.js')
const { exit } = require('process')

appTopLevel()

function appTopLevel() {

    // show app version
    console.log('\tversion: ', version)

    // process cli args options
    const args = cliArgs()
    console.info('cli args', typeof args, args)

    if (args.argsOnly) return

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

    // import estimate milestones
    importEstimateMilestones(args)

    // rollup deliverable (TD, ID, PD)
    // computeDelierableRollup(args)

    // man-hours to Calendar Days
    // computeManHourstoCalendarDays(args)
}