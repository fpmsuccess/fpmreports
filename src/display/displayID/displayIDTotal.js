
function displayIDTotal(args, id) {
    let output = ''
    
    // start with estimated man hours
    output = '\nID Totals'
    output += '\n   Estimate (manHrs):'.padEnd(25, ' ')
        + 'min:'.padStart(10, ' ').padEnd(10, ' ') + ('' + id.total.min).padStart(5, ' ') + ', '
        + 'expected:'.padStart(10, ' ') + ('' + id.total.expected).padStart(5, ' ') + ', '
        + 'max:'.padStart(10, ' ') + ('' + id.total.max).padStart(5, ' ')

    // next 'Difficulty'
    output += '\n   Difficulty:'.padEnd(25, ' ')
        + 'Easy:'.padStart(10, ' ').padEnd(10, ' ') + ('' + id.difficulty.easy).padStart(5, ' ') + ', '
        + 'Medium:'.padStart(10, ' ') + ('' + id.difficulty.medium).padStart(5, ' ') + ', '
        + 'Hard:'.padStart(10, ' ') + ('' + id.difficulty.hard).padStart(5, ' ') + ', '
        + 'Total:'.padStart(10, ' ') + ('' + (id.difficulty.easy + id.difficulty.medium + id.difficulty.hard)).padStart(5, ' ')
        
    // process 'Skill'
    output += '\n   Skill:'.padEnd(25, ' ')
        + 'SD I:'.padStart(10, ' ').padEnd(10, ' ') + ('' + id.skill.sdi).padStart(5, ' ') + ', '
        + 'SD II:'.padStart(10, ' ') + ('' + id.skill.sdii).padStart(5, ' ') + ', '
        + 'SD III:'.padStart(10, ' ') + ('' + id.skill.sdiii).padStart(5, ' ') + ', '
        + 'Total:'.padStart(10, ' ') + ('' + (id.skill.sdi + id.skill.sdii + id.skill.sdiii)).padStart(5, ' ')

    output += '\n'
    
    // process 'td Counts'
    output += '\n   TD Count:'.padEnd(25, ' ')
        + 'total:'.padStart(10).padEnd(10, ' ') + ('' + id.tdCount).padStart(5, ' ') + ', '
            + 'estimates:'.padStart(10, ' ') + ('' + id.tdDefaultEstimates).padStart(5, ' ')
        + (' (' + (id.tdDefaultEstimates*100)/id.tdCount + '%)').padStart(7, ' ')
    
    // process 'id Counts'
    output += '\n   ID Count:'.padEnd(25, ' ')
        + 'total:'.padStart(10, ' ').padEnd(10, ' ') + ('' + id.idCount).padStart(5, ' ') + ', '
        + 'defaults:'.padStart(10, ' ').padEnd(10, ' ') + ('' + id.idDefaultEstimates).padStart(5, ' ')
        + (' (' + (id.idDefaultEstimates*100/ id.idCount) + '%)').padStart(7, ' ')
        
    console.log(output)
}

module.exports.displayIDTotal = displayIDTotal