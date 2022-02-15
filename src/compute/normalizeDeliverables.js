const { tdMergeEstimatesWDefault } = require("./td/tdMergeEstimatesWDefault")
const { idMergeEstimatesWDefault } = require("./id/idMergeEstimatesWDefault")
const { pdMergeEstimatesWDefault } = require("./pd/pdMergeEstimatesWDefault")

function normalizeDeliverables(args) {

    tdMergeEstimatesWDefault(args)
    idMergeEstimatesWDefault(args)
    pdMergeEstimatesWDefault(args)
}

module.exports.normalizeDeliverables = normalizeDeliverables