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
    // let idList = []
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
                rawProduct.idList.push(line)
                if (currentId >= 0) {
                    // console.info(`update id[$tdList]:`, currentId, tdList.length)
                    rawProduct.idList[currentId].tdList = tdList
                }
                currentId++     // this lets us update the id.td list after all collected
                tdList = []     // reset the tdList for the new ID
                break
            case 'TD':
                tdList.push(line)
                break
        }
    })
    // idList[currentId].tdList = tdList        // ensure the last group of TDs are captured back to the ID
    // rawProduct.idList = idList 

    // display results
    // console.info('product:', util.inspect(product, false, null, true))
    // console.info('product:', util.inspect(product, false, 2, true))
    // console.info('idList', product.idList.length)

    return rawProduct
}

module.exports.xformHierarchySource = xformHierarchySource