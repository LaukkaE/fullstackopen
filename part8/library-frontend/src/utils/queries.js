import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

export const GET_BOOKS = gql`
    query getBookList($selectedGenre: String) {
        allBooks(genre: $selectedGenre) {
            title
            published
            author {
                name
            }
        }
    }
`;

export const GET_GENRES = gql`
    query {
        allBooks {
            genres
        }
    }
`;

export const GET_FAVORITE_GENRE = gql`
    query {
        me {
            favoriteGenre
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBook(
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title
            published
            author {
                name
                born
            }
            genres
        }
    }
`;

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;
