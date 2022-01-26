const xlsx = require('xlsx')

let data = {
    "Design": {
        "name": "",
        "easy": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "medium": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "hard": { "sdi": {}, "sdii": {}, "sdiii": {} }
    },
    'Design Review': {
        "name": "",
        "easy": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "medium": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "hard": { "sdi": {}, "sdii": {}, "sdiii": {} }
    },
    "Coding - Implementation Time": {
        "name": "",
        "easy": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "medium": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "hard": { "sdi": {}, "sdii": {}, "sdiii": {} }
    },
    'Code Review': {
        "name": "",
        "easy": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "medium": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "hard": { "sdi": {}, "sdii": {}, "sdiii": {} }
    },
    'Unit Test': {
        "name": "",
        "easy": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "medium": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "hard": { "sdi": {}, "sdii": {}, "sdiii": {} }
    },
    'Document': {
        "name": "",
        "easy": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "medium": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "hard": { "sdi": {}, "sdii": {}, "sdiii": {} }
    },
    'Final Review Prep': {
        "name": "",
        "easy": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "medium": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "hard": { "sdi": {}, "sdii": {}, "sdiii": {} }
    },
    'Final Review': {
        "name": "",
        "easy": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "medium": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "hard": { "sdi": {}, "sdii": {}, "sdiii": {} }
    },
    'Merge To Develop': {
        "name": "",
        "easy": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "medium": { "sdi": {}, "sdii": {}, "sdiii": {} },
        "hard": { "sdi": {}, "sdii": {}, "sdiii": {} }
    }
}

// read a spreadsheet and transform into objects
function readEstTDSchedule(fileName, tab) {
    // console.error('readEstTDSchedule() fileName:', fileName, 'tab:', tab)
    const spreadsheet = xlsx.readFile(
        fileName,
        { 'cellHTML': false, 'cellHTML': false, 'cellNF': false, 'cellText': false }
    )

    const sheets = spreadsheet.SheetNames
    // console.error('sheet names:', sheets)
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

    cols = {
        'sdiMin': 'C', 'sdiExpected': 'D', 'sdiMax': 'E',
        'sdiiMin': 'F', 'sdiiExpected': 'G', 'sdiiMax': 'H',
        'sdiiiMin': 'I', 'sdiiiExpected': 'J', 'sdiiiMax': 'K'
    }

    milestoneIndex = {
        'Design': { 'start': 9, 'easy': 12, 'medium': 13, 'hard': 14 },
        // 'Design Review': { 'start': 9, 'easy': 13, 'medium': 14, 'hard': 15 },
        'Coding - Implementation Time': { 'start': 16, 'easy': 19, 'medium': 20, 'hard': 21 },
        // 'Code Review': { 'start': 25, 'easy': 29, 'medium': 30, 'hard': 31 },
        // 'Unit Test': { 'start': 33, 'easy': 37, 'medium': 38, 'hard': 39 },
        // 'Document': { 'start': 41, 'easy': 45, 'medium': 46, 'hard': 47 },
        // 'Final Review Prep': { 'start': 49, 'easy': 53, 'medium': 54, 'hard': 55 },
        // 'Final Review': { 'start': 57, 'easy': 61, 'medium': 62, 'hard': 63 },
        // 'Merge To Develop': { 'start': 65, 'easy': 69, 'medium': 70, 'hard': 71 }
    }

    const keyCols = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
    let headers = {}

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

        // start with the TD specific info
        {
            let error = false
            if (row === 1 && col == 'B') {
                // console.info('checking row 1, col B value:', row, col, value)
                if (value === '') {
                    console.error('\tError: ', fileName, ':', tab, ' has missing \'Deliverable Name\' entry')
                    error = true
                } else {
                    // console.info('\tInfo: Saving Deliverable Name:', value)
                    data['Deliverable Name - TD Estimate Form'] = value
                }
            }
            if (row === 2 && col == 'B') {
                // console.info('checking row 2, col B value:', row, col, value)
                if (value === '') {
                    console.error('\tError: ', fileName, ':', tab, ' has missing \'Deliverable Number\' entry')
                    error = true
                } else {
                    // console.info('\tInfo: Saving Deliverable Number:', value)
                    data['Deliverable Number'] = value
                }
            }
            if (row === 4 && col == 'B') {
                if (value === 'Level of Difficulty (Example)' || value === '') {
                    console.error('\tError: ', fileName, ':', tab, ' has invalid \'Deliverable Difficulty Level\' selection')
                    error = true
                } else {
                    data['Difficulty Level'] = value
                }
            }
            if (row === 5 && col == 'B') {
                if (value === 'Skill Level (Example)' || value === '') {
                    console.error('\tError: ', fileName, ':', tab, ' has invalid \'Skill Level\' selection')
                    error = true
                } else {
                    data['Recommended Skill Level'] = value
                }
            }
            if (row === 6 && col == 'B') {
                if (value === 'first last' || value === '') {
                    console.error('\tError: ', fileName, ':', tab, ' has invalid \'Person creating Estimate\' selection')
                    error = true
                } else {
                    data['Person Creating Estimate'] = value
                }
            }

            // if a parsing error has been detected return with a null
            if (error === true) {
                console.info('\tWarning: parsing error on TDxxx Form')
                return null
            }
        }

        // only process interesting columns
        if (keyCols.includes(col)) {
            convertMatrix('Design', row, col, value)
            // convertMatrix('Design Review', row, col, value)
            convertMatrix('Coding - Implementation Time', row, col, value)
            // convertMatrix('Code Review', row, col, value)
            // convertMatrix('Unit Test', row, col, value)
            // convertMatrix('Document', row, col, value)
            // convertMatrix('Final Review Prep', row, col, value)
            // convertMatrix('Final Review', row, col, value)
            // convertMatrix('Merge To Develop', row, col, value)
        }
    }

    // console.info('data:', data)
    return data
}

function convertMatrix(milestone, row, col, value) {
    // console.info('milestone:', milestone, 'row:', row, 'col:', col, 'value:', value)
    // console.info('typeof milestoneIndex[milestone]:', typeof milestoneIndex[milestone])
    if (typeof milestoneIndex[milestone] === 'undefined') {
        if (col === 'A')
            console.error('\tWarning: milestone:', milestone, 'is not located in milestoneIndex array')
        return
    }
    if (row >= milestoneIndex[milestone].start && row <= milestoneIndex[milestone].hard) {
        if (row === milestoneIndex[milestone].start && col === 'A') {
            // console.info('milestone:', milestone, ', row:', row, 
            //             // 'milestoneIndex[milestone].start', milestoneIndex[milestone].start, 
            //             ', col:', col, ', value:', value, 
            // //             // data,
            // //             // data.coding, 
            // //             data[milestone]
            // )
            data[milestone].name = value
        } else if (row === milestoneIndex[milestone].easy) {
            if (col === cols.sdiMin) data[milestone].easy.sdi.min = value
            if (col === cols.sdiExpected) data[milestone].easy.sdi.expected = value
            if (col === cols.sdiMax) data[milestone].easy.sdi.max = value
            if (col === cols.sdiiMin) data[milestone].easy.sdii.min = value
            if (col === cols.sdiiExpected) data[milestone].easy.sdii.expected = value
            if (col === cols.sdiiMax) data[milestone].easy.sdii.max = value
            if (col === cols.sdiiiMin) data[milestone].easy.sdiii.min = value
            if (col === cols.sdiiiExpected) data[milestone].easy.sdiii.expected = value
            if (col === cols.sdiiiMax) data[milestone].easy.sdiii.max = value
            // console.info('data[milestone].easy test:', data[milestone].easy)
        } else if (row === milestoneIndex[milestone].medium) {
            if (col === cols.sdiMin) data[milestone].medium.sdi.min = value
            if (col === cols.sdiExpected) data[milestone].medium.sdi.expected = value
            if (col === cols.sdiMax) data[milestone].medium.sdi.max = value
            if (col === cols.sdiiMin) data[milestone].medium.sdii.min = value
            if (col === cols.sdiiExpected) data[milestone].medium.sdii.expected = value
            if (col === cols.sdiiMax) data[milestone].medium.sdii.max = value
            if (col === cols.sdiiiMin) data[milestone].medium.sdiii.min = value
            if (col === cols.sdiiiExpected) data[milestone].medium.sdiii.expected = value
            if (col === cols.sdiiiMax) data[milestone].medium.sdiii.max = value
            // console.info('data[milestone].medium test:', data[milestone].medium)
        } else if (row === milestoneIndex[milestone].hard) {
            if (col === cols.sdiMin) data[milestone].hard.sdi.min = value
            if (col === cols.sdiExpected) data[milestone].hard.sdi.expected = value
            if (col === cols.sdiMax) data[milestone].hard.sdi.max = value
            if (col === cols.sdiiMin) data[milestone].hard.sdii.min = value
            if (col === cols.sdiiExpected) data[milestone].hard.sdii.expected = value
            if (col === cols.sdiiMax) data[milestone].hard.sdii.max = value
            if (col === cols.sdiiiMin) data[milestone].hard.sdiii.min = value
            if (col === cols.sdiiiExpected) data[milestone].hard.sdiii.expected = value
            if (col === cols.sdiiiMax) data[milestone].hard.sdiii.max = value
            // console.info('data[milestone].hard test:', data[milestone].hard)
        }
    }
}

module.exports.readEstTDSchedule = readEstTDSchedule
