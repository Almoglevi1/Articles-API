const mongoose = require('mongoose');

// Define the schema for a category
const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);