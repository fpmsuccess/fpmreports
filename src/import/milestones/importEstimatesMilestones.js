const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { displayItem } = require('../../utilities/displayItem')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')
const { readMilestone } = require('./readMilestone.js')

function importEstimatesMilestones(args) {
    // console.info('\INFO: importEstimatesMilestones()')

    // open hierarchy source to get index to estimates (by deliverable)
    hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')

    // process TD milestone estimates
    hierarchySourceFlat.tdList.forEach((td) => {

        let data = []

        data = readMilestone(args, 'Estimate', td['Estimate Root Path'], td['Estimate File Name'], td['Estimate Tab'])
        
        // if a default milestone set, correct 'Deliverable Name', 'Deliverable Number'
        data['Deliverable Name'] = td['Deliverable Name']
        data['Deliverable Number'] = td['Deliverable Number']
        data['Active'] = td['Active']
        data['Parent Deliverable'] = td['Parent Deliverable']
        data['Estimate Root Path'] = td['Estimate Root Path']
        data['Estimate File Name'] = td['Estimate File Name']
        data['Estimate Tab'] = td['Estimate Tab']
        
        let datapointName = td['Deliverable Number'] + 'Estimate'
        storeDatapoint(args, data, datapointName)
    })
    
    // process id milestone estimates
    hierarchySourceFlat.idList.forEach((id) => {

        let data = []

        data = readMilestone(args, 'Estimate', id['Estimate Root Path'], id['Estimate File Name'], id['Estimate Tab'])

        // if a default milestone set, correct 'Deliverable Name', 'Deliverable Number'
        data['Deliverable Name'] = id['Deliverable Name']
        data['Deliverable Number'] = id['Deliverable Number']
        data['Active'] = id['Active']
        data['Parent Deliverable'] = id['Parent Deliverable']
        data['Estimate Root Path'] = id['Estimate Root Path']
        data['Estimate File Name'] = id['Estimate File Name']
        data['Estimate Tab'] = id['Estimate Tab']

        let datapointName = id['Deliverable Number'] + 'Estimate'
        storeDatapoint(args, data, datapointName)
    })

    // process PD milestone estimates
    {
        const pd = hierarchySourceFlat.productInfo

        let data = []

        //  - NOTE!: readMilestones() needs to be checked 
        //      to ensure applicable for pd estimates
        data = readMilestone(args, 'Estimate', pd['Estimate Root Path'], pd['Estimate File Name'], pd['Estimate Tab'])

        // if a default milestone set, correct 'Deliverable Name', 'Deliverable Number'
        data['Deliverable Name'] = pd['Deliverable Name']
        data['Deliverable Number'] = pd['Deliverable Number']
        data['Active'] = pd['Active']

        let datapointName = pd['Deliverable Number'] + 'Estimate'
        storeDatapoint(args, data, datapointName)
    }

}

module.exports.importEstimatesMilestones = importEstimatesMilestones