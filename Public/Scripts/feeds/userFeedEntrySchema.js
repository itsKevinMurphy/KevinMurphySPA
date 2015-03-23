var mongoose = require('mongoose');

// define model ===============================================================
var userFeedEntrySchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId },
    feedEntryID: { type: mongoose.Schema.Types.ObjectId },
    feedID: { type: mongoose.Schema.Types.ObjectId },
    read: { type: Boolean, default: false },
},
{ collection: 'userFeedEntry' }
);

userFeedEntrySchema.index({ userID: 1, feedID: 1, feedEntryID: 1, read: 1 });
var UserFeedEntryModel = mongoose.model("UserFeedEntry", userFeedEntrySchema);
module.exports = UserFeedEntryModel;
console.log('User Feed Entry Schema Loaded');