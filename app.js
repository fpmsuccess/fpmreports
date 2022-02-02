const util = require('util')

// import from data sources
const { importHierarchy } = require('./src/import/hierarchySource/importHierarchy.js')

// import default milestones
// import estimate milestones
// rollup deliverable (TD, ID, PD)
// translate manHrs into CalendarDays

// display results to console, capture to text file, export as .csv/.xlsx
const { displayDeliverables } = require('./src/output/displayDeliverableHierarchy.js')
const { cliArgs } = require('./src/cliArgs/cliArgs.js')
const { exit } = require('process')

appTopLevel()

function appTopLevel() {

    // process cli args options
    const args = cliArgs()
    console.info('cli args', typeof args, args)

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
    

}