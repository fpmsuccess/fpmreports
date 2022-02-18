function displayPDSummary(args, pd) {
    let output = ''

    // start with estimated man hours
    output = 'PD Summary (= PD Integration + Σ(IDx))'

    // manHr rollup
    output += '\n  Estimate (manHrs):'.padEnd(25, ' ')
        + 'Minimum:'.padStart(10, ' ').padEnd(10, ' ') + ('' + pd.total.min).padStart(5, ' ') + ', '
        + 'Expected:'.padStart(10, ' ') + ('' + pd.total.expected).padStart(5, ' ') + '\'' 
        + 'Maximum:'.padStart(10, ' ') + ('' + pd.total.max).padStart(5, ' ')

    // 'Difficulty'
    output += '\n  Difficulty:'.padEnd(25, ' ')
        + 'Easy:'.padStart(10, ' ').padEnd(10, ' ') + ('' + pd.difficulty.easy).padStart(5, ' ') + ', '
        + 'Medium:'.padStart(10, ' ') + ('' + pd.difficulty.medium).padStart(5, ' ') + ', '
        + 'Hard:'.padStart(10, ' ') + ('' + pd.difficulty.hard).padStart(5, ' ')
        // + '\'' + 'Total:'.padStart(10, ' ') + ('' + (pd.difficulty.easy + pd.difficulty.medium + pd.difficulty.hard)).padStart(5, ' ')

    // 'Skill'
    output += '\n  Skill:'.padEnd(25, ' ')
        + 'SD I:'.padStart(10, ' ').padEnd(10, ' ') + ('' + pd.skill.sdi).padStart(5, ' ') + ', '
        + 'SD II:'.padStart(10, ' ') + ('' + pd.skill.sdii).padStart(5, ' ') + ', '
        + 'SD III:'.padStart(10, ' ') + ('' + pd.skill.sdiii).padStart(5, ' ')
        // + ', ' + 'Total:'.padStart(10, ' ') + ('' + (pd.skill.sdi + pd.skill.sdii + pd.skill.sdiii)).padStart(5, ' ')

    // display 'id Count'
    output += '\n  Total #IDs (in PD):'.padEnd(25, ' ')
        + 'total:'.padStart(10, ' ').padEnd(10, ' ') + ('' + pd.idCount).padStart(5, ' ') + ', '
        + 'defaults:'.padStart(10, ' ').padEnd(10, ' ') + ('' + pd.idDefaultEstimates).padStart(5, ' ')
        + (' (' + (pd.idDefaultEstimates * 100 / pd.idCount).toLocaleString('en-US', {maximumFractionDigits:1}) + '%)').padStart(7, ' ')

    // display 'td Count'
    output += '\n  Total #TDs (in PD):'.padEnd(25, ' ')
        + 'total:'.padStart(10).padEnd(10, ' ') + ('' + pd.tdCount).padStart(5, ' ') + ', '
        + 'defaults:'.padStart(10, ' ') + ('' + pd.tdDefaultEstimates).padStart(5, ' ')
        + (' (' + ((pd.tdDefaultEstimates * 100) / pd.tdCount).toLocaleString('en-US', { maximumFractionDigits: 1 }) + '%)').padStart(7, ' ')

    // // display 'pd Count'
    // output += '\n  PD Count:'.padEnd(25, ' ')
    //     + 'total:'.padStart(10, ' ').padEnd(10, ' ') + ('' + pd.pdCount).padStart(5, ' ') + ', '
    //     + 'defaults:'.padStart(10, ' ') + ('' + pd.pdDefaultEstimates).padStart(5, ' ')
    //     + (' (' + (pd.pdDefaultEstimates * 100 / pd.pdCount) + '%)').padStart(7, ' ')

    console.log(output)
}

module.exports.displayPDSummary = displayPDSummary