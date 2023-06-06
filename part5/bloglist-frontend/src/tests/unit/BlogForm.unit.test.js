import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../../components/BlogForm';

describe('When', () => {
  test('s', async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<BlogForm addBlog={createBlog} />);
    screen.debug();

    const titleInput = container.querySelector(`input[name="blogTitle"]`);
    const authorInput = container.querySelector(`input[name="blogAuthor"]`);
    const urlInput = container.querySelector(`input[name="blogUrl"]`);
    const submitButton = screen.getByText('Create');
    await user.type(titleInput, 'ExampleTitle');
    await user.type(authorInput, 'ExampleAuthor');
    await user.type(urlInput, 'ExampleUrl');
    await user.click(submitButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('ExampleTitle');
    expect(createBlog.mock.calls[0][0].author).toBe('ExampleAuthor');
    expect(createBlog.mock.calls[0][0].url).toBe('ExampleUrl');
  });
});
