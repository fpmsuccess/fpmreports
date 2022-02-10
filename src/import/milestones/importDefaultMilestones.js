const util = require('util')

const { readMilestone } = require('./readMilestone.js')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')

function importDefaultMilestones(args) {

    // import Hierarchy Source
    let rawMilestone = []

    // import Default Milestones (one at a time)
    //  - needs to be expanded to repeat for ID Zero Milestones
    //  - needs to be expanded to repeat for PD Zero Milestones
    tabs = [
        args.tdDefaultMilestonesTab,
        'TD Zero Milestones',   // because we might use it via project.xlsx
        'TD One Milestones',    // because we might use it via project.xlsx
        'TD Test Milestones',   // because we might use it via project.xlsx
        args.idDefaultMilestonesTab,
        'ID Zero Milestones',   // because we might use it via project.xlsx
        'ID Test Milestones',   // because we might use it via project.xlsx
        args.pdDefaultMilestonesTab,
    ]

    // // display output iff 
    // //      (args.showImports is set and typeof showImports === boolean)
    // //   or
    // //      (args.showImports is set and showImports === tab)
    // //   or
    // //      (args.showImports is set and showImports starts with [IDx or TDxxx])
    // if (
    //     (args.showImports && (typeof showImports === 'boolean' || tabs.indexOf(args.showImports) !== -1 ))       // || (args.showImports && args.showImports.match(/TD[1-9][0-1][0-9]/))
    //     // || (args.showImports.match(/(ID[1-9])/))
    // ) {
    // // if (args.showImports && (tabs.indexOf(args.showImports) !== -1 || typeof args.showImports == 'boolean')) {
    //     console.info('Import Default Milestones')
    //     console.group()
    // }

    tabs.forEach( (tab) => {
        // read the hierarchy source from the excel files and store as datapoint
        try {
            if (args.showImports && (args.showImports === tab || typeof args.showImports === 'boolean')) {
                console.info(tab, '(', args.hierarchySource, ':', tab, ')')
                console.group()
            }
            rawMilestone = readMilestone(args, 'Default', args.fileRoot, args.hierarchySource, tab)

            let datapointName = tab.split(' ').join('')
            storeDatapoint(args, rawMilestone, datapointName)
            if (args.showImports && (args.showImports === tab || typeof args.showImports === 'boolean')) {
                console.groupEnd()
            }
        } catch (err) {
            if (args.showImports && (args.showImports === tab || typeof args.showImports === 'boolean')) {
                console.groupEnd()
            }
            throw err
        }
    })

    // // if (args.showImports && (args.showImports === tab || typeof args.showImports === 'boolean')) {
    // // if (typeof args.showImports !== 'undefined') {
    // if (args.showImports && (typeof showImports === 'boolean' || tabs.indexOf(args.showImports) !== -1)) {
    //     console.groupEnd()
    //     console.info()
    // }
}

module.exports.importDefaultMilestones = importDefaultMilestones