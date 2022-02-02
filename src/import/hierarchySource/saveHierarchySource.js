const fs = require('fs')

function saveHierarchySource(data, savePath, saveFile) {
    // console.info('saveHierarchy()', savePath, saveFile)

    // ensure savePath exists
    fs.mkdir(savePath, { recursive: true }, (err) => {
        if (err) throw err
    })

    let saveName = ''
    let index = saveFile.lastIndexOf('.')
    if (index === -1) {
        saveName = savePath + saveFile + '.json'
    } else {
        saveName = savePath + saveFile.substr(0, index) + '.json'
    }
    // console.info('saveHierarchy() saveName:', saveName)
    const str = JSON.stringify(data, null, 2)

    fs.writeFileSync(saveName, str, (err) => {
        if (err) throw err
        console.info('json data written successfully!')
    })
}

module.exports.saveHierarchySource = saveHierarchySource
