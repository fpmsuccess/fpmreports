const util = require('util')

// import from data sources
const { readMilestones } = require('./readMilestones.js')
const { saveMilestone } = require('./saveMilestone.js')
// const { xformMilestoneSource } = require('./xformMilestoneSource.js')
const { xformMilestoneSourceFlat } = require('./xformMilestoneSourceFlat.js')

// default milestones are located in the hierarchy source spreadsheet 
//  - TD defaults: located in 'TD Default Milestones' tab
//  - ID defaults: located in 'ID Default Milestones' tab
//  - PD defaults: located in 'PD Default Milestones' tab

function importMilestones(args) {

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
        // read the hierarchy source from the excel files
        try {
            rawMilestone = readMilestones(args.fileRoot, args.hierarchySource, tab)
            // console.info(rawMilestone) 
        } catch (err) {
            throw err
        }
        // console.info('rawMilestone:', util.inspect(rawMilestone, false, null, true))
        try {
            let saveFile = tab.split(' ').join('') + 'Raw'
            saveMilestone(rawMilestone, args.jsonRoot, saveFile)
        } catch (err) {
            throw err
        }
    })
}

module.exports.importMilestones = importMilestones