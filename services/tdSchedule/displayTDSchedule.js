const util = require('util')
const merge = require('lodash.merge')

function displayTDSchedule(td) {
    var tdSchedule = merge(td['TD Schedule'], td['Estimated TD Schedule'])
    // if (typeof td['TD Schedule']['Design'] !== 'undefined' && typeof td['TD Schedule']['Design'].easy !== 'undefined') {
    //     td['TD Schedule']['Design'].easy.sdi ? td['TD Schedule']['Design'].name : td['Estimated TD Schedule']['Design'].name
    // }

    return tdSchedule
}

module.exports.displayTDSchedule = displayTDSchedule
