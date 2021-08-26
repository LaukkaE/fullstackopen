import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateBlog from './CreateBlog';

test('<CreateBlog /> updates state and calls onSubmit', () => {
    const user = {
        username: 'tester',
        user: 'juuser',
    };
    const mockCreate = jest.fn();

    const component = render(
        <CreateBlog handleBlogCreate={mockCreate} user={user} />
    );

    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const title = component.container.querySelector('#title');

    const form = component.container.querySelector('form');

    fireEvent.change(author, {
        target: { value: 'Perttu perustestaaja' },
    });
    fireEvent.change(url, {
        target: { value: 'www.stackoverflow.com' },
    });
    fireEvent.change(title, {
        target: { value: 'testiblogi' },
    });
    fireEvent.submit(form);

    expect(mockCreate.mock.calls).toHaveLength(1);
    expect(mockCreate.mock.calls[0][0].author).toBe('Perttu perustestaaja');
    expect(mockCreate.mock.calls[0][0].url).toBe('www.stackoverflow.com');
    expect(mockCreate.mock.calls[0][0].title).toBe('testiblogi');
});
