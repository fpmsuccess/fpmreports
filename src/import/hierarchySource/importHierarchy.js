
const { readHierarchySource } = require('./readHierarchySource.js')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')
const { xformHierarchySource } = require('./xformHierarchySource.js')
const { xformHierarchySourceFlat } = require('./xformHierarchySourceFlat.js')

function importHierarchy(args) {

    // import Hierarchy Source
    let rawHierarchySource = []
    let hierarchySource = {}
    let hierarchySourceFlat = {}

    // read the raw hierarchy source from the excel files and store it as a datapoint
    try {
        rawHierarchySource = readHierarchySource(args, args.fileRoot, args.hierarchySource, args.hierarchyTab)
        // console.info(rawHierarchySource) 
    } catch (err) {
        throw err
    }
    try {
        storeDatapoint(args, rawHierarchySource, args.hierarchyName + 'Raw')
    } catch (err) {
        throw err
    }

    // transform the excel info into Hierarchy Source object and save it as a datapoint
    try {
        hierarchySource = xformHierarchySource(rawHierarchySource)
        // console.info(rawHierarchySource.length, hierarchySource.idList.length) 
    } catch (err) {
        throw err
    }
    try {
        storeDatapoint(args, rawHierarchySource, args.hierarchyName)
    } catch (err) {
        throw err
    }

    // transform the excel info into flat Hierarchy Source object and save it to JSON
    try {
        hierarchySourceFlat = xformHierarchySourceFlat(rawHierarchySource)   
    } catch (err) {
        throw err
    }
    try {
        storeDatapoint(args, hierarchySourceFlat, args.hierarchyName + 'Flat')
    } catch (err) {
        throw err
    }

    return hierarchySource
}

module.exports.importHierarchy = importHierarchy