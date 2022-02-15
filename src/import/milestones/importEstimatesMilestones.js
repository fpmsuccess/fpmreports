const chalk = require('chalk')

const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')
const { displayItem } = require('../../utilities/displayItem')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')
const { readMilestone } = require('./readMilestone.js')

function importEstimatesMilestones(args) {
    // console.info('\INFO: importEstimatesMilestones()')

    // open hierarchy source to get index to estimates (by deliverable)
    let hierarchySourceFlat = retrieveDatapoint(args, args.hierarchyName + 'Flat')
    if (hierarchySourceFlat === undefined) {
        args.stopAfterImport = true
        console.log(chalk.red('ERROR') + ': Not all datapoints have been successfully imported')
        return
    }

    // process TD milestone estimates
    hierarchySourceFlat.tdList.forEach((td) => {

        let data = []

        try {
            data = readMilestone(args, 'Estimate', td['Estimate Root Path'].trim(), td['Estimate File Name'].trim(), td['Estimate Tab'].trim())
        } catch (err) {
            args.stopAfterImport = true
            console.error(err)
        }
        
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

        try {
            data = readMilestone(args, 'Estimate', id['Estimate Root Path'].trim(), id['Estimate File Name'].trim(), id['Estimate Tab'].trim())
        } catch (err) {
            args.stopAfterImport = true
            console.error(err)
        }

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
        try {
            data = readMilestone(args, 'Estimate', pd['Estimate Root Path'].trim(), pd['Estimate File Name'].trim(), pd['Estimate Tab'].trim())
        } catch (err) {
            args.stopAfterImport = true
            console.error(err)
        }

        // if a default milestone set, correct 'Deliverable Name', 'Deliverable Number'
        data['Deliverable Name'] = pd['Deliverable Name']
        data['Deliverable Number'] = pd['Deliverable Number']
        data['Active'] = pd['Active']

        let datapointName = pd['Deliverable Number'] + 'Estimate'
        storeDatapoint(args, data, datapointName)
    }

}

module.exports.importEstimatesMilestones = importEstimatesMilestones