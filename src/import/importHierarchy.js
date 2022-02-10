const { importHierarchySource } = require("./hierarchySource/importHierarchySource")
const { importDefaultMilestones } = require("./milestones/importDefaultMilestones")
const { importEstimatesMilestones } = require("./milestones/importEstimatesMilestones")
const { normalizeDeliverables } = require("./milestones/normalizeDeliverables")


function importHierarchy(args) {

    // import Hierarchy Source 
    //  => projectRaw (contents of project excel source)
    //  => project, projectFlat (transformed into object)
    importHierarchySource(args)
    
    // import DefaultMilestones 
    //  => TDDefaultMilestones, TDZeroMilestones, TDOneMilestones, TDTestMilestones
    //  => IDDefaultMilestones, IDZeroMilestones, IDTestMilestones
    importDefaultMilestones(args)
    
    // import any existing estimates and normalize them (merge missing milestones from defaults)
    //  => TDxxxEstimate
    //  => IDxEstimate
    //  => PDEstimate
    importEstimatesMilestones(args)

    // generate normalized milestones for TDxxx, IDx, PD
    //  => TDxxxMilestones
    //  => IDxMilestones
    //  => PDMilestones
    normalizeDeliverables(args)
}

module.exports.importHierarchy = importHierarchy