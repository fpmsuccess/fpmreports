const { retrieveDatapoint } = require("../utilities/retrieveDatapoint")
const { addupIDxMilestones } = require("./id/addupIDxMilestones")
const { addupPDMilestones } = require("./pd/addupPDMilestones")
const { addupTDxxxMilestones } = require("./td/addupTDxxxMilestones")


// for each deliverable (TD, ID, PD) compute the summ of the milestones @[difficulty:skill]
function computeSpecificRollup(args) {

    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')

    // compute TDxxx Total
    //  - TDxxxSpecificTotal + null => TDxxxTotal 
    console.info('\n... TDxxx Specific Total (@ [difficulty, skill]) milestones')
    console.group()
    hierarchySourceFlat.tdList.forEach((deliverable) => {
        console.info(deliverable['Deliverable Number'], '-', deliverable['Deliverable Name'])
        addupTDxxxMilestones(args, deliverable)
    })
    console.groupEnd()

    // compute TDxxx Total
    //  - IDxSpecificTotal + IDxTDsRollup => IDxTotal
    console.info('\n... IDx Specific Total (@ [difficulty, skill]) milestones')
    console.group()
    hierarchySourceFlat.idList.forEach((deliverable) => {
        console.info(deliverable['Deliverable Number'], '-', deliverable['Deliverable Name'])
        addupIDxMilestones(args, deliverable)
    })
    console.groupEnd()

    // compute PD Total
    //  - PDSpecificTotal + PDIDsRollup => PDTotal
    console.info('\n... PD Specific Total (@ [difficulty, skill]) milestones')
    console.group()
    {
        deliverable = hierarchySourceFlat.productInfo
        console.info(deliverable['Deliverable Number'], '-', deliverable['Deliverable Name'])
        addupPDMilestones(args, deliverable)
    }
    console.groupEnd()
    

}

module.exports.computeSpecificRollup = computeSpecificRollup