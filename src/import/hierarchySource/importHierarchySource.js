const util = require('util')
const { readHierarchySource, saveHierarchySourceJSON } = require('./readHierarchySource.js')

function importHierarchySource(args) {
// import from data sources

    // Hierarchy Source
    let rawHierarchySource = {}

    //  - read the hierarchy source from the excel files
    try {
        rawHierarchySource = readHierarchySource(args.fileRoot, args.hierarchySource, args.hierarchyTab)
    } catch (err) {
        if (err) throw err
    }

    return rawHierarchySource      // will need to be updated!
}

module.exports.importHierarchySource = importHierarchySource
