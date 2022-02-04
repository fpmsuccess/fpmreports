const util = require('util')
const fs = require('fs')

const { readMilestone } = require('./readMilestone.js')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')
const { mergeDefaultEstimate } = require('./mergeDefaultEstimate.js')

function importEstimatesMilestones(args) {
    // console.info('\INFO: importEstimatesMilestones()')

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
    hierarchySourceFlat.idList.forEach((id) => {

        if (args.showInfoX) {
            console.info('process ID milestone estimates:', id['Full Deliverable Name'], id['Deliverable Number'])
        }

        let data = []
        let datapointName = id['Deliverable Number'] + 'Estimate'
        //  - NOTE!: readMilestones() needs to be checked 
        //      to ensure applicable for ID estimates
        data = readMilestone(args, datapointName, 
            id['Estimate Root Path'], id['Estimate File Name'], id['Estimate Tab'])

        // if a default milestone set, correct 'Deliverable Name', 'Deliverable Number'
        data['Deliverable Name'] = id['Deliverable Name']
        data['Deliverable Number'] = id['Deliverable Number']

        storeDatapoint(args, data, datapointName)
    })

    // process ID milestones estimate merged with defaults
    hierarchySourceFlat.idList.forEach((id) => {

        if (args.showInfoX) {
            console.info('ID milestone merged:', id['Full Deliverable Name'], id['Deliverable Number'])
        }

        let data = []
        let datapointName = id['Deliverable Number'] + 'Milestones'
        data = mergeDefaultEstimate(args, id)
        storeDatapoint(args, data, datapointName)
    })

    // process TD milestone estimates
    hierarchySourceFlat.tdList.forEach((td) => {
        
        if (args.showInfoX) {
            console.info('TD milestone estimates @ index:', td['Index'], td['Full Deliverable Name'], ':', td['Deliverable Name'], ':',  td['Deliverable Number'])
        }
        console.group()
        
        let data = []
        let datapointName = td['Deliverable Number'] + 'Estimate'
        data = readMilestone(args, datapointName,
            td['Estimate Root Path'], td['Estimate File Name'], td['Estimate Tab'])
        // console.info('\t2nd estimates:', td['Index'], '\t', td['Full Deliverable Name'], ':', td['Deliverable Name'], ':', td['Deliverable Number'])
        // console.info('\tdata:\t\t\t', data['Deliverable Name'], ':', data['Deliverable Number'])

        // if a default milestone set, correct 'Deliverable Name', 'Deliverable Number'
        data['Deliverable Name'] = td['Deliverable Name']
        data['Deliverable Number'] = td['Deliverable Number']
        // console.info('correct estimate: \n\tdata:', data['Deliverable Name'], ':',  data['Deliverable Number'], '\n\tdeliverable:', td['Deliverable Name'], ':', td['Deliverable Number'])

        storeDatapoint(args, data, datapointName)
        
        if (args.showTDxxxEstimate) {
            let target = args.showTDxxxEstimate
            if (target === td['Deliverable Number']) {
                // limit display to one TD
                console.info('TDxxx Estimate:', td['Full Deliverable Name'])
                console.group()
                console.info(util.inspect(data, false, null, true))
                console.groupEnd()
            } 
            if (typeof args.showTDxxxEstimate === 'boolean') {
                // display for all TDs
                console.info('TDxxx Estimate:', td['Full Deliverable Name'])
                console.group()
                console.info(util.inspect(data, false, null, true))
                console.groupEnd()
            }
        }

        console.groupEnd()
    })

    // process TD milestones estimate merged with defaults
    hierarchySourceFlat.tdList.forEach((td) => {
        
        let data = []
        let datapointName = td['Deliverable Number'] + 'Milestones'
        data = mergeDefaultEstimate(args, td)
        
        storeDatapoint(args, data, datapointName)
    })

}

module.exports.importEstimatesMilestones = importEstimatesMilestones