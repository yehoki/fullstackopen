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

  test('List has only one blog, equals to likes of the blog', () => {
    const result = listHelper.totalLikes(oneBlogArray);
    expect(result).toBe(12);
  });
});
