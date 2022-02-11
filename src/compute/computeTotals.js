const { retrieveDatapoint } = require('../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../utilities/storeDatapoint')
const { sumTDxxxForID } = require('./id/sumTDxxxForID')
const { sumIDxForPD } = require('./pd/sumIDxForPD')


function computeTotals(args) {
    
    // // compute TDxxx Total milestones
    // //  - TDxxxTotal = TDxxxSpecificTotal + null
    // //  - NOTE: TDxxxTotal = TDxxxSpecificTotal (no lower level rollup to compute)
    // console.info('\n... TDxxx Total = TDxxxSpecificTotal + null')
    // hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')
    // hierarchySourceFlat.tdList.forEach((deliverable) => {
    //     console.info(deliverable['Deliverable Number'], ':', deliverable['Deliverable Name'])
    //     deliverable = retrieveDatapoint(args, deliverable['Deliverable Number'] + 'SpecificTotal')
    //     storeDatapoint(args, deliverable, deliverable['Deliverable Number'] + 'Total')
    // })

    // sumTDxxxForId() and sumIDxForPd() need project hierarchy NOT projectFlat hierarchy!
    hierarchySource = retrieveDatapoint(args, args.hierarchyName)
    
    // compute IDx specific milestones
    //  - IDxTotal = IDxSpecificTotal + Σ[TDxxxTotal]
    console.info('\n... IDx Total = IDxSpecificTotal + Σ[TDxxxTotal')
    console.group()
        // REQUIRES ID to have form from project hierarchy not projectFlat hierarchy!
        //   - needs the TDs associated by ID, not all TDs in single list
        hierarchySource.idList.forEach((id) => {
            sumTDxxxForID(args, id)
        })
    console.groupEnd()


    // compute deliverable total (ID, PD)
    //  - PDTotal = PDSpecificTotal + Σ[IDxTotal]
    // console.info('\n... PD Specific (@ [difficulty, skill]) milestones')
    console.info('\n... PDx Total = PDxSpecificTotal + Σ[IDxxxTotal')
    console.group()
        // REQUIRES ID to have form from project hierarchy not projectFlat hierarchy!
        //   - needs the TDs associated by ID, not all TDs in single list
        sumIDxForPD(args, hierarchySource)
    console.groupEnd()
}

module.exports.computeTotals = computeTotals