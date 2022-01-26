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
        args.fileRoot = './'
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

    // display output options
    if (typeof args.hsd !== 'undefined' && args.hsd) {
        console.log('show deliverables list details')
        console.log('show Schedule Index')
        console.log('show individual TD')
        console.log('show individual ID')
        console.log('show TD Schedule info')
        console.log('show ID Schedule info')
        console.log('show PD Schedule info')
        process.exit(0)
    }

    // default show options to false
    args.showScheduleIndex = false
    args.showDeliverables = false
    args.showDeliverablesX = false
    args.showDefaultTDSchedule = false
    args.showTDEstimateSchedule = false
    args.showNoWarnings = false
    typeof args.showLevel === 'undefined' ? args.showLevel = 'td' : ''
    typeof args.manHrsPerWk === 'undefined' ? args.manHrsPerWk = 36 : ''

    // handle any command line show options
    if (typeof args.show !== 'undefined') {
        console.info('\t typeof args.show:', typeof args.show, args.show)
        if (typeof args.show === 'object') {
            args.show.forEach((option) => {
                console.info('\t each show option', option)
                switch (option) {
                    case 'sIndex':
                    case 'sindex':
                        args.showScheduleIndex = true
                        break
                    case 'deliverable':
                    case 'deliverables':
                    case 'ds':
                        args.showDeliverables = true
                        break
                    case 'deliverableX':
                    case 'deliverablesX':
                    case 'dsX':
                        args.showDeliverablesX = true
                        break
                    case 'TDEstimate':
                    case 'tdEst':
                    case 'tdestimate':
                    case 'tdest':
                        args.showTDEstimateSchedule = true
                        break
                    case 'Milestones':
                    case 'milestones':
                        args.showMilestones = true
                        break
                    case 'no_warnings':
                        args.showNoWarnings = true
                    default:
                        console.error('Error: unknown command line argument \'', option, '\'')
                        break

                }
            })
        } else 
        if (typeof args.show == 'string') {
            if ('sIndex' === args.show) {
                showScheduleIndex = true
            } else 
            if ('deliverables' === args.show || 'deliverable' === args.show || 'ds' === args.show) {
                args.showDeliverables = true
            } else 
            if ('tdestimate' === args.show || 'tdEstimate' == args.show) {
                args.showTDEstimateSchedule = true
            } else {
                console.error('Error: unknown command line argument \'', args.show, '\'')
            }
        }
    }
    return args
}

module.exports.cliArgs = cliArgs