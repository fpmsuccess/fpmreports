const xlsx = require('xlsx')
const util = require('util')

// transform Hierarchy Index  objects into a hierarchy
function xformHierarchySource(rawHierarchySource) {

    // create new obj to prevent impact on original
    const rawHierarchySourceClone = JSON.parse(JSON.stringify(rawHierarchySource))

    let rawProduct = {
        info: {},
        idList: []
    }
    let tdList = []

    let currentId = -1

    // walk thru the raw source and build the property and id list
    rawHierarchySourceClone.forEach((line) => {
        // console.info(line.Index, line.Type, ', ', line['Full Deliverable Name'], ', ', line.Predecessor)
        if (line === null)
            return
        switch (line.Type) {
            case 'PD':
                rawProduct.info = line
                break

            case 'ID':
                line['Parent Deliverable'] = 'PD'
                rawProduct.idList.push(line)
                // store the accumulated tdList to the appropriate ID
                if (currentId >= 0) {
                    rawProduct.idList[currentId].tdList = tdList
                }
                currentId++     // this lets us update the id.td list after all collected
                tdList = []     // reset the tdList for the new ID
                break

            case 'TD':
                const id = extractID(line['Deliverable Number'])
                line['Parent Deliverable'] = id
                tdList.push(line)
                break
        }
    })

    return rawProduct
}

// determine the name of the parent deliverable
//  - for IDs, it is always PD
//  - for TDs, it can be determined from 'Deliverable Number' because of ID encoded into TD number
function extractID(deliverableName) {
    let index = deliverableName.indexOf('D')
    let parent = 'ID' + deliverableName.substr(index + 1, 1)

    // console.info('\tdeliverableName:', deliverableName, 'index: ', index, 'parent:', parent)
    return parent
}

module.exports.xformHierarchySource = xformHierarchySource