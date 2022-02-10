
const { retrieveDatapoint } = require('../utilities/retrieveDatapoint')
const { rollupTDxMilestones } = require('./rollupTDxMilestones')

function rollupTDs(args) {

    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')
    hierarchySourceFlat.tdList.forEach((td) => {

        // rollup TD milestone totals 
        tdMilestonesTotal = rollupTDxMilestones(args, td)

    })
}

module.exports.rollupTDs = rollupTDs