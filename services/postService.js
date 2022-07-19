import PostModel from '../models/PostModel.js'
import ApiError from '../exception/apiError.js'

export const addPostService = async ({text, title, imageURL, category}, userId) => {

  const doc = new PostModel({
    title,
    text,
    imageURL,
    category,
    user: userId
  })

  const post = await doc.save()

  return post
}


export const editPostService = async ({text, title, imageURL, category, id}, userId) => {

  const { matchedCount } = await PostModel.updateOne(
    {
      _id: id
    },
    {
      title,
      text,
      category,
      imageURL
    }
  )

  if(matchedCount && matchedCount > 0) return {message: 'success'}

  throw ApiError.BadRequest('Пост не найден')

}


export const getAllPostsService = async category => {


  const posts = await PostModel.find({category})

  const updatePosts = posts.map(item => {
    return {
      _id: item._id,
      user: item.user,
      title: item.title,
      imageURL: item.imageURL,
      category: item.category
    }
  })

  return updatePosts
}


export const removePostService = async (postId) => {
  const post = await PostModel.findOneAndDelete({_id: postId})

  if(!post) throw ApiError.BadRequest('Пост не найден')


  return {_id: postId}
}


export const getPostByIdService = async id => {


  const post = await PostModel.findById(id)


  if(!post) throw ApiError.BadRequest('Пост не найден')

  return post
}
