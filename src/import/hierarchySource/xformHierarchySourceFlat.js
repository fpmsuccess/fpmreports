const xlsx = require('xlsx')
const util = require('util')
const { storeDatapoint } = require('../../utilities/storeDatapoint')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')

// transform Hierarchy Index  objects into a hierarchy
function xformHierarchySourceFlat(args) {

    // retrieve the deliverable milestones to rollup
    const source = retrieveDatapoint(args, args.hierarchyName + 'Raw')

    let projectFlat = {
        'productInfo': {},
        'idList': [],
        'tdList': []
    }

    // walk thru the raw source and build the property and id list
    source.forEach((line) => {

        if (line === null)
            return
        switch (line.Type) {
            case 'PD':
                projectFlat.productInfo = line
                break

            case 'ID':
                line['Parent Deliverable'] = 'PD'
                projectFlat.idList.push(line)
                break

            case 'TD':
                const id = extractID(line['Deliverable Number'])
                line['Parent Deliverable'] = id
                projectFlat.tdList.push(line)
                break
        }
    })

    // save as datapoint
    storeDatapoint(args, projectFlat, args.hierarchyName + 'Flat')

    // return projectFlat
}

// determine the name of the parent deliverable
//  - for IDs, it is always PD
//  - for TDs, it can be determined from 'Deliverable Number' because of ID encoded into TD number
function extractID(deliverableName) {
    let index = deliverableName.indexOf('D')
    let parent = 'ID' + deliverableName.substr(index+1, 1)

    // console.info('\tdeliverableName:', deliverableName, 'index: ', index, 'parent:', parent)
    return parent
}

module.exports.xformHierarchySourceFlat = xformHierarchySourceFlat