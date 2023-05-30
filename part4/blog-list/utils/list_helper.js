const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return total;
};

const favouriteBlog = (blogs) => {
  // finds out which blog has the most likes
  let counter = 0;
  let returnBlog = {};
  blogs.forEach((blog) => {
    if (blog.likes > counter) {
      returnBlog = blog;
      counter = blog.likes
    }
  });
  return {
    title: returnBlog.title,
    author: returnBlog.author,
    likes: returnBlog.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
};
