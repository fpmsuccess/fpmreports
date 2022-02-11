const xlsx = require('xlsx')
const util = require('util')

const { storeDatapoint } = require('../../utilities/storeDatapoint')
const { retrieveDatapoint } = require('../../utilities/retrieveDatapoint')

// transform Hierarchy Index  objects into a hierarchy
function xformHierarchySource(args) {

    // retrieve the deliverable milestones to rollup
    const source = retrieveDatapoint(args, args.hierarchyName + 'Raw')

    // // create new obj to prevent impact on original
    // const rawHierarchySourceClone = JSON.parse(JSON.stringify(rawHierarchySource))

    let project = { 
        info: {},
        idList: []
    }
    let tdList = []

    let currentId = -1

    // walk thru the raw source and build the property and id list
    source.forEach((line) => {
        // console.info(line.Index, line.Type, ', ', line['Full Deliverable Name'], ', ', line.Predecessor)
        if (line === null)
            return
        switch (line.Type) {
            case 'PD':
                project.info = line 
                break

            case 'ID':
                line['Parent Deliverable'] = 'PD'
                line.tdList = []     // create a new tdList for the new ID
                currentId++     // keep track of the current ID index for storing TDs
                project.idList.push(line)
                break

            case 'TD':
                const id = extractID(line['Deliverable Number'])
                line['Parent Deliverable'] = id
                // store the accumulated tdList to the appropriate ID
                if (currentId >= 0) {
                    project.idList[currentId].tdList.push(line)
                } else {
                    throw 'ERROR: Hierarchy Index TD: ' + line['Deliverable Number'] + ' created before Parent ID:' + id
                }
                break
        }
    })

    // save as datapoint
    storeDatapoint(args, project, args.hierarchyName)

    return project
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