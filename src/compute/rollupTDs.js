const util = require('util')
// const fs = require('fs')

const { retrieveDatapoint } = require('../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../utilities/storeDatapoint')
const { rollupTDMilestones } = require('./rollupTDMilestones')

function rollupTDs(args) {

    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')

    hierarchySourceFlat.tdList.forEach((td) => {

        // retrieve the deliverable milestones to rollup
        tdMilestones = retrieveDatapoint(args, td['Deliverable Number'] + 'Milestones')
        // console.info('tdMilestones:', util.inspect(tdMilestones, false, 1, true))
        
        let tdRollup = {}
        tdRollup['Deliverable Name'] = tdMilestones['Deliverable Name']
        tdRollup['Deliverable Number'] = tdMilestones['Deliverable Number']
        tdRollup['Deliverable Difficulty Level'] = tdMilestones['Deliverable Difficulty Level']
        tdRollup['Recommended Skill Level'] = tdMilestones['Recommended Skill Level']
        tdRollup['Person Creating Estimate'] = tdMilestones['Person Creating Estimate']

        // rollup TD milestone totals and store datapoint
        tdRollup.rollupTotal = rollupTDMilestones(args, tdMilestones)

        console.group()
        if (args.showInfo) {
            console.info('tdRollup:', util.inspect(tdRollup, false, 1, true))
        }
        console.groupEnd()
            
        // store the datapoint
        storeDatapoint(args, tdRollup, td['Deliverable Number'] + 'Rollup')

    })

}

module.exports.rollupTDs = rollupTDs