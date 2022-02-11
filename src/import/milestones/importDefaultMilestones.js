const util = require('util')

const { readMilestone } = require('./readMilestone.js')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')

function importDefaultMilestones(args) {

    // import Hierarchy Source
    let project = []

    // import Default Milestones (one at a time)
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

    tabs.forEach( (tab) => {
        // read the hierarchy source from the excel files and store as datapoint
        try {
            if (args.showImports && (args.showImports === tab || typeof args.showImports === 'boolean')) {
                console.info(tab, '(', args.hierarchySource, ':', tab, ')')
                console.group()
            }
            project = readMilestone(args, 'Default', args.fileRoot, args.hierarchySource, tab)

            // NOTE: assumes the tab name doesn't have a conflict with other datapoints!
            let datapointName = tab.split(' ').join('')
            storeDatapoint(args, project, datapointName)
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
}

module.exports.importDefaultMilestones = importDefaultMilestones