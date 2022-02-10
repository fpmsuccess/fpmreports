const { tdMergeEstimatesWDefault } = require("../../compute/td/tdMergeEstimatesWDefault")
const { idMergeEstimatesWDefault } = require("../../compute/id/idMergeEstimatesWDefault")
const { pdMergeEstimatesWDefault } = require("../../compute/pd/pdMergeEstimatesWDefault")

function normalizeDeliverables(args) {

    tdMergeEstimatesWDefault(args)
    idMergeEstimatesWDefault(args)
    pdMergeEstimatesWDefault(args)
}

module.exports.normalizeDeliverables = normalizeDeliverables