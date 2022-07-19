import mongoose from 'mongoose'


const PostSchema = new mongoose.Schema({
  text: {type: String, required: true},
  title: {type: String, required: true},
  updatedOn: { type: Date, default: Date.now },
  category: {required: true, type: String},
  imageURL: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})


export default mongoose.model('Post', PostSchema)
