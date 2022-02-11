const util = require('util')
const xlsx = require('xlsx')

const { readMilestone } = require('./readMilestone.js')
const { storeDatapoint } = require('../../utilities/storeDatapoint.js')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint.js')
const { readHierarchySource } = require('../hierarchySource/readHierarchySource.js')

function importDefaultMilestones(args) {

    // import Hierarchy Source
    //  - Allows us to know what Default Milestone tabs exist in the source xlsx file
    spreadsheet = xlsx.readFile(
        args.fileRoot + args.hierarchySource,
        { 'cellHTML': false, 'cellHTML': false, 'cellNF': false, 'cellText': false }
    )
    let tabs = spreadsheet.SheetNames
    removeItemOnce(tabs, 'Assumptions')
    removeItemOnce(tabs, 'Developers')
    removeItemOnce(tabs, 'Holidays')
    removeItemOnce(tabs, 'Vacations')
    // console.info('sheet names:', tabs)

    tabs.forEach(tab => {
        // read the hierarchy source from the excel files and store as datapoint
        try {
            if (args.showImports && (args.showImports === tab || typeof args.showImports === 'boolean')) {
                console.info(tab, '(', args.hierarchySource, ':', tab, ')')
                console.group()
            }

            project = readMilestone(args, 'Default', args.fileRoot, args.hierarchySource, tab)
            
            // NOTE: assumes the tab name doesn't have a conflict with other datapoints!
            let datapointName = tab.split(' ').join('')
            storeDatapoint(args, project, datapointName)
            if (args.showImports && (args.showImports === tab || typeof args.showImports === 'boolean')) {
                console.groupEnd()
            }
        } catch (err) {
            if (args.showImports && (args.showImports === tab || typeof args.showImports === 'boolean')) {
                console.groupEnd()
            }
            console.info('args.fileRoot:', args.fileRoot, 'args.hierarchySource:', args.hierarchySource, 'tab:', tab)
            throw err
        }
    })
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

module.exports.importDefaultMilestones = importDefaultMilestones