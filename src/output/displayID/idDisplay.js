const { tdDisplay } = require('../displayTD/tdDisplay')

function idDisplay(args, id) {
    // console.info('args.showOnlyActiveIDs:', args.showOnlyActiveIDs)
    // console.info('id.Active:', id.Active)
    if (args.showOnlyActiveIDs && !id.Active)
        return

    console.log(id['Full Deliverable Name'])
    console.group() // for TDs
    // console.log(id['ID Schedule Total')
    console.log('ID Schedule Total (man hours):', id['ID Schedule Total'])

    // compute ID Schedule Total in weeks
    {
        let sched = {}
        sched.min = (id['ID Schedule Total'].min / args.manHrsPerWk).toPrecision(3)
        sched.expected = (id['ID Schedule Total'].expected / args.manHrsPerWk).toPrecision(3)
        sched.max = (id['ID Schedule Total'].max / args.manHrsPerWk).toPrecision(3)
        console.log('ID Schedule Total (man weeks):', sched)
    }
    
    if (args.showLevel !== 'id') {
        id.tdList.forEach((td) => {
            tdDisplay(args, td)
        })
        console.log()   // blank line at end of ID
    }
    console.groupEnd()
}

module.exports.idDisplay = idDisplay
