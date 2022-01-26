const minimist = require('minimist')

function cliArgs() {

    let cliArgs = {}

    const args = minimist(process.argv.slice(2), { alias: { f: ['file'] } })
    // console.log('args:', args)

    if (typeof args.help !== 'undefined' 
        || typeof args['h'] !== 'undefined' 
        || typeof args['help'] !== 'undefined' 
        || typeof args['--help'] !== 'undefined'
    ) {
        // show help information
        console.error('Usage: node app.js <command>')
        console.log('\nwhere <command> is one of:')
        console.log('\t help, etc.')
        console.log()
        console.log('npm <command> -h    quick help on <command>')
        console.log()

        process.exit(0)
    }

    // source directory, file, and tab default options
    if (typeof args.fileRoot === 'undefined') {
        args.fileRoot = '../../StdCosting/'
    }
    if (typeof args.indexSource === 'undefined') {
        args.indexSource = 'elbert - std costing.xlsx'
    }
    if (typeof args.indexTab === 'undefined') {
        args.indexTab = 'Schedule Index'
    }
    if (typeof args.defaultTDScheduleTab === 'undefined') {
        args.defaultTDScheduleTab = 'Default TD Schedule'
    }
    if (typeof args.defaultIDScheduleTab === 'undefined') {
        args.defaultIDScheduleTab = 'Default ID Schedule'
    }
    if (typeof args.defaultPDScheduleTab === 'undefined') {
        args.defaultPDScheduleTab = 'Default PD Schedule'
    }
    if (typeof args.estimateScheduleTab === 'undefined') {
        args.estimateScheduleTab = 'TDxxx Form'
    }

    // adjust paths in on Win platform (not Linux)
    if (typeof args.win !== 'undefined') {
        // if on windows fix path separators and file paths
        args.fileRoot = args.fileRoot.replace(/\//g, '\\')
        args.indexSource = args.indexSource.replace(/\//g, '\\')
    }

    // // display output options
    // if (typeof args.hsd !== 'undefined' && args.hsd) {
    //     console.log('show deliverables list details')
    //     console.log('show Schedule Index')
    //     console.log('show individual TD')
    //     console.log('show individual ID')
    //     console.log('show TD Schedule info')
    //     console.log('show ID Schedule info')
    //     console.log('show PD Schedule info')
    //     process.exit(0)
    // }

    // default show options to false
    args.showScheduleIndex = false
    args.showDeliverables = false
    args.showDeliverablesX = false
    args.showDefaultTDSchedule = false
    args.showTDEstimateSchedule = false
    args.showNoWarnings = false
    args.showOnlyActiveTDs = false
    args.showOnlyActiveIDs = false
    args.showOnlyActiveMilestones = false
    typeof args.showLevel === 'undefined' ? args.showLevel = 'td' : ''
    typeof args.manHrsPerWk === 'undefined' ? args.manHrsPerWk = 36 : ''

    // handle any command line show options
    if (typeof args.show === 'object') {
        // if there are multiple '--show xxx' cli options
        // it will be an object property with multiple elements
        // e.g., arg.show: ['xxx', 'yyy']
        args.show.forEach((option) => {
            let showSetting = showOptions[option]
            if (typeof showSetting !== 'undefined') {
                args[showSetting] = true
            } else {
                console.error('Error: unknown command line option: \'' + showSetting + '\'')
            }
        })
    } else 
    if (typeof args.show == 'string') {
        // if there is a single '--show xxx' cli option, 
        //  it will be a property (e.g., arg.show: 'xxx') 
        let showSetting = showOptions[args.show]
        if (typeof showSetting !== 'undefined') {
            args[showSetting] = true
        } else {
            console.error('Error: unknown command line option: \'' + args.show + '\'')
        }
    } else {
        console.error('Error: unknown command line option: \'' + args.show + '\'')
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
    'onlyActiveMilestones': 'showOnlyActiveMilestones'
}

module.exports.cliArgs = cliArgs