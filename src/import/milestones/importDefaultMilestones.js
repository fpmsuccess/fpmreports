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
        args.idDefaultMilestonesTab,
        args.pdDefaultMilestonesTab,
        args.tdZeroMilestonesTab
    ]

    tabs.forEach( (tab) => {
        // read the hierarchy source from the excel files and store as datapoint
        try {
            rawMilestone = readMilestone(args, 'Default Milestones', args.fileRoot, args.hierarchySource, tab)
        } catch (err) {
            throw err
        }
        try {
            // strip out the spaces in the tab name
            let datapointName = tab.split(' ').join('')
            storeDatapoint(args, rawMilestone, datapointName)
        } catch (err) {
            throw err
        }
    })
}

module.exports.importDefaultMilestones = importDefaultMilestones