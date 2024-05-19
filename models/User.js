const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    properties: { type: Map, of: String }
});

// added so that same user can exist in different lists but not in the same list
UserSchema.index({ email: 1, listId: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
