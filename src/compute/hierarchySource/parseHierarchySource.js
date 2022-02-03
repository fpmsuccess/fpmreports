const util = require('util')
const { xformHierarchySource } = require('../../import/hierarchySource/xformHierarchySource.js')

function parseHierarchySource(args) {
    // transform from raw hierarchy to PD, ID, TD objects

    // Hierarchy Source
    //  - read the raw hierarchy source from the excel files
    try {
        return hierarchySource = xformHierarchySource(args.fileRoot, args.hierarchySource, args.hierarchyTab)
    } catch (err) {
        if (err) throw err
    }

    return hierarchySource

}

module.exports.parseHierarchySource = parseHierarchySource
