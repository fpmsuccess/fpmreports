
const { displayItem } = require('../utilities/displayItem')
const { retrieveDatapoint } = require('../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../utilities/storeDatapoint')

function rollupIDxTDsTotal(args, id) {

    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')

    let idTDsTotal = {}

    // keep track of the standard stuff for the ID
    idTDsTotal['Deliverable Name'] = id['Deliverable Name']
    idTDsTotal['Deliverable Number'] = id['Deliverable Number']

    // storage to accumulate TD rollup total into ID
    idTDsTotal.totalHrs = { minManHrs: 0, expectedManHrs: 0, maxManHrs: 0 }
    idTDsTotal.difficulty = { easy: 0, medium: 0, hard: 0 }
    idTDsTotal.skill = { sdi: 0, sdii: 0, sdiii: 0 }
    idTDsTotal.defaultEstimates = 0
    idTDsTotal.tdCount = 0
    
    // rollup TDs associated with this ID
    tdList = hierarchySourceFlat.tdList.filter((td) => {
        return td['Parent Deliverable'] === id['Deliverable Number']
    })
    // console.info('filtered TD List:', tdList)

    tdList.forEach((td) => {

        // retrieve the TDxxxSpecific datapoint
        const datapoint = td['Deliverable Number'] + 'Specific'
        const tdMilestonesTotal = retrieveDatapoint(args, datapoint)
        
        // // add TD Milestones Total to ID total
        idTDsTotal.totalHrs.minManHrs += tdMilestonesTotal.total.min
        idTDsTotal.totalHrs.expectedManHrs += tdMilestonesTotal.total.expected
        idTDsTotal.totalHrs.maxManHrs += tdMilestonesTotal.total.max
        
        // // inc difficulty level as appripriate
        tdMilestonesTotal['Deliverable Difficulty Level'] === 'Easy'   ? idTDsTotal.difficulty.easy++   : ''
        tdMilestonesTotal['Deliverable Difficulty Level'] === 'Medium' ? idTDsTotal.difficulty.medium++ : ''
        tdMilestonesTotal['Deliverable Difficulty Level'] === 'Hard'   ? idTDsTotal.difficulty.hard++   : ''
        
        // // inc skill level as appropriate
        tdMilestonesTotal['Recommended Skill Level'] === 'SD I'   ? idTDsTotal.skill.sdi++   : ''
        tdMilestonesTotal['Recommended Skill Level'] === 'SD II'  ? idTDsTotal.skill.sdii++  : ''
        tdMilestonesTotal['Recommended Skill Level'] === 'SD III' ? idTDsTotal.skill.sdiii++ : ''

        // // inc defaultEstimates as approprate
        tdMilestonesTotal['Person Creating Estimate'] === 'TD Default Estimate' ? idTDsTotal.defaultEstimates++ : ''

        // count up how many TDs for this ID
        idTDsTotal.tdCount ++
    })

    // store the datapoint
    storeDatapoint(args, idTDsTotal, id['Deliverable Number'] + 'TDsTotal')

    // display if cli args indicate to do so
    displayItem(args, 'showIDxTDsTotal', idTDsTotal)

    return idTDsTotal
}

module.exports.rollupIDxTDsTotal = rollupIDxTDsTotal