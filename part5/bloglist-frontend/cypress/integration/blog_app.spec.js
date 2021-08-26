describe('Blog app tests', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.visit('http://localhost:3000');
    });

    it('Login form is shown', function () {
        cy.contains('Log in to application');
        cy.contains('username');
        cy.contains('password');
    });
    describe('Login', function () {
        it('Succeeds with correct credentials', function () {
            const user = {
                name: 'Perttu Perustestaaja',
                username: 'root',
                password: 'hunter2',
            };
            cy.request('POST', 'http://localhost:3003/api/users/', user);
            cy.get('#username').type('root');
            cy.get('#password').type('hunter2');
            cy.get('#login-button').click();
            cy.contains('Logged in as :Perttu Perustestaaja');
        });
        it('fails with wrong credentials', function () {
            cy.get('#username').type('ruut');
            cy.get('#password').type('vahinko');
            cy.get('#login-button').click();
            cy.contains('wrong credentials');
            cy.get('html').should('not.contain', 'Logged in as');
        });
    });
    describe('When logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/testing/reset');
            const user = {
                name: 'Perttu Perustestaaja',
                username: 'root',
                password: 'hunter2',
            };
            cy.request('POST', 'http://localhost:3003/api/users/', user);
            cy.visit('http://localhost:3000');
            cy.get('#username').type('root');
            cy.get('#password').type('hunter2');
            cy.get('#login-button').click();
        });

        it('A blog can be created', function () {
            cy.contains('create blog').click();

            cy.get('#author').type('Perttu');
            cy.get('#url').type('www.stackoverflow.com');
            cy.get('#title').type('Perttu testaa jälleen');
            cy.get('#create-blog-button').click();

            cy.contains('A new blog Perttu testaa jälleen');
        });

        it('A blog can be liked', function () {
            cy.request('POST', 'http://localhost:3003/api/testing/addblogs');
            cy.visit('http://localhost:3000');
            cy.contains('show').click();
            cy.contains('Like').click();
        });
        it('A blog can be removed when accessing it with the user that created it', function () {
            cy.contains('create blog').click();
            cy.get('#author').type('Perttu');
            cy.get('#url').type('www.stackoverflow.com');
            cy.get('#title').type('Perttu testaa jälleen');
            cy.get('#create-blog-button').click();
            cy.contains('show').click();
            cy.contains('Remove').click();
            // Cypress testillä ei näy window.confirm vahvistusta
            cy.get('html').should('not.contain', 'www.stackoverflow.com');
        });
        it('Blog cannot be removed when accessing it with the user that has not created it', function () {
            cy.request('POST', 'http://localhost:3003/api/testing/addblogs');
            cy.visit('http://localhost:3000');
            cy.contains('show').click();
            cy.contains('Like').click();
            cy.get('html').should('not.contain', 'Remove');
        });
        it('Blogs are rendered in order by likes, with the highest number of likes at the top', function () {
            cy.request('POST', 'http://localhost:3003/api/testing/addblogs');
            cy.visit('http://localhost:3000');
            cy.get('.showButton').click({ multiple: true });
            let likeArr = [];
            cy.get('.likes')
                .each((e) => {
                    // muutetaan valuet numeroiksi ja tehdään niistä lista
                    let int = +e.text();
                    likeArr = [...likeArr, int];
                })
                .then(() => {
                    // ei tehdä virhettä että muokataan shallow copyä ja verrata sortattua arrayta sortattuun arrayhin.
                    cy.wrap(likeArr).should(
                        'deep.equal',
                        [...likeArr].sort((a, b) => b - a)
                    );
                });
        });
    });
});
