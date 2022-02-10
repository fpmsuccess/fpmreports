const util = require('util')
const { version } = require('./package.json')

// import from data sources
const { cliArgs } = require('./src/cliArgs/cliArgs.js')
const { importHierarchy } = require('./src/import/importHierarchy')
const { computeSpecific } = require('./src/compute/computeSpecific')
const { computeTotals } = require('./src/compute/computeTotals')
const { displayDeliverables } = require('./src/display/displayDeliverables')

// calculate drones
// const { tdMergeEstimatesWDefaults } = require('./src/compute/td/tdMergeEstimatesWDefault')
// const { idMergeEstimatesWDefaults } = require('./src/compute/id/idMergeEstimatesWDefault')
// const { rollupTDs } = require('./src/compute/td/rollupTDs.js')
// const { rollupIDs } = require('./src/compute/id/rollupIDs')
// const { displayTDs } = require('./src/output/displayTD/displayTDs')

appTopLevel()

function appTopLevel() {

    // show app version
    console.log('\tversion: ', version)

    // process cli args options
    const args = cliArgs()

    // only show cli args if requested    
    if (args.options) {
        console.info('cli args', typeof args, args)
        // console.info('typeof args.showImports:', typeof args.showImports, args.showImports)
        console.info()
    //     // process.exit(1)
    }
    
    // import default milestones (PD, ID, TD) and associate with specific PD, ID, or TD
    importHierarchy(args)

    // compute deliverable specific (@ [difficulty, skill]) for TDxxx, IDx, PD
    //  => TDxxxSpecific
    //  => IDxSpecific
    //  => PDSpecific
    computeSpecific(args)

    // compute deliverable total (TD, ID, PD)
    //  => TDxxxTotal
    //  => IDxTotal
    // //  => PDTotal
    computeTotals(args)
        // computeTDxxxTotal(args)
        // computeIDxTotal(args)
        // computePDTotal(args)

    // // man-hours to Calendar Days
    // // computeManHourstoCalendarDays(args)

    // display deliverable totals
    displayDeliverables(args)
}