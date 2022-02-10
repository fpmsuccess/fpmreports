const { retrieveDatapoint } = require("../../utilities/retrieveDatapoint")
const { tdDisplay } = require("./tdDisplay")

function displayTDs(args) {

    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')
    hierarchySourceFlat.tdList.forEach((td) => {

        // Display TD milestones 
        tdMilestones = retrieveDatapoint(args, td['Deliverable Number'] + 'Milestones')
        tdMilestonesTotal = retrieveDatapoint(args, td['Deliverable Number'] + 'Specific')
        tdDisplay(args, tdMilestonesTotal, tdMilestones)
    })
}

module.exports.displayTDs = displayTDs