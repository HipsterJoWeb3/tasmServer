import {
  addPostService,
  editPostService,
  getAllPostsService,
  removePostService,
  getPostByIdService
} from '../services/postService.js'



class PostsController {
  async getAll(req, res, next) {
    try {
      const { category } = req.params


      const posts = await getAllPostsService(category)

      return res.status(200).json(posts)
    } catch(e) {
      next(e)
    }
  }


  async getPostById(req, res, next) {
    try {
      const { id } = req.params

      const post = await getPostByIdService(id)

      return res.status(200).json(post)
    } catch(e) {
      console.log(e)
      next(e)
    }
  }



  async addPost(req, res, next) {
    try {
      const post = await addPostService(req.body, req.userId)

      return res.status(200).json(post)
    } catch(e) {
      next(e)
    }
  }


  async removePost(req, res, next) {
    try {
      const {id} = req.params

      const post = await removePostService(id)

      return res.status(200).json(post)
    } catch(e) {
      next(e)
    }
  }


  async editPost(req, res, next) {
    try {
      const { id } = req.params
      const { body } = req
      const post = await editPostService({ id, ...body }, req.userId)

      return res.status(200).json(post)
    } catch(e) {
      next(e)
    }
  }

  async upload(req, res, next) {
    try {
      return res.status(200).json({
        url: `/uploads/${req.file.originalname}`
      })
    } catch(e) {
      next(e)
    }
  }
}


export default new PostsController()
