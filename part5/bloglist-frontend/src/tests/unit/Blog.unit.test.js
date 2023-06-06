import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../../components/Blog';

describe('When we render a blog component', () => {
  const blog = {
    title: 'Some blog title',
    author: 'Some Author',
    url: 'Some Url',
    likes: 10,
    user: {
      name: 'TestUser',
      username: 'TestUser',
      id: 'SomeID',
    },
  };
  let container;
  beforeEach(() => {
    container = render(
      <Blog blog={blog} currentUser={{ name: 'TestUser' }} />
    ).container;
  });
  test('it renders the content correctly', () => {
    const div = container.querySelector('.blog');
    expect(div).toHaveTextContent('Some blog title');
    expect(div).toHaveTextContent('Some Author');
    expect(div).not.toHaveTextContent('Some Url');
    expect(div).not.toHaveTextContent('Likes');
  });

  test('and we press the "show" button, extra content is rendered', async () => {
    const div = container.querySelector('.blog');
    const user = userEvent.setup();
    const button = container.querySelector('.show-button');
    await user.click(button);

    expect(div).toHaveTextContent('Some Url');
    expect(div).toHaveTextContent('Likes: 10');
  });

  test('and we press the "like" button twice, the event handler is called twice', async () => {
    const mockHandler = jest.fn();
    const newContainer = render(
      <Blog
        blog={blog}
        currentUser={{ name: 'TestUser' }}
        addLike={mockHandler}
      />
    ).container;
    const user = userEvent.setup();

    const showButton = newContainer.querySelector('.show-button');
    await user.click(showButton);

    const likeButton = newContainer.querySelector('.like-button');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
