const minimist = require('minimist')

function cliArgs() {

    const args = minimist(process.argv.slice(2))
    // console.info('args:', args)

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

    // source directory, file, tab default options, json store directory
    if (typeof args.argsOnly === 'undefined') {
        args.showArgsOnly = true
    }
    if (typeof args.fileRoot === 'undefined') {
        // args.fileRoot = '../../StdCosting/'
        args.fileRoot = '../../StdCosting/'
    }
    if (typeof args.hierarchySource === 'undefined') {
        args.hierarchySource = 'elbert.xlsx'
        args.hierarchyName = 'elbert'
    } else {
        let index = args.hierarchySource.lastIndexOf('.')
        if (index === -1) {
            args.hierarchyName = args.hierarchySource
        } else {
            args.hierarchyName = args.hierarchySource.substr(0, index)
        }
    }
    if (typeof args.hierarchyTab === 'undefined') {
        args.hierarchyTab = 'Hierarchy Index'
    }
    if (typeof args.tdDefaultMilestonesTab === 'undefined') {
        args.tdDefaultMilestonesTab = 'TD Default Milestones'
    }
    if (typeof args.tdZeroMilestonesTab === 'undefined') {
        args.tdZeroMilestonesTab = 'TD Zero Milestones'
    }
    if (typeof args.idDefaultMilestonesTab === 'undefined') {
        args.idDefaultMilestonesTab = 'ID Default Milestones'
    }
    if (typeof args.pdDefaultMilestonesTab === 'undefined') {
        args.pdDefaultMilestonesTab = 'PD Default Milestones'
    }
    if (typeof args.jsonRoot === 'undefined') {
        args.jsonRoot = './jsonStorage/'
    }

    // INFO log output
    if (typeof args.showInfo === 'undefined') {
        args.showInfo = false
    } else args.showInfo = true


    // adjust paths in on Win platform (not Linux)
    if (typeof args.win !== 'undefined') {
        // if on windows fix path separators and file paths
        args.fileRoot = args.fileRoot.replace(/\//g, '\\')
        args.hierarchySource = args.hierarchySource.replace(/\//g, '\\')
    }

    // // display output options
    // if (typeof args.hsd !== 'undefined' && args.hsd) {
    //     console.log('show deliverables list details')
    //     console.log('show Hierarchy Index')
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
            // console.info('arg show object:', option)
            let showSetting = showOptions[option]
            if (typeof showSetting !== 'undefined') {
                args[showSetting] = true
            } else {
                console.error('Error: unknown command line option (object): \'' + showSetting + '\'')
            }
        })
    } else 
    if (typeof args.show == 'string') {
        // if there is a single '--show xxx' cli option, 
        //  it will be a property (e.g., arg.show: 'xxx') 
        console.info('arg show string:', args.show)
        let showSetting = showOptions[args.show]
        if (typeof showSetting !== 'undefined') {
            args[showSetting] = true
        } else {
            console.error('Error: unknown command line option (string): \'' + args.show + '\'')
        }
    } 
    else {
        // bugbug #1 resolve 'typeof args.show != (object or string) condition
        // console.error('Error: typeof args.show != object && != string but is:', typeof args.show)
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