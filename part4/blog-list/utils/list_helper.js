const lo = require('lodash');
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return total;
};

const favouriteBlog = (blogs) => {
  // finds out which blog has the most likes
  if (blogs.length === 0) {
    return {};
  }
  let counter = 0;
  let returnBlog = {};
  blogs.forEach((blog) => {
    if (blog.likes > counter) {
      returnBlog = blog;
      counter = blog.likes;
    }
  });
  return {
    title: returnBlog.title,
    author: returnBlog.author,
    likes: returnBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const author = lo.countBy(blogs, (blog) => blog.author);
  const bestAuthor = lo.max(Object.keys(author), (o) => author[o]);
  return { author: bestAuthor, blogs: author[bestAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const author = lo.groupBy(blogs, (blog) => blog.author);
  const authors = Object.keys(author);
  const books = Object.values(author);
  const authorLikes = [];
  books.forEach((book) => {
    const bookLikes = book.reduce((sum, obj) => sum + obj.likes, 0);
    authorLikes.push(bookLikes);
  });
  const maxLikes = lo.max(authorLikes);
  const authorId = authorLikes.findIndex((num) => num === maxLikes);
  return {author: authors[authorId], likes: maxLikes}
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
