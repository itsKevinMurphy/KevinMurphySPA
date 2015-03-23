var mongoose = require('mongoose');

// define model ===============================================================

var patientSchema = new mongoose.Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phoneNo: { type: String, trim: true },
    lastVisitDate: { type: Date, default: Date.now },
    status: { type: Boolean, default:true}
});

patientSchema.index({lastName:1});
var Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
console.log('Patient Schema Loaded');