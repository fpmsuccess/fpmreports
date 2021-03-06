const fs = require('fs')
const deepmerge = require('deepmerge')
const minimist = require('minimist')

const { help } = require('./help.js')
const localDefaults = require('../../defaults.json')

function cliArgs() {
    
    // merge the localDefaults with the cli args
    let args = deepmerge(localDefaults, minimist(process.argv.slice(2)))

    if (typeof args.help !== 'undefined' 
        || typeof args['h'] !== 'undefined' 
        || typeof args['help'] !== 'undefined' 
    ) {
        // show help information
        help()
        process.exit(0)
    }

    // source directory, file, tab default options, json store directory
    if (typeof args.fileRoot === 'undefined') {
        // args.fileRoot = '../StdCosting/'
        args.fileRoot = '../../StdCosting/'
    }
    if (typeof args.hierarchySource === 'undefined') {
        args.hierarchySource = 'elbert.xlsx'
        args.hierarchyName = 'elbert'
    } else {
        let index = args.hierarchySource.lastIndexOf('.')
        if (index === -1) {
            args.hierarchyName = args.hierarchySource
        // } else {
        //     args.hierarchyName = args.hierarchySource.substr(index, args.hierarchySource-index)
        }
    }
    if (typeof args.hierarchyTab === 'undefined') {
        args.hierarchyTab = 'Hierarchy Index'
    }
    if (typeof args.jsonRoot === 'undefined') {
        args.jsonRoot = './jsonStorage/'
    }
    if (typeof args.showTotals && typeof args.show === 'undefined'){
        args.show = args.showTotals
        delete args.showTotals
    }

    typeof args.manHrsPerWk === 'undefined' ? args.manHrsPerWk = 36 : ''

    if (typeof args.win !== 'undefined' && args.win === true) {
        // adjust paths for Win platform (not Linux)
        // if on windows fix path separators and file paths
        args.fileRoot = args.fileRoot.replace(/\//g, '\\')
        args.hierarchySource = args.hierarchySource.replace(/\//g, '\\')
        args.jsonRoot = args.jsonRoot.replace(/\//g, '\\')
    // } else if (typeof args.win === 'undefined' || args.win === false) {
    //     // adjust paths for Linux platform
    //     // if on windows fix path separators and file paths
    //     args.fileRoot = args.fileRoot.replace(/\\/g, '\/')
    //     args.hierarchySource = args.hierarchySource.replace(/\\/g, '\/')
    //     args.jsonRoot = args.jsonRoot.replace(/\\/g, '\/')
    }

    return args
}

const showOptions = {
    'sIndex': 'showScheduleIndex',
    'deliverables': 'showDeliverables',
    'deliverable': 'showDeliverable',
    'ds': 'showDeliverable',
    'deliverableX': 'showDeliverablesX',
    'deliverablesX': 'showDeliverablesX',
    'dsX': 'showDeiverablesX',
    'TDEstimate': 'showTDEstimateSchedule',
    'tdestimate': 'showTDEstimateSchedule',
    'tdest': 'showTDEstimateSchedule',
    'Milestones': 'showMilestones',
    'milestones': 'showMilestones',
    'noWarnings': 'showNoWarnings',
    'onlyActiveTDs': 'showOnlyActiveTDs',
    'onlyActiveIDs': 'showOnlyActiveIDs',
    'onlyActiveMilestones': 'showOnlyActiveMilestones',
    'defaultTDSchedule': 'showDefaultTDSchedule'
}

module.exports.cliArgs = cliArgs