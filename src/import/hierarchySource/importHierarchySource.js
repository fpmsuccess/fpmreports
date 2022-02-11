
const { readHierarchySource } = require('./readHierarchySource.js')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')

const { xformHierarchySource } = require('./xformHierarchySource.js')
const { xformHierarchySourceFlat } = require('../hierarchySource/xformHierarchySourceFlat')

function importHierarchySource(args) {

    // import Hierarchy Source
    let rawHierarchySource = []

    // read the raw hierarchy source from the excel files and store it as a datapoint
    try {
        rawHierarchySource = readHierarchySource(args, args.fileRoot, args.hierarchySource, args.hierarchyTab)
        storeDatapoint(args, rawHierarchySource, args.hierarchyName + 'Raw')
    } catch (err) {
        console.info('args.fileRoot:', args.fileRoot, 'args.hierarchySource:', args.hierarchySource, 'args.hierarchyTab:', args.hierarchyTab)
        throw err
    }

    // transform the excel info into Project object and save it as a datapoint
    try {
        xformHierarchySource(args, args.rawHierarchySource)
    } catch (err) {
        throw err
    }

    // transform the excel info into ProjectFlat object and save it as a datapoint
    try {
        xformHierarchySourceFlat(args, args.rawHierarchySource)
    } catch (err) {
        throw err
    }

    // return hierarchySource
}

module.exports.importHierarchySource = importHierarchySource