const util = require('util')
const { version } = require('./package.json')

// import from data sources
const { cliArgs } = require('./src/cliArgs/cliArgs.js')
const { importHierarchy } = require('./src/import/importHierarchy')
const { computeSpecificRollup } = require('./src/compute/computeSpecificRollup')
const { computeTotals } = require('./src/compute/computeTotals')
const { displayDeliverables } = require('./src/display/displayDeliverables')

appTopLevel()

function appTopLevel() {

    // show app version
    console.log('\nfpmRollup:\tversion:', version)

    console.group()
    
    // process cli args options
    const args = cliArgs()

    // only show cli args if requested    
    if (args.options) {
        console.info('cli args', typeof args, args)
        console.info()
    }
    
    // import default milestones (PD, ID, TD) and associate with specific PD, ID, or TD
    console.info('\nimport Project Hierarchy:', args.hierarchySource)
    console.group()
        importHierarchy(args)
    console.groupEnd()
    
    // compute deliverable specific (@ [difficulty, skill]) for TDxxx, IDx, PD
    console.info('\ncompute Deliverable Specific milestones')
    console.group()
        computeSpecificRollup(args)
    console.groupEnd()

    // compute deliverable total (TD, ID, PD)
    console.info('\ncompute Deliverable Totals')
    console.group()
        computeTotals(args)
    console.groupEnd()

    // // man-hours to Calendar Days
    // // computeManHourstoCalendarDays(args)

    // display deliverable totals
    displayDeliverables(args)

    console.groupEnd()
}