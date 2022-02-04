const util = require('util')
// const fs = require('fs')

const { retrieveDatapoint } = require('../utilities/retrieveDatapoint')
const { storeDatapoint } = require('../utilities/storeDatapoint')
const { rollupIDMilestones } = require('./rollupIDMilestones')

function rollupID(args) {

    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')

    hierarchySourceFlat.tdList.forEach((id) => {

        // retrieve the deliverable milestones to rollup
        idMilestones = retrieveDatapoint(args, id['Deliverable Number'] + 'Milestones')
        // console.info('idMilestones:', util.inspect(idMilestones, false, 1, true))

        let idRollup = {}
        idRollup['Deliverable Name'] = idMilestones['Deliverable Name']
        idRollup['Deliverable Number'] = idMilestones['Deliverable Number']
        idRollup['Deliverable Difficulty Level'] = idMilestones['Deliverable Difficulty Level']
        idRollup['Recommended Skill Level'] = idMilestones['Recommended Skill Level']
        idRollup['Person Creating Estimate'] = idMilestones['Person Creating Estimate']

        // rollup id milestone totals and store datapoint
        idRollup.rollupTotal = rollupIDMilestones(args, idMilestones)

        console.group()
        if (args.showInfoX) {
            console.info('idRollup:', util.inspect(idRollup, false, 1, true))
        }
        console.groupEnd()

        // store the datapoint
        storeDatapoint(args, idRollup, id['Deliverable Number'] + 'Rollup')

    })

}

module.exports.rollupID = rollupID