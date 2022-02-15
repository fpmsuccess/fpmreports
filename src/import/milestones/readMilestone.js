const chalk = require('chalk')
const xlsx = require('xlsx')

// state machine constants (relative to milestone input file)
const DELIVERABLEInfoStart = 1
const DELIVERABLEInfoEnd = 6
const MILESTONEInfoStart = 9

// read a spreadsheet and transform into objects
function readMilestone(args, type, filePath, fileName, tab) {
    // if (args.showInfoX) {
    //         console.info('\tfileRoot:', filePath,
    //         '\n\tfileName:', fileName,
    //         '\n\ttab:', tab
    //     )
    // }

    let spreadsheet
    try {
        spreadsheet = xlsx.readFile(
            filePath + fileName,
            { 'cellHTML': false, 'cellHTML': false, 'cellNF': false, 'cellText': false }
        )
    } catch (err) {
        args.stopAfterImport = true
        throw chalk.red('ERROR') + ': Unable to open file as spreadsheet input: \'' + filePath + fileName + '\''
    }

    const sheets = spreadsheet.SheetNames
    if (sheets.indexOf(tab) === -1) {
        args.stopAfterImport = true
        throw chalk.red('ERROR') + ': \'' + tab + '\' is not one of existing tabs: ' + JSON.stringify(sheets) + ' of file: ' + '\'' + fileName + '\'' 
    }
    const sheetData = spreadsheet.Sheets[tab]
    if (typeof sheetData === 'undefined' || typeof sheetData['!ref'] === 'undefined') {
        // args.stopAfterImport = true
        throw chalk.yellow('WARNING') + ': Tab: \'' + tab + '\' in file: \'' + filePath + fileName + '\' does not contain data'
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
    let data = {'milestones':{}}
    let milestoneStart = 999
    let milestoneName = ''
    // const milestoneTemplate = {
    //     "easy": { "sdi": 0, "sdii": 0, "sdiii": 0 },
    //     "medium": { "sdi": 0, "sdii": 0, "sdiii": 0 },
    //     "hard": { "sdi": 0, "sdii": 0, "sdiii": 0 }
    // }
    // let milestone = {}

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

        // start with the deliverable information
        if (row >= DELIVERABLEInfoStart && row <= DELIVERABLEInfoEnd && col === 'B') {
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
        if (row >= MILESTONEInfoStart) {

            // see if a new milestone collection needs to be started
            // current exel spreadsheet template has both 'Milestone' and 'dlieverable Difficulty' in col A
            if (col === 'A' && value !== 'Difficulty') {
                
                // start of a milestone group
                //  reset state machine variables
                milestoneStart = row
                if (value === 'Coding - Implementation Time') value = 'Coding'
                milestoneName = value

                // // display output iff 
                // //      (args.showImports is set and typeof showImports === boolean)
                // //   or
                // //      (args.showImports is set and showImports === tab)
                // //   or
                // //      (args.showImports is set and showImports matches data['Deliverable Number']
                // // console.info(typeof args.showImports, args.showImports, tab, data['Deliverable Number'])
                // if (args.showImports 
                //     && (
                //         'boolean' === typeof args.showImports
                //         || type === 'Default' && tab === args.showImports
                //         || type === 'Estimate' && data['Deliverable Number'] === args.showImports
                //         // NOTE: Correct deliverable name and number aren't set until AFTER readMilestone() so can't use to filter here!
                //         // NOTE: the following are not selective enough! so DON'T USE THEM!
                //         // || type === 'Estimate' && data['Estimate File Name'] !== args.hierarchySource
                //         // || type === 'Estimate' && data['Deliverable Number'] === 'TDxxx'
                //         // || type === 'Estimate' && data['Deliverable Number'] === 'IDx'
                //     )
                // ){
                //     console.info(milestoneName.padEnd(20,' '), '( row:', row, ')')
                // }
                
                // ensure there is somewhere to store incomming values
                if (typeof data.milestones[milestoneName] === 'undefined') {
                    data.milestones[milestoneName] = {
                        "easy": { 
                            "sdi": {"min":0, "expected":0,"max":0},
                            "sdii": { "min": 0, "expected": 0, "max": 0 }, 
                            "sdiii": { "min": 0, "expected": 0, "max": 0 } },
                        "medium": { 
                            "sdi": { "min": 0, "expected": 0, "max": 0 }, 
                            "sdii": { "min": 0, "expected": 0, "max": 0 }, 
                            "sdiii": { "min": 0, "expected": 0, "max": 0 } },
                        "hard": { 
                            "sdi": { "min": 0, "expected": 0, "max": 0 }, 
                            "sdii": { "min": 0, "expected": 0, "max": 0 }, 
                            "sdiii": { "min": 0, "expected": 0, "max": 0 } }
                    }
                }
            }

            // for new milestone collection, gather easy, medium, and hard values
            if (milestoneStart + 3 === row) {
                // import difficulty === easy
                if (col === 'C') data.milestones[milestoneName].easy.sdi.min = value
                if (col === 'D') data.milestones[milestoneName].easy.sdi.expected = value
                if (col === 'E') data.milestones[milestoneName].easy.sdi.max = value
                if (col === 'F') data.milestones[milestoneName].easy.sdii.min = value
                if (col === 'G') data.milestones[milestoneName].easy.sdii.expected = value
                if (col === 'H') data.milestones[milestoneName].easy.sdii.max = value
                if (col === 'I') data.milestones[milestoneName].easy.sdiii.min = value
                if (col === 'J') data.milestones[milestoneName].easy.sdiii.expected = value
                if (col === 'K') data.milestones[milestoneName].easy.sdiii.max = value
            }
            else if (milestoneStart + 4 === row) {
                // import difficulty === medium
                if (col === 'C') data.milestones[milestoneName].medium.sdi.min = value
                if (col === 'D') data.milestones[milestoneName].medium.sdi.expected = value
                if (col === 'E') data.milestones[milestoneName].medium.sdi.max = value
                if (col === 'F') data.milestones[milestoneName].medium.sdii.min = value
                if (col === 'G') data.milestones[milestoneName].medium.sdii.expected = value
                if (col === 'H') data.milestones[milestoneName].medium.sdii.max = value
                if (col === 'I') data.milestones[milestoneName].medium.sdiii.min = value
                if (col === 'J') data.milestones[milestoneName].medium.sdiii.expected = value
                if (col === 'K') data.milestones[milestoneName].medium.sdiii.max = value
            }
            else if (milestoneStart + 5 === row) {
                // import difficulty === hard
                if (col === 'C') data.milestones[milestoneName].hard.sdi.min = value
                if (col === 'D') data.milestones[milestoneName].hard.sdi.expected = value
                if (col === 'E') data.milestones[milestoneName].hard.sdi.max = value
                if (col === 'F') data.milestones[milestoneName].hard.sdii.min = value
                if (col === 'G') data.milestones[milestoneName].hard.sdii.expected = value
                if (col === 'H') data.milestones[milestoneName].hard.sdii.max = value
                if (col === 'I') data.milestones[milestoneName].hard.sdiii.min = value
                if (col === 'J') data.milestones[milestoneName].hard.sdiii.expected = value
                if (col === 'K') data.milestones[milestoneName].hard.sdiii.max = value
            }
        }

    }

    return data

}

module.exports.readMilestone = readMilestone
