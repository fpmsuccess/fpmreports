const util = require('util')
// const fs = require('fs')

const { retrieveDatapoint } = require('../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../utilities/storeDatapoint')
const { rollupID } = require('./rollupID')
const { rollupIDMilestones } = require('./rollupIDMilestones')

function rollupIDs(args) {

    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')

    hierarchySourceFlat.idList.forEach((id) => {
        if (args.showInfo) {
            console.info(id['Deliverable Number'] + ' ' + id['Deliverable Name'])
            console.group()
        }
            
        // rollup the ID milestones by themselves
        rollupID(args)

        let idRollup = {}

        // keep track of the standard stuff for the ID
        idRollup['Deliverable Name'] = id['Deliverable Name']
        idRollup['Deliverable Number'] = id['Deliverable Number']

        // storage to accumulate TD rollup total into ID
        idRollup.totalHrs = { minManHrs: 0, expectedManHrs: 0, maxManHrs: 0 }
        idRollup.difficulty = { easy: 0, medium: 0, hard: 0 }
        idRollup.skill = { sdi: 0, sdii: 0, sdiii: 0 }
        idRollup.defaultEstimates = 0
        idRollup.tdCount = 0
        
        // rollup TDs associated with this ID
        tdList = hierarchySourceFlat.tdList.filter((td) => {
            return td['Parent Deliverable'] === id['Deliverable Number']
        })
        // console.info('filtered TD List:', tdList)

        tdList.forEach((td) => {
            // retrieve the TDxxxRollup datapoint
            const datapoint = td['Deliverable Number'] + 'Rollup'
            // console.info('datapoint:', datapoint)
            const tdRollup = retrieveDatapoint(args, datapoint)
            
            // add estimate to total
            idRollup.totalHrs.minManHrs += tdRollup.rollupTotal.min
            idRollup.totalHrs.expectedManHrs += tdRollup.rollupTotal.expected
            idRollup.totalHrs.maxManHrs += tdRollup.rollupTotal.max
            
            // inc difficulty level as appripriate
            tdRollup['Deliverable Difficulty Level'] === 'Easy'   ? idRollup.difficulty.easy++   : ''
            tdRollup['Deliverable Difficulty Level'] === 'Medium' ? idRollup.difficulty.medium++ : ''
            tdRollup['Deliverable Difficulty Level'] === 'Hard'   ? idRollup.difficulty.hard++   : ''
            
            // inc skill level as appropriate
            tdRollup['Recommended Skill Level'] === 'SD I'   ? idRollup.skill.sdi++   : ''
            tdRollup['Recommended Skill Level'] === 'SD II'  ? idRollup.skill.sdii++  : ''
            tdRollup['Recommended Skill Level'] === 'SD III' ? idRollup.skill.sdiii++ : ''

            // inc defaultEstimates as approprate
            tdRollup['Person Creating Estimate'] === 'TD Default Estimate' ? idRollup.defaultEstimates++ : ''

            // count up how many TDs for this ID
            idRollup.tdCount ++
        })

        if (args.showInfo) {
            console.info(idRollup)
            // console.info('idRollup:', util.inspect(idRollup, false, 1, true))
            console.groupEnd()
        }

        // store the datapoint
        storeDatapoint(args, idRollup, id['Deliverable Number'] + 'RollupTDs')
    })

}

module.exports.rollupIDs = rollupIDs