const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../../utilities/storeDatapoint')

function sumTDxxxForID(args, id) {
    // REQUIRES ID to have form from project hierarchy not projectFlat hierarchy!
    //   - needs the TDs associated by ID, not all TDs in single list

    console.info(id['Deliverable Number'], '-', id['Deliverable Name'])

    // initialize a new idTotal for this id
    let idTotal = {
        // keep track of the standard stuff for the ID
        'Deliverable Name': id['Deliverable Name'],
        'Deliverable Number': id['Deliverable Number'],
        'total': {'min': 0,'expected': 0,'max': 0},
        'difficulty': {'easy': 0,'medium': 0,'hard': 0},
        'skill': {'sdi': 0,'sdii': 0,'sdiii': 0},
        'tdDefaultEstimates': 0,
        'idDefaultEstimates': 0,
        'tdCount': 0,
        'idCount': 0
    }

    // add in the individual TD SpecificTotal amounts
    id.tdList.forEach((td) => {
        // retrieve the TDxxxSpecific datapoint
        const datapoint = td['Deliverable Number'] + 'SpecificTotal'
        const tdSpecificTotal = retrieveDatapoint(args, datapoint)

        // // add TD Milestones Total to ID total
        idTotal.total.min += tdSpecificTotal.total.min
        idTotal.total.expected += tdSpecificTotal.total.expected
        idTotal.total.max += tdSpecificTotal.total.max

        // // inc difficulty level as appripriate
        if (tdSpecificTotal['Deliverable Difficulty Level'] === 'Easy') idTotal.difficulty.easy++
        if (tdSpecificTotal['Deliverable Difficulty Level'] === 'Medium') idTotal.difficulty.medium++
        if (tdSpecificTotal['Deliverable Difficulty Level'] === 'Hard') idTotal.difficulty.hard++

        // // inc skill level as appropriate
        if (tdSpecificTotal['Recommended Skill Level'] === 'SD I') idTotal.skill.sdi++
        if (tdSpecificTotal['Recommended Skill Level'] === 'SD II') idTotal.skill.sdii++
        if (tdSpecificTotal['Recommended Skill Level'] === 'SD III') idTotal.skill.sdiii++

        // // inc defaultEstimates as approprate
        if (tdSpecificTotal['Person Creating Estimate'] === 'TD Default Estimate') idTotal.tdDefaultEstimates++
        if (tdSpecificTotal['Person Creating Estimate'] === 'TD Default Milestones') idTotal.tdDefaultEstimates++
        if (tdSpecificTotal['Person Creating Estimate'] === 'TD Zero Milestones') idTotal.tdDefaultEstimates++
        if (tdSpecificTotal['Person Creating Estimate'] === 'TD One Milestones') idTotal.tdDefaultEstimates++
        if (tdSpecificTotal['Person Creating Estimate'] === 'TD Test Milestones') idTotal.tdDefaultEstimates++

        // count up how many TDs for this ID
        idTotal.tdCount++
    })

    // add in the ID specific total amounts
    {
        const datapoint = id['Deliverable Number'] + 'SpecificTotal'
        const idSpecificTotal = retrieveDatapoint(args, datapoint)

        // // add TD Milestones Total to ID total
        idTotal.total.min += idSpecificTotal.total.min
        idTotal.total.expected += idSpecificTotal.total.expected
        idTotal.total.max += idSpecificTotal.total.max

        // // inc difficulty level as appripriate
        if (idSpecificTotal['Deliverable Difficulty Level'] === 'Easy') idTotal.difficulty.easy++
        if (idSpecificTotal['Deliverable Difficulty Level'] === 'Medium') idTotal.difficulty.medium++
        if (idSpecificTotal['Deliverable Difficulty Level'] === 'Hard') idTotal.difficulty.hard++

        // // inc skill level as appropriate
        if (idSpecificTotal['Recommended Skill Level'] === 'SD I') idTotal.skill.sdi++
        if (idSpecificTotal['Recommended Skill Level'] === 'SD II') idTotal.skill.sdii++
        if (idSpecificTotal['Recommended Skill Level'] === 'SD III') idTotal.skill.sdiii++

        // // inc defaultEstimates as approprate
        if (idSpecificTotal['Person Creating Estimate'] === 'ID Default Estimate') idTotal.idDefaultEstimates++
        if (idSpecificTotal['Person Creating Estimate'] === 'ID Default Milestones') idTotal.idDefaultEstimates++
        if (idSpecificTotal['Person Creating Estimate'] === 'ID Zero Milestones') idTotal.idDefaultEstimates++
        if (idSpecificTotal['Person Creating Estimate'] === 'ID Test Milestones') idTotal.idDefaultEstimates++

        // count up how many TDs for this ID
        idTotal.idCount++
    }

    // store off the datapoint
    storeDatapoint(args, idTotal, id['Deliverable Number'] + 'Total')
}

module.exports.sumTDxxxForID = sumTDxxxForID