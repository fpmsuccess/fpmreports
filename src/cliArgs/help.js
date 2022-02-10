function help() {
    console.log('fpmRollup:')
    console.log('\n  Usage:')
    console.log('\n     node app.js <options>')
    console.log('\t\t where options can include one or more of the following:')
    console.log()
    console.log('\t --showTDxxxDefault \t\t\t not implemented')
    console.log('\t --showTDxxxEstimate [TD101..TD999]')
    console.log('\t --showTDxxxMilestones [TD101..TD999]')
    console.log('\t --showTDxxxMilestonesTotal [TD101..TD999]')
    console.log()
    console.log('\t --showIDxEstimate [ID1..ID9]')
    console.log('\t --showIDxMilestones [ID1..ID9]')
    console.log('\t --showIDxMilestonesTotal [ID1..ID9]')
    console.log('\t --showIDxTDsTotal [ID1..ID9]')
    console.log('\t --showIDxTotal [ID1..ID9]')
    console.log()
    console.log('\t --Active \t\t\t\t only display IDx or TDxxx that are marked Active')
    console.log('\t --options \t\t\t\t display the command line options')
    process.exit(1)
}

module.exports.help = help