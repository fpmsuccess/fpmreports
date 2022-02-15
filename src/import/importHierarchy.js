const { importHierarchySource } = require("./hierarchySource/importHierarchySource")
const { importDefaultMilestones } = require("./milestones/importDefaultMilestones")
const { importEstimatesMilestones } = require("./milestones/importEstimatesMilestones")


function importHierarchy(args) {

    // import Hierarchy Source 
    //  => projectRaw (contents of project excel source)
    //  => project, projectFlat (transformed into object)
    console.info('\n... Sources (projectRaw, project, projectFlat)')
        importHierarchySource(args)
    // console.log()
    
    // import DefaultMilestones 
    //  => TDDefaultMilestones, TDZeroMilestones, TDOneMilestones, TDTestMilestones
    //  => IDDefaultMilestones, IDZeroMilestones, IDTestMilestones
    console.info('... Deliverable Default Milestones')
        importDefaultMilestones(args)
    // console.log()
    
    // import any existing estimates and normalize them (merge missing milestones from defaults)
    //  => TDxxxEstimate
    //  => IDxEstimate
    //  => PDEstimate
    console.info('... Deliverable Estimates')
        importEstimatesMilestones(args)
    // console.log()
}

module.exports.importHierarchy = importHierarchy