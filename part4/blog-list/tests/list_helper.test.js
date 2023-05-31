const listHelper = require('../utils/list_helper');

describe('Dummy test', () => {
  test('Dummy returns one ', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('Total likes', () => {
  const oneBlogArray = [
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
  ];

  const someBlogs = [
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test1',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test2',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 11,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test3',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 0,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test4',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
  ];

  test('Empty list is 0', () => {
    expect(listHelper.totalLikes([])).toEqual(0);
  });

  test('List has only one blog, equals to likes of the blog', () => {
    const result = listHelper.totalLikes(oneBlogArray);
    expect(result).toBe(12);
  });

  test('List has more than one blog contains the total', () => {
    const result = listHelper.totalLikes(someBlogs);
    expect(result).toEqual(35);
  });
});

describe('Favourite blog', () => {
  const oneBlogArray = [
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
  ];
  const someBlogs = [
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test1',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test2',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 11,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test3',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 0,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test4',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
  ];
  const bestBlog = {
    title: 'Test1',
    author: 'TestAuthor',
    likes: 12,
  };

  test('Empty list, returns an empty object', () => {
    const result = listHelper.favouriteBlog([]);
    expect(result).toEqual({});
  });

  test('Single blog returns the blog', () => {
    const result = listHelper.favouriteBlog(oneBlogArray);
    expect(result).toEqual({ title: 'Test', author: 'TestAuthor', likes: 12 });
  });

  test('Returns the first blog, with join highest number of likes', () => {
    const blog = listHelper.favouriteBlog(someBlogs);
    expect(blog).toEqual(bestBlog);
  });
});

describe('Most blogs', () => {
  const someBlogs = [
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test1',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test2',
      author: 'TestAuthor2',
      url: 'SomeHTTPHere',
      likes: 11,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test3',
      author: 'TestAuthor2',
      url: 'SomeHTTPHere',
      likes: 0,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test4',
      author: 'TestAuthor2',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
  ];

  const someBlogsTied = [
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test1',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test2',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 11,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test3',
      author: 'TestAuthor2',
      url: 'SomeHTTPHere',
      likes: 0,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test4',
      author: 'TestAuthor2',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
  ];

  test('Empty list returns empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });

  test('Correct best blogger, no ties', () => {
    const result = listHelper.mostBlogs(someBlogs);
    expect(result).toEqual({ author: 'TestAuthor2', blogs: 3 });
  });

  test('Correct best blogger, two tied for most', () => {
    const result = listHelper.mostBlogs(someBlogsTied);
    expect(result).toEqual({ author: 'TestAuthor2', blogs: 2 });
  });
});

describe('Most likes', () => {
  const someBlogs = [
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test1',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test2',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 11,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test3',
      author: 'TestAuthor2',
      url: 'SomeHTTPHere',
      likes: 0,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test4',
      author: 'TestAuthor2',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
  ];

  const tiedLikesAuthors = [
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test1',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test2',
      author: 'TestAuthor',
      url: 'SomeHTTPHere',
      likes: 11,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test3',
      author: 'TestAuthor2',
      url: 'SomeHTTPHere',
      likes: 11,
      __v: 0,
    },
    {
      _id: '214sarwq12s1414x1134',
      title: 'Test4',
      author: 'TestAuthor2',
      url: 'SomeHTTPHere',
      likes: 12,
      __v: 0,
    },
  ];

  test('Empty list returns empty object', () => {
    expect(listHelper.mostLikes([])).toEqual({});
  });

  test('Author with most likes returned, no ties', () => {
    const result = listHelper.mostLikes(someBlogs);
    expect(result).toEqual({
      author: 'TestAuthor',
      likes: 23,
    });
  });

  test('Author with most likes returned, tied returns correctly', () => {
    const result = listHelper.mostLikes(tiedLikesAuthors);
    expect(result).toEqual({
      author: 'TestAuthor',
      likes: 23,
    });
  });
});