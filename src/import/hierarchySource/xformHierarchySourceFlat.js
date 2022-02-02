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
        
        // console.group(line['Full Deliverable Name'] + '(top of forEach()')
        // console.info(line)
        // console.groupEnd()

        if (line === null)
            return
        switch (line.Type) {
            case 'PD':
                hierarchySourceFlat.productInfo = line
                break
            case 'ID':
                // console.group(line['Full Deliverable Name'] + ' Type: ID')
                // console.info(line)
                // console.groupEnd()

                line['Parent Deliverable'] = 'PD'
                hierarchySourceFlat.idList.push(line)
                break
            case 'TD':
                // console.group(line['Full Deliverable Name'] + ' Type: TD')
                // console.info(line)
                // console.groupEnd()

                const id = extractID(line['Deliverable ID'])
                line['Parent Deliverable'] = id
                hierarchySourceFlat.tdList.push(line)
                break
        }
    })

    // display results
    // console.info('hierarchySourceFlat:', util.inspect(hierarchySourceFlat, false, null, true))
    // console.info('hierarchySourceFlat:', util.inspect(hierarchySourceFlat, false, 2, true))
    // console.info('idList', hierarchySourceFlat.idList.length)

    return hierarchySourceFlat
}

// determine the name of the parent deliverable
//  - for IDs, it is always PD
//  - for TDs, it can be determined from 'Deliverable ID' because of ID encoded into TD number
function extractID(deliverableName) {
    let index = deliverableName.indexOf('D')
    let parent = 'ID' + deliverableName.substr(index+1, 1)

    // console.info('\tdeliverableName:', deliverableName, 'index: ', index, 'parent:', parent)
    return parent
}

module.exports.xformHierarchySourceFlat = xformHierarchySourceFlat