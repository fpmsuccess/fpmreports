const chalk = require('chalk')

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
        args.stopAfterImport = true
        console.info(chalk.red('ERROR') + ': Failed to read hierarchy Source from file: \'' + args.fileRoot + args.hierarchySource + '\'')
        return
    }

    // transform the excel info into Project object and save it as a datapoint
    try {
        xformHierarchySource(args, rawHierarchySource)
    } catch (err) {
        args.stopAfterImport = true
        console.info(chalk.red('ERROR') + ': Failed to transform raw hierarchy source into datapoint: \'' + args.fileRoot + hierarchySource + '\'')
        return
    }

    // transform the excel info into ProjectFlat object and save it as a datapoint
    try {
        xformHierarchySourceFlat(args, args.rawHierarchySource)
    } catch (err) {
        args.stopAfterImport = true
        console.info(chalk.red('ERROR') + ': Failed to transform raw hierarchy source into flat datapoint: \'' + args.fileRoot + hierarchySource + '\'')
        return
    }

}

module.exports.importHierarchySource = importHierarchySource