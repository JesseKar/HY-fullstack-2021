const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
//-----------------------------------------------
describe ('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('two blogs found', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })
})
//-----------------------------------------------
describe('viewing specific blogs', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('expect id as identifier', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog =>
      expect(blog.id).toBeDefined())
  })
})
//---------------------------------------------
describe('posting a new blog', () => {
  test('valid blog can be added', async () => {
    const newBlog = {
      title: 'valid blog added',
      author: 'Author Author',
      url: 'uknown.url',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const authors = blogsAtEnd.map(a => a.author)
    expect(authors).toContain('Author Author')
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('valid blog added')
  })

  test('empty likes field set likes to 0', async () => {
    const newBlog = {
      title: 'blog without likes added',
      author: 'Without Likes',
      url: 'uknown.url'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('empty title field cause 400 Bad Request', async () => {
    const newBlog = {
      author: 'Without Title',
      url: 'without.title.org',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('empty url field cause 400 Bad Request', async () => {
    const newBlog = {
      title: 'this blog has no url',
      author: 'Without TitleAndUrl',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})
//----------------------------
describe('when deleting', () => {
  test('blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})
//---------------------------
describe('when updating', () => {
  test('blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.title = 'this title was updated'

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('this title was updated')
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length)
  })
})
//---------------------------
afterAll(() => {
  mongoose.connection.close()
})