const util = require('util')


function displayItem(args, filter, item, level) {
    // console.info(args)
    // console.info(filter, level)
    let depth = typeof level !== 'undefined' ? level : null 
    let title = filter.replace('show', '') + ':'
    
    let target = args[filter]
    if (args[filter] && (target === item['Deliverable Number'] || typeof args[filter] === 'boolean')) {
        console.info(title, item['Deliverable Number'] + ' ' + item['Deliverable Name'])
        console.group()
        console.info( util.inspect(item, false, depth, true))
        console.groupEnd()
    }
}

module.exports.displayItem = displayItem