const { retrieveDatapoint } = require("../utilities/retrieveDatapoint")
const { displayDeliverableMilestones } = require("./displayDeliverableMilestones")
const { displayTDSpecificTotal } = require('./displayTD/displayTDSpecificTotal')
const { displayIDSpecificTotal } = require("./displayID/displayIDSpecificTotal")
const { displayIDTotal } = require("./displayID/displayIDTotal")
const { displayPDSpecificTotal } = require("./displayPD/displayPDSpecificTotal")
const { displayPDTotal } = require("./displayPD/displayPDTotal")

function displayDeliverables(args) {

    let filter = '' + args.show

    // showTDxxxMilestones

    // show only single TDxxx Milestones
    if (typeof args.show !== 'boolean' && args.show && filter.match(/TD[1-9][0-9][0-9]Milestones/)) {
        // best directly retrieve TDxxxMilestones datapoint
        const milestones = retrieveDatapoint(args, filter)
        displayTDSpecificTotal(args, milestones)
        displayDeliverableMilestones(args, milestones)
    }

    // show only single IDx Milestones
    if (typeof args.show !== 'boolean' && args.show && filter.match(/ID[1-9]Milestones/)) {
        // best directly retrieve TDxxxMilestones datapoint
        const milestones = retrieveDatapoint(args, filter)
        displayIDSpecificTotal(args, milestones)
        displayDeliverableMilestones(args, milestones)
    }

    // show only single PD Milestones
    if (typeof args.show !== 'boolean' && args.show && filter === 'PDMilestones') {
        // best directly retrieve TDxxxMilestones datapoint
        const milestones = retrieveDatapoint(args, filter)
        displayPDSpecificTotal(args, milestones)
        displayDeliverableMilestones(args, milestones)
    }

    // show only single TDxxx Specific Total
    if (typeof args.show !== 'boolean' && args.show && filter.match(/TD[1-9][0-9][0-9]/)) {
        // best to use projectFlat as source for this one - access to all TDxxx from one list
        const project = retrieveDatapoint(args, args.hierarchyName + 'Flat')
        project.tdList.forEach(td => { 
            if (td['Deliverable Number'] === filter) {
                displayTDSpecificTotal(args, td)
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
                displayIDSpecificTotal(args, id)
                const milestones = retrieveDatapoint(args, id['Deliverable Number'] + 'Milestones')
                console.group()
                    displayDeliverableMilestones(args, milestones)
                console.groupEnd()
                console.group('Associated TDs:')
                    id.tdList.forEach(td => {
                        displayTDSpecificTotal(args, td)
                    })
                    console.log()
                console.groupEnd()
                const total = retrieveDatapoint(args, id['Deliverable Number'] + 'Total')
                displayIDTotal(args, total)
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
        displayPDSpecificTotal(args, pd)
        const milestones = retrieveDatapoint(args, pd['Deliverable Number'] + 'Milestones')
        console.group()
        displayDeliverableMilestones(args, milestones)
        console.groupEnd()
        const pdTotal = retrieveDatapoint(args, pd['Deliverable Number'] + 'Total')
        displayPDTotal(args, pdTotal)
    }

    // show PD Total incl. PDx Specific Total and IDx Total
    if ((typeof args.show !== 'boolean' && args.show && filter === 'PDDetail')
        || typeof args.show === 'boolean'
    ) {
        // best to use project as source for this one - access to all IDx with sub TDxxx from one list
        const project = retrieveDatapoint(args, args.hierarchyName)
        pd = project.info
        displayPDSpecificTotal(args, pd)
        const milestones = retrieveDatapoint(args, pd['Deliverable Number'] + 'Milestones')
        console.group()
            displayDeliverableMilestones(args, milestones)
        console.groupEnd()
        console.group('Associated IDs:')
            project.idList.forEach(id => {
                displayIDSpecificTotal(args, id)
                const idTotal = retrieveDatapoint(args, id['Deliverable Number'] + 'Total')
                displayIDTotal(args, idTotal)
            })
            console.log()
        console.groupEnd()
        // console.group('Total:')
            const pdTotal = retrieveDatapoint(args, pd['Deliverable Number'] + 'Total')
            displayPDTotal(args, pdTotal)
        // console.groupEnd()
    }

    // show PD Total incl. PDx Specific Total and IDx Total
    if (typeof args.show !== 'boolean' && args.show && filter === 'All') {
        // best to use project as source for this one - access to all IDx with sub TDxxx from one list
        const project = retrieveDatapoint(args, args.hierarchyName)
        pd = project.info
        displayPDSpecificTotal(args, pd)
        console.group()
        project.idList.forEach(id => {
            displayIDSpecificTotal(args, id)
            console.group()
            id.tdList.forEach(td => {
                displayTDSpecificTotal(args, td)
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
        displayPDSpecificTotal(args, pd)
        const milestones = retrieveDatapoint(args, pd['Deliverable Number'] + 'Milestones')
        displayDeliverableMilestones(args, milestones)
        console.group()
        project.idList.forEach(id => {
            displayIDSpecificTotal(args, id)
            const milestones = retrieveDatapoint(args, id['Deliverable Number'] + 'Milestones')
            displayDeliverableMilestones(args, milestones)
            console.group()
            id.tdList.forEach(td => {
                displayTDSpecificTotal(args, td)
                const milestones = retrieveDatapoint(args, td['Deliverable Number'] + 'Milestones')
                displayDeliverableMilestones(args, milestones)
            })
            console.groupEnd()
        })
        console.groupEnd()
    }

}

module.exports.displayDeliverables = displayDeliverables