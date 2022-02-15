const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../../utilities/storeDatapoint')

function sumIDxForPD(args, pd) {
    // REQUIRES ID to have form from project hierarchy not projectFlat hierarchy!
    //   - needs the PD associated by ID, not all IDs in single list

    console.info(pd.info['Deliverable Number'], '-', pd.info['Deliverable Name'])

    // initialize a new pdTotal for this id
    let pdTotal = {
        // keep track of the standard stuff for the ID
        'Deliverable Name': pd.info['Deliverable Name'],
        'Deliverable Number': pd.info['Deliverable Number'],
        'total': {'min': 0,'expected': 0,'max': 0},
        'difficulty': {'easy': 0,'medium': 0,'hard': 0},
        'skill': { 'sdi': 0, 'sdii': 0, 'sdiii': 0 },
        'tdDefaultEstimates': 0,
        'idDefaultEstimates': 0,
        'pdDefaultEstimates': 0,
        'tdCount': 0,
        'idCount': 0,
        'pdCount': 0
    }

    // add in the individual TD SpecificTotal amounts
    pd.idList.forEach((id) => {
        // retrieve the TDxxxSpecific datapoint
        const idSpecificTotal = retrieveDatapoint(args, id['Deliverable Number'] + 'Total')

        // // add TD Milestones Total to ID total
        pdTotal.total.min += idSpecificTotal.total.min
        pdTotal.total.expected += idSpecificTotal.total.expected
        pdTotal.total.max += idSpecificTotal.total.max

        // // inc difficulty level as appripriate
        pdTotal.difficulty.easy += idSpecificTotal.difficulty.easy++
        pdTotal.difficulty.medium += idSpecificTotal.difficulty.medium++
        pdTotal.difficulty.hard += idSpecificTotal.difficulty.hard++

        // // inc skill level as appropriate
        pdTotal.skill.sdi += idSpecificTotal.skill.sdi
        pdTotal.skill.sdii += idSpecificTotal.skill.sdii
        pdTotal.skill.sdiii += idSpecificTotal.skill.sdiii
        
        // // inc defaultEstimates as approprate
        pdTotal.tdDefaultEstimates += idSpecificTotal.tdDefaultEstimates
        pdTotal.idDefaultEstimates += idSpecificTotal.idDefaultEstimates

        // count up how many deliverables for this ID
        pdTotal.tdCount += idSpecificTotal.tdCount
        pdTotal.idCount += idSpecificTotal.idCount
    })

    // add in the PD specific total amounts
    {
        const datapoint = pd.info['Deliverable Number'] + 'SpecificTotal'
        const pdSpecificTotal = retrieveDatapoint(args, datapoint)

        // // add TD Milestones Total to ID total
        pdTotal.total.min += pdSpecificTotal.total.min
        pdTotal.total.expected += pdSpecificTotal.total.expected
        pdTotal.total.max += pdSpecificTotal.total.max

        // // inc difficulty level as appripriate
        if (pdSpecificTotal['Deliverable Difficulty Level'] === 'Easy') pdTotal.difficulty.easy++
        if (pdSpecificTotal['Deliverable Difficulty Level'] === 'Medium') pdTotal.difficulty.medium++
        if (pdSpecificTotal['Deliverable Difficulty Level'] === 'Hard') pdTotal.difficulty.hard++

        // // inc skill level as appropriate
        if (pdSpecificTotal['Recommended Skill Level'] === 'SD I') pdTotal.skill.sdi++
        if (pdSpecificTotal['Recommended Skill Level'] === 'SD II') pdTotal.skill.sdii++
        if (pdSpecificTotal['Recommended Skill Level'] === 'SD III') pdTotal.skill.sdiii++

        // // inc defaultEstimates as approprate
        if (pdSpecificTotal['Person Creating Estimate'] === 'PD Default Estimate') pdTotal.pdDefaultEstimates++
        if (pdSpecificTotal['Person Creating Estimate'] === 'PD Default Milestones') pdTotal.pdDefaultEstimates++

        // count up how many TDs for this ID
        pdTotal.pdCount++
    }

    // store off the datapoint
    storeDatapoint(args, pdTotal, pd.info['Deliverable Number'] + 'Total')
}

module.exports.sumIDxForPD = sumIDxForPD