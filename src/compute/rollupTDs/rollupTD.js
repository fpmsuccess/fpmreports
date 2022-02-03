const fs = require('fs')
// import chalk from 'chalk'
// const chalk = require('chalk')

function rollupTD(args, td) {
    console.group(td['Full Deliverable Name'])
    console.info('default source:', 'TDDefaultMilestones')
    console.info('estimate source:', td['Estimate File Name'] + ':' + td['Estimate Tab'])

    let dbLocation = ''
    let defaultName = ''
    let estName = ''
    let combined = {}

    // retrieve the default milestones
    
    // retrieve the TD Estimate datapoint
    // determine the TD Estimate datapoint name
    if (td['Estimate File Name'] === 'TDxxx-StandardCosting-Template.xlsx') {
        // note: this is akin to a 'magic number' as it depends upon knowing which 'Estimate File Name' entries point to a default estimate
        console.error('\tWARNING:', td['Full Deliverable Name'] 
            + ' does not have its own estimate yet!'
            + '\n\t\t(it is using default estimate)'
        )
        estName = 'TDDefaultMilestones'
    } else {
        // note: this is akin to a 'magic number' as it depends upon knowing how the json storage file was named
        estName = td['Deliverable ID'] + 'Estimate'
    }
    dbLocation = args.jsonRoot + estName + '.json'
    // console.info('dbLocation:', dbLocation)
    const estEntry = fs.readFileSync(dbLocation, { encoding: 'utf8', flag: 'r' })
    estimateMilestones = JSON.parse(estEntry)

    // merge the two allowing missing estinate milestones to take default values
    if (defaultName === estName) {
        // do the merge here
        combined = defaultMilestones
    } else {
        combined = estimateMilestones
    }

    if (td['Deliverable ID'] === 'TD102') {
        console.info('TD202:', combined)
    }

    console.groupEnd(td)
    console.log()
}

module.exports.rollupTD = rollupTD