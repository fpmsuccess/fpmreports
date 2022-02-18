const chalk = require('chalk')

const { retrieveDatapoint } = require("../utilities/retrieveDatapoint")
const { displayDeliverableMilestones } = require("./displayDeliverableMilestones")
const { displayTDSummary } = require('./displayTD/displayTDSummary')
const { displayIDIntegrationTotal } = require("./displayID/displayIDIntegrationTotal")
const { displayIDSummary } = require("./displayID/displayIDSummary")
const { displayPDIntegrationTotal } = require("./displayPD/displayPDIntegrationTotal")
const { displayPDSummary } = require("./displayPD/displayPDSummary")

function displayDeliverables(args) {

    let filter = '' + args.show

    // showTDxxxMilestones

    // show=Report: PD Total incl. PDx Specific Total and IDx Total
    if ((typeof args.show !== 'boolean' && args.show && filter === 'Report') || typeof args.show === 'boolean'
    ) {
        
        // retrieve PD header and PD Total
        //  - best to use project as source for this one
        //  - total access to all IDx with sub TDxxx from one list
        const project = retrieveDatapoint(args, args.hierarchyName)
        const pd = project.info
        const pdTotal = retrieveDatapoint(args, pd['Deliverable Number'] + 'Total')

        // display PD header
        console.log(chalk.cyan(pd['Deliverable Number'] + ' - ' + pd['Deliverable Name']))
        console.log()
        console.group()

        // PD summary total
        displayPDSummary(args, pdTotal)
        console.log()

        // display PD Integration effort
        displayPDIntegrationTotal(args, pd)

        console.groupEnd

        // close PD Summary w/ blank line
        console.log()

        // const milestones = retrieveDatapoint(args, pd['Deliverable Number'] + 'Milestones')
        // console.group()
        // displayDeliverableMilestones(args, milestones)
        // console.groupEnd()
        // console.log()
        
        project.idList.forEach(id => {
            // ID header
            console.log(chalk.cyan(id['Deliverable Number'] + ' - ' + id['Deliverable Name']))
            console.log()
            console.group()

            // ID summary total
            const idTotal = retrieveDatapoint(args, id['Deliverable Number'] + 'Total')
            displayIDSummary(args, idTotal)
            console.log()

            // PD Integration effort
            displayIDIntegrationTotal(args, id)
            console.log()

            console.group()
            id.tdList.forEach(td => {
                displayTDSummary(args, td)
            })
            console.groupEnd()

            // close w/ blank line
            console.log()
            console.groupEnd()
        })
    }

    // show only single TDxxx Milestones
    if (typeof args.show !== 'boolean' && args.show && filter.match(/TD[1-9][0-9][0-9]Milestones/)) {
        // best directly retrieve TDxxxMilestones datapoint
        const milestones = retrieveDatapoint(args, filter)
        displayTDSummary(args, milestones)
        displayDeliverableMilestones(args, milestones)
    }

    // show only single IDx Milestones
    if (typeof args.show !== 'boolean' && args.show && filter.match(/ID[1-9]Milestones/)) {
        // best directly retrieve TDxxxMilestones datapoint
        const milestones = retrieveDatapoint(args, filter)
        displayIDIntegrationTotal(args, milestones)
        // displayDeliverableMilestones(args, milestones)
    }

    // show only single PD Milestones
    if (typeof args.show !== 'boolean' && args.show && filter === 'PDMilestones') {
        // best directly retrieve TDxxxMilestones datapoint
        const milestones = retrieveDatapoint(args, filter)
        displayPDIntegrationTotal(args, milestones)
        displayDeliverableMilestones(args, milestones)
    }

    // show only single TDxxx Specific Total
    if (typeof args.show !== 'boolean' && args.show && filter.match(/TD[1-9][0-9][0-9]/)) {
        // best to use projectFlat as source for this one - access to all TDxxx from one list
        const project = retrieveDatapoint(args, args.hierarchyName + 'Flat')
        project.tdList.forEach(td => { 
            if (td['Deliverable Number'] === filter) {
                displayTDSummary(args, td)
                const milestones = retrieveDatapoint(args, td['Deliverable Number'] + 'Milestones')
                displayDeliverableMilestones(args, milestones)
            }
        })
    }

    // show single IDx Total incl. IDx Specific Total and each TDxxx Specific Total [parent ==- IDx]
    if (typeof args.show !== 'boolean' && args.show && filter.match(/ID[1-9]/)) {
        // best to use project as source for this one - access to all IDx with sub TDxxx from one list
        const project = retrieveDatapoint(args, args.hierarchyName)
        project.idList.forEach(id => {
            if (id['Deliverable Number'] === filter) {
                displayIDIntegrationTotal(args, id)
                const milestones = retrieveDatapoint(args, id['Deliverable Number'] + 'Milestones')
                console.group()
                    displayDeliverableMilestones(args, milestones)
                console.groupEnd()
                console.group('Associated TDs:')
                    id.tdList.forEach(td => {
                        displayTDSummary(args, td)
                    })
                    console.log()
                console.groupEnd()
                const total = retrieveDatapoint(args, id['Deliverable Number'] + 'Total')
                displayIDSummary(args, total)
            }
        })
    }

    // show PD Total incl. PDx Specific Total
    if ((typeof args.show !== 'boolean' && args.show && filter === 'PD')
        || typeof args.show === 'boolean'
    ) {
        // best to use project as source for this one - access to all IDx with sub TDxxx from one list
        const project = retrieveDatapoint(args, args.hierarchyName)
        pd = project.info
        displayPDIntegrationTotal(args, pd)
        const milestones = retrieveDatapoint(args, pd['Deliverable Number'] + 'Milestones')
        console.group()
        displayDeliverableMilestones(args, milestones)
        console.groupEnd()
        const pdTotal = retrieveDatapoint(args, pd['Deliverable Number'] + 'Total')
        displayPDSummary(args, pdTotal)
    }

    // show PD Total incl. PDx Specific Total and IDx Total
    if ((typeof args.show !== 'boolean' && args.show && filter === 'PDDetail')
        || typeof args.show === 'boolean'
    ) {
        // best to use project as source for this one - access to all IDx with sub TDxxx from one list
        const project = retrieveDatapoint(args, args.hierarchyName)
        pd = project.info
        displayPDIntegrationTotal(args, pd)
        const milestones = retrieveDatapoint(args, pd['Deliverable Number'] + 'Milestones')
        console.group()
            displayDeliverableMilestones(args, milestones)
        console.groupEnd()
        console.group('Associated IDs:')
            project.idList.forEach(id => {
                displayIDIntegrationTotal(args, id)
                const idTotal = retrieveDatapoint(args, id['Deliverable Number'] + 'Total')
                displayIDSummary(args, idTotal)
            })
            console.log()
        console.groupEnd()
        // console.group('Total:')
            const pdTotal = retrieveDatapoint(args, pd['Deliverable Number'] + 'Total')
            displayPDSummary(args, pdTotal)
        // console.groupEnd()
    }

    // show PD Total incl. PDx Specific Total and IDx Total
    if (typeof args.show !== 'boolean' && args.show && filter === 'All') {
        // best to use project as source for this one - access to all IDx with sub TDxxx from one list
        const project = retrieveDatapoint(args, args.hierarchyName)
        pd = project.info
        displayPDIntegrationTotal(args, pd)
        console.group()
        project.idList.forEach(id => {
            displayIDIntegrationTotal(args, id)
            console.group()
            id.tdList.forEach(td => {
                displayTDSummary(args, td)
            })
            console.groupEnd()
        })
        console.groupEnd()
    }

    // show PD Total incl. PDx Specific Total and IDx Total
    if (typeof args.show !== 'boolean' && args.show && filter === 'AllMilestones') {
        // best to use project as source for this one - access to all IDx with sub TDxxx from one list
        const project = retrieveDatapoint(args, args.hierarchyName)
        pd = project.info
        displayPDIntegrationTotal(args, pd)
        const milestones = retrieveDatapoint(args, pd['Deliverable Number'] + 'Milestones')
        displayDeliverableMilestones(args, milestones)
        console.group()
        project.idList.forEach(id => {
            displayIDIntegrationTotal(args, id)
            const milestones = retrieveDatapoint(args, id['Deliverable Number'] + 'Milestones')
            displayDeliverableMilestones(args, milestones)
            console.group()
            id.tdList.forEach(td => {
                displayTDSummary(args, td)
                const milestones = retrieveDatapoint(args, td['Deliverable Number'] + 'Milestones')
                displayDeliverableMilestones(args, milestones)
            })
            console.groupEnd()
        })
        console.groupEnd()
    }

}

module.exports.displayDeliverables = displayDeliverables