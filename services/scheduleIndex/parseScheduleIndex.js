const xlsx = require('xlsx')
const util = require('util')

product = {
    info: {},
    idList: []
}
idList = []
tdList = []

// transform schedule index  objects into a hierarchy
function parseScheduleIndex(scheduleIndex) {

    var currentId = -1

    // first build the property and id list
    scheduleIndex.forEach((line, index) => {
        // console.info(line.Index, line.Type, ', ', line['Full Deliverable Name'], ', ', line.Predecessor)
        switch (line.Type) {
            case 'PD':
                product.info = line
                break
            case 'ID':
                idList.push(line)
                if (currentId >= 0) {
                    // console.info(`update id[$tdList]:`, currentId, tdList.length)
                    idList[currentId].tdList = tdList
                }
                currentId++     // this lets us update the id.td list after all collected
                tdList = []     // reset the tdList for the new ID
                break
            case 'TD':
                tdList.push(line)
                break
        }
    })
    idList[currentId].tdList = tdList        // ensure the last group of TDs are captured back to the ID
    product.idList = idList 

    // display results
    // console.info('product:', util.inspect(product, false, null, true))
    // console.info('product:', util.inspect(product, false, 2, true))
    // console.info('idList', product.idList.length)

    return product
}

module.exports.parseScheduleIndex = parseScheduleIndex