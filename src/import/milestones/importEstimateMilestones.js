const fs = require('fs')

const { readEstimateMilestones } = require('./readEstimateMilestones.js')
const { saveDatapoint } = require('../../utilities/saveDatapoint.js')

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
        //  - NOTE!: readEstimateMilestones() needs to be checked 
        //      to ensure applicable for ID estimates
        data = readEstimateMilestones(args, datapointName, 
            id['Estimate Root Path'], id['Estimate File Name'], id['Estimate Tab'])
        saveDatapoint(args, data, datapointName)
    })

    // process TD milestone estimates
    hierarchySourceFlat.tdList.forEach((td) => {
        let data = []
        let datapointName = td['Deliverable ID'] + 'Estimate'
        data = readEstimateMilestones(args, datapointName,
            td['Estimate Root Path'], td['Estimate File Name'], td['Estimate Tab'])
        saveDatapoint(args, data, datapointName)
    })


}

module.exports.importEstimateMilestones = importEstimateMilestones