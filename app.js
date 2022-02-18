const util = require('util')
const { version } = require('./package.json')

// import from data sources
const { cliArgs } = require('./src/cliArgs/cliArgs.js')
const { importHierarchy } = require('./src/import/importHierarchy')
const { normalizeDeliverables } = require('./src/compute/normalizeDeliverables')
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
        console.info('cli args', args)
        console.info()
    }
    
    if (args.import || args.all) {
        // import default milestones (PD, ID, TD) and associate with specific PD, ID, or TD
        console.info('\nimport Project Hierarchy:', args.hierarchySource)
        console.group()
            importHierarchy(args)
            // stop processing if error conditions have been encountered!
            if (typeof args.stopAfterImport && args.stopAfterImport === true) {
                process.exit(2)
            }
        console.groupEnd()


        // generate normalized milestones for TDxxx, IDx, PD
        //  => TDxxxMilestones
        //  => IDxMilestones
        //  => PDMilestones
        console.info('\ncompute normalized Deliverable Estimates \n\n  ... Use defaults values for any undeclared Estimate milestones')
        console.group()
            normalizeDeliverables(args)
            // stop processing if error conditions have been encountered!
            if (typeof args.stopAfterImport && args.stopAfterImport === true) {
                process.exit(2)
            }
        console.groupEnd()

        // compute deliverable specific (@ [difficulty, skill]) for TDxxx, IDx, PD
        console.info('\ncompute Deliverable Specific milestones')
        console.group()
            computeSpecificRollup(args)
            // stop processing if error conditions have been encountered!
            if (typeof args.stopAfterImport && args.stopAfterImport === true) {
                process.exit(2)
            }
        console.groupEnd()


        // compute deliverable total (TD, ID, PD)
        console.info('\ncompute Deliverable Totals')
        console.group()
            computeTotals(args)
            // stop processing if error conditions have been encountered!
            if (typeof args.stopAfterImport && args.stopAfterImport === true) {
                process.exit(2)
        }
        console.groupEnd()

        console.log()
    }

    // // man-hours to Calendar Days
    // // computeManHourstoCalendarDays(args)

    // console.info('\ndisplay Report:')
    // console.log()
    console.group()
    if (args.display) {
        displayDeliverables(args)
    }
    console.groupEnd()

    console.groupEnd()
}