const fs = require('fs')

const { displayItem } = require('../../utilities/displayItem')
const { readMilestone } = require('./readMilestone.js')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')

function importEstimatesMilestones(args) {
    // console.info('\INFO: importEstimatesMilestones()')

    // open hierarchy source to get index to estimates (by deliverable)
    const dbLocation = args.jsonRoot + args.hierarchyName + 'Flat' + '.json'
    const flatJson = fs.readFileSync(dbLocation, { encoding: 'utf8', flag: 'r' })
    const hierarchySourceFlat = JSON.parse(flatJson)

    
    // // display output iff 
    // //      (args.showImports is set and typeof showImports === boolean)    //   or
    // //      (args.showImports is set and showImports starts with [PD, IDx, or TDxxx])
    // if (
    //     (args.showImports && typeof showImports === 'boolean')
    //     || (args.showImports && tabs.indexOf(args.showImports) !== -1 )
    //     // || (args.showImports && args.showImports.match(/TD[1-9][0-1][0-9]/))
    //     // || (args.showImports.match(/(pd[1-9])/))
    // ) {
    //     console.info('Import Estimate Milestones')
    //     console.group()
    // }

    // process TD milestone estimates
    hierarchySourceFlat.tdList.forEach((td) => {

        let data = []
        let datapointName = td['Deliverable Number'] + 'Estimate'

        // if (args.showImports && (args.showImports == td['Deliverable Number'] || typeof args.showImports == 'boolean')) {
        //     console.info(td['Deliverable Number'], td['Deliverable Name'], '(', td['Estimate File Name'], ':', td['Estimate Tab'], ')')
        //     console.group()
        // }

        data = readMilestone(args, 'Estimate', td['Estimate Root Path'], td['Estimate File Name'], td['Estimate Tab'])
        
        // if a default milestone set, correct 'Deliverable Name', 'Deliverable Number'
        data['Deliverable Name'] = td['Deliverable Name']
        data['Deliverable Number'] = td['Deliverable Number']
        data['Active'] = td['Active']
        data['Parent Deliverable'] = td['Parent Deliverable']
        data['Estimate Root Path'] = td['Estimate Root Path']
        data['Estimate File Name'] = td['Estimate File Name']
        data['Estimate Tab'] = td['Estimate Tab']
        
        storeDatapoint(args, data, datapointName)

        // if (args.showImports && (args.showImports == td['Deliverable Number'] || typeof args.showImports == 'boolean')) {
        //     console.groupEnd()
        // }

        // display if cli args indicate to do so
        displayItem(args, 'showTDxxxEstimate', data)

    })
    
    // process id milestone estimates
    hierarchySourceFlat.idList.forEach((id) => {

        let data = []
        let datapointName = id['Deliverable Number'] + 'Estimate'

        // if (args.showImports && (args.showImports == id['Deliverable Number'] || typeof args.showImports == 'boolean')) {
        //     console.info('Estimate:', id['Deliverable Number'], id['Deliverable Name'], '(', id['Estimate File Name'], ':', id['Estimate Tab'], ')')
        //     console.group()
        // }
        
        //  - NOTE!: readMilestones() needs to be checked 
        //      to ensure applicable for id estimates
        data = readMilestone(args, 'Estimate', id['Estimate Root Path'], id['Estimate File Name'], id['Estimate Tab'])

        // if (args.showImports && (args.showImports == id['Deliverable Number'] || typeof args.showImports == 'boolean')) {
        //     console.groupEnd('Estimate:', id['Deliverable Number'], id['Deliverable Name'])
        // }

        // if a default milestone set, correct 'Deliverable Name', 'Deliverable Number'
        data['Deliverable Name'] = id['Deliverable Name']
        data['Deliverable Number'] = id['Deliverable Number']
        data['Active'] = id['Active']
        data['Parent Deliverable'] = id['Parent Deliverable']
        data['Estimate Root Path'] = id['Estimate Root Path']
        data['Estimate File Name'] = id['Estimate File Name']
        data['Estimate Tab'] = id['Estimate Tab']

        storeDatapoint(args, data, datapointName)

        // display if cli args indicate to do so
        displayItem(args, 'showidxEstimate', data)

    })

    // process PD milestone estimates
    {
        const pd = hierarchySourceFlat.productInfo

        let data = []
        let datapointName = pd['Deliverable Number'] + 'Estimate'

        // if (args.showImports && (args.showImports == pd['Deliverable Number'] || typeof args.showImports == 'boolean')) {
        //     console.info('Estimate:', pd['Deliverable Number'], pd['Deliverable Name'], '(', pd['Estimate File Name'], ':', pd['Estimate Tab'], ')')
        //     console.group()
        // }

        //  - NOTE!: readMilestones() needs to be checked 
        //      to ensure applicable for pd estimates
        data = readMilestone(args, 'Estimate', pd['Estimate Root Path'], pd['Estimate File Name'], pd['Estimate Tab'])

        // if (args.showImports && (args.showImports == pd['Deliverable Number'] || typeof args.showImports == 'boolean')) {
        //     console.groupEnd('Estimate:', pd['Deliverable Number'], pd['Deliverable Name'])
        // }

        // if a default milestone set, correct 'Deliverable Name', 'Deliverable Number'
        data['Deliverable Name'] = pd['Deliverable Name']
        data['Deliverable Number'] = pd['Deliverable Number']
        data['Active'] = pd['Active']

        storeDatapoint(args, data, datapointName)

        // display if cli args indicate to do so
        displayItem(args, 'showPDEstimate', data)

    }

}

module.exports.importEstimatesMilestones = importEstimatesMilestones