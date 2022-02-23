function displayIDSummary(args, id) {
    let output = ''

    // start with estimated man hours
    output = 'ID Summary (= ID Integration + Σ(TDxxx))'

    // manHr rollup
    output += '\n  Estimate (manHrs):'.padEnd(20, ' ')
        + 'min:'.padStart(10, ' ').padEnd(10, ' ') + ('' + id.total.min).padStart(5, ' ') + ', '
        + 'expected:'.padStart(10, ' ') + ('' + id.total.expected).padStart(5, ' ') + ', '
        + 'max:'.padStart(10, ' ') + ('' + id.total.max).padStart(5, ' ')

    // 'Difficulty'
    output += '\n  Difficulty:'.padEnd(20, ' ')
        + 'Easy:'.padStart(10, ' ').padEnd(10, ' ') + ('' + id.difficulty.easy).padStart(5, ' ') + ', '
        + 'Medium:'.padStart(10, ' ') + ('' + id.difficulty.medium).padStart(5, ' ') + ', '
        + 'Hard:'.padStart(10, ' ') + ('' + id.difficulty.hard).padStart(5, ' ')
        // + ', ' + 'Total:'.padStart(10, ' ') + ('' + (id.difficulty.easy + id.difficulty.medium + id.difficulty.hard)).padStart(5, ' ')
        
    // 'Skill'
    output += '\n  Skill:'.padEnd(20, ' ')
        + 'SD I:'.padStart(10, ' ').padEnd(10, ' ') + ('' + id.skill.sdi).padStart(5, ' ') + ', '
        + 'SD II:'.padStart(10, ' ') + ('' + id.skill.sdii).padStart(5, ' ') + ', '
        + 'SD III:'.padStart(10, ' ') + ('' + id.skill.sdiii).padStart(5, ' ') 
        // + ', ' + 'Total:'.padStart(10, ' ') + ('' + (id.skill.sdi + id.skill.sdii + id.skill.sdiii)).padStart(5, ' ')

    // 'td Counts'
    output += '\n  TD Count:'.padEnd(20, ' ')
        + 'total:'.padStart(10).padEnd(10, ' ') + ('' + id.tdCount).padStart(5, ' ') + ', '
        + 'estimates:'.padStart(10, ' ') + ('' + id.tdDefaultEstimates).padStart(5, ' ')
        + (' (' + ((id.tdDefaultEstimates * 100) / id.tdCount).toLocaleString('en-US', { minimumFractionDigits:1, maximumFractionDigits: 1 }) + '%)').padStart(7, ' ')
    
    // // process 'id Counts'
    // output += '\n  ID Count:'.padEnd(20, ' ')
    //     + 'total:'.padStart(10, ' ').padEnd(10, ' ') + ('' + id.idCount).padStart(5, ' ') + ', '
    //     + 'estimates:'.padStart(10, ' ').padEnd(10, ' ') + ('' + id.idDefaultEstimates).padStart(5, ' ')
    //     + (' (' + (id.idDefaultEstimates*100/ id.idCount) + '%)').padStart(7, ' ')
        
    console.log(output)
}

module.exports.displayIDSummary = displayIDSummary