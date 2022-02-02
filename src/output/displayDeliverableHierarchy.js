const util = require('util')
const { idDisplay } = require('./displayID/idDisplay')

function displayDeliverables(args, deliverables) {
    console.log(deliverables.info['Deliverable Name'])
    console.group() // for pd
    console.log('... additional PD info goes here')
    console.log()   // this is the end of the PD info

    if (args.showLevel !== 'pd') {
        deliverables.idList.forEach((id) => {
            idDisplay(args, id)
        })
    }
    console.groupEnd()
}

module.exports.displayDeliverables = displayDeliverables
