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
    console.log()

    console.group()
    
    // process cli args options
    const args = cliArgs()

    // only show cli args if requested    
    if (args.options) {
        console.info('cli args', typeof args, args)
        console.info()
    }
    
    if (args.import || args.all) {
        // import default milestones (PD, ID, TD) and associate with specific PD, ID, or TD
        console.info('\nimport Project Hierarchy:', args.hierarchySource)
        console.group()
            importHierarchy(args)
        console.groupEnd()
    }

    if (args.compute || args.all) {
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
    }
    console.log()

    // // man-hours to Calendar Days
    // // computeManHourstoCalendarDays(args)

    if (args.display || args.all) {
        // display deliverable totals
        console.info('display Report\n')
        console.group()
            displayDeliverables(args)
        console.groupEnd()
    }

    console.groupEnd()
}