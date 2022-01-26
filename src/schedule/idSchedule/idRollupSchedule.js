const util = require('util')
const merge = require('lodash.merge')

// const { readEstTDSchedule } = require('../../import/tdImport/readEstTDSchedule.js')
const { calculateIDScheduleTotal } = require('./calculateIDScheduleTotal.js')

// idRollupSchedule()
//      walk the deliverables for each id
//          -> sum TDSchedules for each td
//          -> write ID Schedule Total

function idRollupSchedule(deliverables) {

    deliverables.idList.forEach((id) => {

        // process each TD attached to this ID
        id
        idList.forEach((id) => {
            // console.info('forEach(id):', id)
            id['ID Schedule Total'] = calculateIDScheduleTotal(id)
            // console.info('id[ID Schedule Total]:', util.inspect(id['ID Schedule Total'], false, null, true))
        })
        // console.groupEnd()
    })

    return deliverables
}

module.exports.idRollupSchedule = idRollupSchedule