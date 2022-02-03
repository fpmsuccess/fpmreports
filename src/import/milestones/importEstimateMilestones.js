const fs = require('fs')

const { readEstimateMilestones } = require('./readEstimateMilestones.js')
const { saveMilestone } = require('./saveMilestone.js')

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
    // set the name of the path:file:tab to import
    // path = hierarchySourceFlat.productInfo['Estimate Root Path']
    // file = hierarchySourceFlat.productInfo['Estimate File Name']
    // tab = td['Estimate Tab']
    // let milestone = []
    // let name = td['Deliverable ID'] + 'Estimate'
    // milestone = readMilestones(args, name, path, file, tab)
    // saveMilestone(milestone, args.jsonRoot, name)
    
    // process ID milestone estimates
    hierarchySourceFlat.idList.forEach( (id) => {
        // set the name of the path:file:tab to import
        path = id['Estimate Root Path']
        file = id['Estimate File Name']
        tab  = id['Estimate Tab']
        let milestone = []
        let name = id['Deliverable ID'] + 'Estimate'
        milestone = readEstimateMilestones(args, name, path, file, tab)
        saveMilestone(milestone, args.jsonRoot, name)
    })

    // process TD milestone estimates
    hierarchySourceFlat.tdList.forEach((td) => {
        // set the name of the path:file:tab to import
        path = td['Estimate Root Path']
        file = td['Estimate File Name']
        tab = td['Estimate Tab']
        let milestone = []
        let name = td['Deliverable ID'] + 'Estimate'
        milestone = readEstimateMilestones(args, name, path, file, tab)
        saveMilestone(milestone, args.jsonRoot, name)
    })


}

module.exports.importEstimateMilestones = importEstimateMilestones