const xlsx = require('xlsx')

// read a spreadsheet and transform into objects
function readHierarchySource(fileName, tab) {
    console.error('readMasterFileOutline() fileName:', fileName, 'tab:', tab)
    const spreadsheet = xlsx.readFile(
        fileName,
        { 'cellHTML': false, 'cellHTML': false, 'cellNF': false, 'cellText': false }
    )

    const sheets = spreadsheet.SheetNames
    console.error('sheet names:', sheets)
    const sheetName = sheets[0]
    // const sheetData = spreadsheet.Sheets[sheetName]
    const sheetData = spreadsheet.Sheets[tab]
    // console.error('sheetName:sheetData: %s', sheetName, JSON.stringify(sheetData))

    // figure out active cell bounding box
    const upperLeft = sheetData['!ref'].split(':')[0]
    const upperLeftCol = sheetData['!ref'].split(':')[0].match(/[a-zA-Z]+/g)[0]
    const upperLeftRow = sheetData['!ref'].split(':')[0].match(/[0-9]+/g)[0]
    // debugger;
    const lowerRight = sheetData['!ref'].split(':')[1]
    const lowerRightCol = sheetData['!ref'].split(':')[1].match(/[a-zA-Z]+/g)[0]
    const lowerRightRow = sheetData['!ref'].split(':')[1].match(/[0-9]+/g)[0]
    // console.log('MasterFile Info: [%s:%s] cell range %s to %s\n', fileName, tab, upperLeft, lowerRight )

    // compute # rows and cols
    const stringIndex = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19,
        'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26
    }
    const numCols = stringIndex[lowerRightCol] - stringIndex[upperLeftCol] + 1
    const numRows = lowerRightRow - upperLeftRow + 1
    // console.log('# cols', numCols)
    // console.log('# rows', numRows)

    const keyCols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S']
    // const riskScoreCols = ['T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    // const featuresCols = ['AA', 'AB', 'AC', 'AD', 'AE']
    let headers = {}
    let data = []

    // import the spreadsheet into objects
    for (colRow in sheetData) {

        // strip out the worksheet specific options (autofilter, margins, merges, etc.)
        if (colRow[0] === '!') continue

        // parse out column & row from ColRow and then value
        let tt = 0
        for (let i = 0; i < colRow.length; i++) {
            if (!isNaN(colRow[i])) {
                tt = i
                break
            }
        }
        let col = colRow.substring(0, tt);
        let row = parseInt(colRow.substring(tt))
        let value = sheetData[colRow].v

        // store all header names
        if (row == 1 && value) {
            headers[col] = value
            continue
        }

        // only store out interesting columns
        if (keyCols.includes(col)) {
            if (!data[row]) data[row] = {}
            data[row][headers[col]] = value
        }
    }



  // console.error('data:', data)
  return data

}

module.exports.readHierarchySource = readHierarchySource
