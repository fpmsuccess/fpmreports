const xlsx = require('xlsx')

// read a spreadsheet and transform into objects
function readMilestone(args, name, filePath, fileName, tab) {
    if (args.showInfo) {
        console.info('\INFO: readMilestones() for:', name,
            '\n\tfileRoot:', filePath,
            '\n\tfileName:', fileName,
            '\n\ttab:', tab
        )
    }

    let spreadsheet
    try {
        spreadsheet = xlsx.readFile(
            filePath + fileName,
            { 'cellHTML': false, 'cellHTML': false, 'cellNF': false, 'cellText': false }
        )
    } catch (err) {
        throw 'Error: File: ' + filePath + fileName + ' doesn\'t exist'
    }

    const sheets = spreadsheet.SheetNames
    if (sheets.indexOf(tab) === -1) {
        console.error('\tERROR: tab: ' + '\'' + tab + '\'',
            '\n\t\tnot found in ' + '\'' + filePath + fileName + '\''
        )
        // console.log()
        return null
    }
    const sheetData = spreadsheet.Sheets[tab]
    if (typeof sheetData === 'undefined') {
        throw 'Error: Tab: ' + tab + ' doesn\'t exist in file: ' + filePath + fileName
    }

    // figure out active cell bounding box
    const upperLeft = sheetData['!ref'].split(':')[0]
    const upperLeftCol = sheetData['!ref'].split(':')[0].match(/[a-zA-Z]+/g)[0]
    const upperLeftRow = sheetData['!ref'].split(':')[0].match(/[0-9]+/g)[0]
    // debugger;
    const lowerRight = sheetData['!ref'].split(':')[1]
    const lowerRightCol = sheetData['!ref'].split(':')[1].match(/[a-zA-Z]+/g)[0]
    const lowerRightRow = sheetData['!ref'].split(':')[1].match(/[0-9]+/g)[0]
    // console.log('MasterFile Info: [%s:%s] cell range %s to %s\n', fileName, tab, upperLeft, lowerRight)

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

    const keyCols = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
    let headers = {}
    let data = {}

    const deliverableInfoStart = 1
    const deliverableInfoEnd = 6
    const milestoneInfoStart = 9
    let milestoneStart = 999
    let milestoneName = ''
    const milestoneTemplate = {
        "easy": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "medium": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "hard": { "sdi": {}, "sdii": {}, "sdiii": {} }
    }
    let milestone = {}

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

        // // store all header names
        // if (row == 1 && value) {
        //     headers[col] = value
        //     continue
        // }

        // // only store out interesting columns
        // if (keyCols.includes(col)) {
        //     if (!data[row]) data[row] = {}
        //     data[row][headers[col]] = value
        // }

        // start with the deliverable information
        if (row >= deliverableInfoStart && row <= deliverableInfoEnd && col === 'B') {
            switch (row) {
                case 1:
                    data['Deliverable Name'] = value
                    break;
                case 2:
                    data['Deliverable Number'] = value
                    break;
                case 4:
                    data['Deliverable Difficulty Level'] = value
                    break;
                case 5:
                    data['Recommended Skill Level'] = value
                    break;
                case 6:
                    data['Person Creating Estimate'] = value
                    break;
            }
        }

        // now parse the milestone info
        // - start at row 9 and go to numRows (end of input)
        if (row >= milestoneInfoStart) {
            if (row >= milestoneStart + 6) {
                // // track which row we are actually on
                // console.info('Closing milestone group, row:', row)
                // store off the milestone
                if (typeof data.milestones === 'undefined') data.milestones = {}
                data.milestones[milestoneName] = milestone
                //  reset the state machine variables
                milestoneStart = 999
                milestone = {}
                milestoneName = ''
            }

            if (col === 'A' && value !== 'Difficulty') {
                // // track which row we are actually on
                // console.info('Starting milestone group, row:', row)
                // start of a milestone group
                milestoneStart = row
                milestone = JSON.parse(JSON.stringify(milestoneTemplate))
                milestoneName = value

            }
            if (milestoneStart + 3 === row) {
                // import difficulty easy
                if (col === 'C') milestone.easy.sdi.min = value
                if (col === 'D') milestone.easy.sdi.expected = value
                if (col === 'E') milestone.easy.sdi.max = value
                if (col === 'F') milestone.easy.sdii.min = value
                if (col === 'G') milestone.easy.sdii.expected = value
                if (col === 'H') milestone.easy.sdii.max = value
                if (col === 'I') milestone.easy.sdiii.min = value
                if (col === 'J') milestone.easy.sdiii.expected = value
                if (col === 'K') milestone.easy.sdiii.max = value
            }
            else if (milestoneStart + 4 === row) {
                // import difficulty medium
                if (col === 'C') milestone.medium.sdi.min = value
                if (col === 'D') milestone.medium.sdi.expected = value
                if (col === 'E') milestone.medium.sdi.max = value
                if (col === 'F') milestone.medium.sdii.min = value
                if (col === 'G') milestone.medium.sdii.expected = value
                if (col === 'H') milestone.medium.sdii.max = value
                if (col === 'I') milestone.medium.sdiii.min = value
                if (col === 'J') milestone.medium.sdiii.expected = value
                if (col === 'K') milestone.medium.sdiii.max = value
            }
            else if (milestoneStart + 5 === row) {
                // import difficulty hard
                if (col === 'C') milestone.hard.sdi.min = value
                if (col === 'D') milestone.hard.sdi.expected = value
                if (col === 'E') milestone.hard.sdi.max = value
                if (col === 'F') milestone.hard.sdii.min = value
                if (col === 'G') milestone.hard.sdii.expected = value
                if (col === 'H') milestone.hard.sdii.max = value
                if (col === 'I') milestone.hard.sdiii.min = value
                if (col === 'J') milestone.hard.sdiii.expected = value
                if (col === 'K') milestone.hard.sdiii.max = value
            }
        }

    }

    // convert any milestones === 'Coding - Implementation Time' into 'Coding'
    if (typeof data.milestones['Coding - Implementation Time'] !== 'undefined') {
        data.milestones['Coding'] = data.milestones['Coding - Implementation Time']
        delete data.milestones['Coding - Implementation Time']
    }

    // console.error('data:', data)
    return data

}

module.exports.readMilestone = readMilestone
