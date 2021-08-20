import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';
// let component;
// beforeEach(() => {
//     const blog = {
//         title: 'Testblog',
//         author: 'Testcomponent',
//         url: 'www.stackoverflow.com',
//         likes: 12,
//         username: 'tester',
//     };
//     const user = {
//         username: 'tester',
//         user: 'juuser',
//     };
//     component = render(<Blog blog={blog} user={user} />);
// });
test('renders content', () => {
    const blog = {
        title: 'Testblog',
        author: 'Testcomponent',
        url: 'www.stackoverflow.com',
        likes: 12,
    };
    const component = render(<Blog blog={blog} />);
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
});

test('clicking the show button opens detailed view', () => {
    const blog = {
        title: 'Testblog',
        author: 'Testcomponent',
        url: 'www.stackoverflow.com',
        likes: 12,
        username: 'tester',
    };
    const user = {
        username: 'tester',
        user: 'juuser',
    };
    const component = render(<Blog blog={blog} user={user} />);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.title);

    const button = component.getByText('show');

    fireEvent.click(button);
    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
});
test('clicking the like button twice fires twice', async () => {
    const blog = {
        title: 'Testblog',
        author: 'Testcomponent',
        url: 'www.stackoverflow.com',
        likes: 12,
        username: 'tester',
    };
    const user = {
        username: 'tester',
        user: 'juuser',
    };
    const mockHandler = jest.fn();

    const component = render(
        <Blog blog={blog} user={user} handleAddLike={mockHandler} />
    );
    const button = component.getByText('show');

    fireEvent.click(button);

    const likeButton = component.getByText('Like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
});
