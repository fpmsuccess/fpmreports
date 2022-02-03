const util = require('util')

const { readMilestones } = require('./readMilestones.js')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')

// default milestones are located in the hierarchy source spreadsheet 
//  - TD defaults: located in 'TD Default Milestones' tab
//  - ID defaults: located in 'ID Default Milestones' tab
//  - PD defaults: located in 'PD Default Milestones' tab

function importDefaultMilestones(args) {

    // import Hierarchy Source
    let rawMilestone = []

    // import Default Milestones (one at a time)
    //  - needs to start with TD Default Milestones
    //  - needs to be expanded to repeat for ID Default Milestones
    //  - needs to be expanded to repeat for PD Default Milestones
    // 
    //  - needs to be expanded to repeat for TD Zero Milestones
    //  - needs to be expanded to repeat for ID Zero Milestones
    //  - needs to be expanded to repeat for PD Zero Milestones

    // set the name of the tab to import
    tabs = [
        args.tdDefaultMilestonesTab,
        args.idDefaultMilestonesTab,
        args.pdDefaultMilestonesTab,
        args.tdZeroMilestonesTab
    ]

    tabs.forEach( (tab) => {
        // read the hierarchy source from the excel files and store as datapoint
        try {
            rawMilestone = readMilestones(args, 'Default Milestones', args.fileRoot, args.hierarchySource, tab)
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