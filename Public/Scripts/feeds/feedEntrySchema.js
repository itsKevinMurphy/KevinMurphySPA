var mongoose = require('mongoose');

// define model ===============================================================
var feedEntrySchema = new mongoose.Schema({
    description: { type: String, trim: true },
    title: { type: String, trim: true },
    summary: { type: String, trim: true },
    entryID: { type: String, trim: true },
    publishedDate: { type: Date },
    link: { type: String, trim: true },
    feedID: { type: mongoose.Schema.Types.ObjectId },
    state: { type: String, trim: true, lowercase: true, default: 'new' },
    created: { type: Date, default: Date.now },
},
{collection:'feedEntry'}
);

feedEntrySchema.index({ entryID:1});
feedEntrySchema.index({ feedID:1 });

var FeedEntryModel = mongoose.model("FeedEntry", feedEntrySchema);
module.exports = FeedEntryModel;

console.log('Feed Entry Schema Loaded');