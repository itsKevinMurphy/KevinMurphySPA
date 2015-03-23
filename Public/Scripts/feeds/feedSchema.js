var mongoose = require('mongoose');

// define model ===============================================================
var feedSchema = new mongoose.Schema({
    feedURL: { type: String, trim: true },
    link : { type: String, trim: true },
    description: { type: String, trim: true },
    state: { type: String, trim: true, lowercase: true, default: 'new' },
    created: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
},
{ collecton: 'feed' }
);

feedSchema.index({ feedURL: 1 }, { unique: true });
feedSchema.index({ link: 1 }, { unique: true, sparse:true });

var FeedModel = mongoose.model("Feed", feedSchema);
module.exports = FeedModel;
console.log('Feed Schema Loaded');