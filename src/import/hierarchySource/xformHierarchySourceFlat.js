const xlsx = require('xlsx')
const util = require('util')

// transform Hierarchy Index  objects into a hierarchy
function xformHierarchySourceFlat(rawHierarchySource) {

    // create new obj to prevent impact on original
    const rawHierarchySourceClone = JSON.parse(JSON.stringify(rawHierarchySource))

    let hierarchySourceFlat = {
        'productInfo': {},
        'idList': [],
        'tdList': []
    }

    let currentId = -1

    // walk thru the raw source and build the property and id list
    rawHierarchySourceClone.forEach((line) => {

        if (line === null)
            return
        switch (line.Type) {
            case 'PD':
                hierarchySourceFlat.productInfo = line
                break

            case 'ID':
                line['Parent Deliverable'] = 'PD'
                hierarchySourceFlat.idList.push(line)
                break

            case 'TD':
                const id = extractID(line['Deliverable Number'])
                line['Parent Deliverable'] = id
                hierarchySourceFlat.tdList.push(line)
                break
        }
    })

    return hierarchySourceFlat
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