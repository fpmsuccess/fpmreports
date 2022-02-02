const util = require('util')

// import from data sources
const { readHierarchySource } = require('./readHierarchySource.js')
const { saveHierarchySource } = require('./saveHierarchySource.js')
const { xformHierarchySource } = require('./xformHierarchySource.js')
const { xformHierarchySourceFlat } = require('./xformHierarchySourceFlat.js')

function importHierarchy(args) {

    // import Hierarchy Source
    let rawHierarchySource = []
    let hierarchySource = {}
    let hierarchySourceFlat = {}

    // read the hierarchy source from the excel files
    try {
        rawHierarchySource = readHierarchySource(args.fileRoot, args.hierarchySource, args.hierarchyTab)
        // console.info(rawHierarchySource) 
    } catch (err) {
        if (err) throw err
    }
    // console.info('rawHierarchySource:', util.inspect(rawHierarchySource, false, null, true))
    try {
        let saveFile = ''
        let index = args.hierarchySource.lastIndexOf('.')
        if (index == -1) {
            saveFile = args.hierarchySource.concat('Raw')
        } else {
            saveFile = args.hierarchySource.substr(0, index).concat('Raw') 
        }
        // console.info('\tfileName:', args.hierarchySource, saveFile)
        saveHierarchySource(rawHierarchySource, args.jsonRoot, saveFile)
    } catch (err) {
        if (err) throw err
    }

    // transform the excel info into Hierarchy Source object and save it to JSON
    try {
        hierarchySource = xformHierarchySource(rawHierarchySource)
        // console.info(rawHierarchySource.length, hierarchySource.idList.length) 
    } catch (err) {
        throw err
    }
    // console.info('hierarchySource:', util.inspect(hierarchySource, false, null, true))
    try {
        saveHierarchySource(hierarchySource, args.jsonRoot, args.hierarchySource)
    } catch (err) {
        if (err) throw err
    }

    // transform the excel info into flat Hierarchy Source object and save it to JSON
    try {
        hierarchySourceFlat = xformHierarchySourceFlat(rawHierarchySource)   
        // console.info(rawHierarchySource.length, hierarchySourceFlat.idList.length, hierarchySourceFlat.tdList.length)
    } catch (err) {
        throw err
    }
    // console.info('hierarchySourceFlat:', util.inspect(hierarchySourceFlat, false, null, true))
    try {
        let saveFile = ''
        let index = args.hierarchySource.lastIndexOf('.')
        if (index == -1) {
            saveFile = args.hierarchySource.concat('Flat')
        } else {
            saveFile = args.hierarchySource.substr(0, index).concat('Flat')
        }
        // console.info('\tfileName:', args.hierarchySource, saveFile)
        saveHierarchySource(hierarchySourceFlat, args.jsonRoot, saveFile)
    } catch (err) {
        if (err) throw err
    }

    return hierarchySource
}

module.exports.importHierarchy = importHierarchy