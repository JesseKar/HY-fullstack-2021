const logger = require('./logger')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => (likes += blog.likes), 0)
}

const favoriteBlog = (blogs) => {
  const firstBlog = blogs[0]
  logger.info('first blog likes', firstBlog.likes)

  const favorite = blogs
    .reduce((currentFavourite, blog) =>
      (blog.likes > currentFavourite.likes
        ? blog
        : currentFavourite),
    firstBlog)
  logger.info('favorite likes:', favorite.likes)

  return ( {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  })
}

const mostBlogs = (blogs) => {
  const blogCounter = {}
  const firstBlog = blogs[0]
  logger.info('first blog author', firstBlog.author)

  blogs.forEach(blog => {
    if(!blogCounter[blog.author]) {
      blogCounter[blog.author] = {
        author: blog.author,
        blogs: 1
      }
    } else {
      blogCounter[blog.author].blogs += 1
    }
  })

  const allAuthors = Object.values(blogCounter)
  // logger.info(allAuthors)
  const firstAuthor = allAuthors[0]

  const authorWithMostBlogs = allAuthors
    .reduce((currentWithMost, author) =>
      (author.blogs > currentWithMost.blogs
        ? author
        :currentWithMost),
    firstAuthor)
  logger.info('most blogs has:', authorWithMostBlogs.author)
  return ( {
    author: authorWithMostBlogs.author,
    blogs: authorWithMostBlogs.blogs
  })
}

const mostLikes = (blogs) => {
  const blogCounter = {}

  blogs.forEach(blog => {
    if(!blogCounter[blog.author]) {
      blogCounter[blog.author] = {
        author: blog.author,
        likes: blog.likes
      }
    } else {
      blogCounter[blog.author].likes += blog.likes
    }
  })
  const allAuthors = Object.values(blogCounter)
  logger.info(allAuthors)
  const firstAuthor = allAuthors[0]
  logger.info(firstAuthor)

  const authorWithMostLikes = allAuthors
    .reduce((currentWithMost, author) =>
      (author.likes > currentWithMost.likes
        ? author
        :currentWithMost),
    firstAuthor)
  logger.info('most likes has:', authorWithMostLikes.author)
  return ( {
    author: authorWithMostLikes.author,
    likes: authorWithMostLikes.likes
  })

}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}