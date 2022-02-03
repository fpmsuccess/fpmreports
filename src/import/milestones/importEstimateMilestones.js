const fs = require('fs')

const { readMilestone } = require('./readMilestone.js')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')

function importEstimateMilestones(args) {
    // console.info('\INFO: importEstimateMilestones()')

    // open hierarchy source to get index to estimates (by deliverable)
    // import milestones for each extimate
    // store to database

    // start with Hierarchy Source
    // let hierarchySource = {}
    dbLocation = args.jsonRoot + args.hierarchyName + 'Flat' + '.json'
    // console.info('dbLocation:', dbLocation)
    const flatJson = fs.readFileSync(dbLocation, { encoding: 'utf8', flag: 'r' })
    hierarchySourceFlat = JSON.parse(flatJson)
    // console.info(hierarchySourceFlat)

    // process PD milestone estimates
    //  - TBD
    
    // process ID milestone estimates
    hierarchySourceFlat.idList.forEach( (id) => {
        let data = []
        let datapointName = id['Deliverable ID'] + 'Estimate'
        //  - NOTE!: readMilestones() needs to be checked 
        //      to ensure applicable for ID estimates
        data = readMilestone(args, datapointName, 
            id['Estimate Root Path'], id['Estimate File Name'], id['Estimate Tab'])
        storeDatapoint(args, data, datapointName)
    })

    // process TD milestone estimates
    hierarchySourceFlat.tdList.forEach((td) => {
        let data = []
        let datapointName = td['Deliverable ID'] + 'Estimate'
        data = readMilestone(args, datapointName,
            td['Estimate Root Path'], td['Estimate File Name'], td['Estimate Tab'])
        storeDatapoint(args, data, datapointName)
    })


}

module.exports.importEstimateMilestones = importEstimateMilestones