// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  totalActiveCases: { type: String, required: true },
  totalCuredCases: { type: String, required: true },
  totalDeathCases: { type: String, required: true },
  stateWise: [{
    sNo: { type: String, required: true },
    state: { type: String, required: true },
    confirmedDomestic: { type: String, required: true },
    cured: { type: String, required: true },
    death: { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

const CoronaData = mongoose.model('CoronaData', dataSchema);

module.exports = CoronaData