import mongoose from 'mongoose';

// Define the schema for an article
const articleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' },
    image: { type: String, required: true }
});

export default mongoose.model('Article', articleSchema);