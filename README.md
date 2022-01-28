# FPM Schedule Rollup

# CLI Options
node app.js <options>
    --fileRoot 'absolute or relative path to the directory containing the Hierarchy Index'
        default: './' (current directory)

    --hierarchySource 'file name of the file containing the Hierarchy Index'
        default: 'elbert - std costing.xlsx'

    --indexTab 'tab name of the tab containing the Hierarchy Index'
        default: 'Hierarchy Index'

    --defaultTDScheduleTab 'tab name of the tab containing the Default TD Schedule'
        default: 'Default TD Schedule'

    --defaultIDScheduleTab 'tab name of the tab containing the Default ID Schedule'
        default: 'Default ID Schedule'

    --defaultPDScheduleTab 'tab name of the tab containing the Default PD Schedule'
        default: 'Default PD Schedule'

    --show [sIndex, deliverables, tdEst, milestones]
        sIndex = show the Scheduler Index (as imported)
        deliverables = show the deliverables hierarchy
        milestones = show the TD milestones as part of the deliverable hierarchy
        NOTE: multiple '--show' options can be specified on the same command line

    --showLevel [pd, id, td, milestones]
        pd = show only the PD information
        id = show the PD and ID information
        td = show the PD, ID, and TD information
        milestones = show the PD, ID, TD and Milestone information
        NOTE: only one '--showLevel' option can be specified on one command line
            default: td

Win10 examples:
  - `node app.js --fileRoot ..\StdCosting\`
  - `node app.js --fileRoot ..\StdCosting\ --show deliverables`
  - `node app.js --fileRoot ..\StdCosting\ --show deliverables --showLimit id`
  - `node app.js --fileRoot ..\StdCosting\ --show deliverables --showLimit id --show onlyActiveTDs --show onlyActiveIDs`


Linux examples:
  - `node app.js --fileRoot ~/somewhere/`
  - `node app.js --fileRoot ~/somewhere/ --show deliverables`
  - `node app.js --fileRoot ~/somewhere/ --show deliverables --showLimit id`
