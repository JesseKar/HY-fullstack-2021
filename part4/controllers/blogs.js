const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get all
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

// get by id
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})
// post
blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON())
})

// delete
blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

// update
blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog.toJSON())
})

module.exports = blogsRouter