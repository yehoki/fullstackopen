describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'TestUser',
      username: 'TestUser',
      password: 'test',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', function () {
    cy.contains('Login');
    cy.contains('Blog App');
  });
  it('login form can be opened', function () {
    cy.contains('Login').click();
  });

  describe('login', function () {
    beforeEach(() => {
      cy.contains('Login').click();
    });
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('TestUser');
      cy.get('#password').type('test');
      cy.get('#login-button').click();
      cy.contains('TestUser logged in');
    });
    it('fails with incorrect password', function () {
      cy.get('#username').type('TestUser');
      cy.get('#password').type('notpassword');
      cy.get('#login-button').click();
      cy.get('.error-message')
        .should('contain', 'Incorrect username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('html').should('not.contain', 'TestUser logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'TestUser',
        password: 'test',
      });
    });

    it('a new blog can be created', function () {
      cy.get('#new-blog-toggle').click();
      cy.get('input[name="blogTitle"]').type('testTitle');
      cy.get('input[name="blogAuthor"]').type('testAuthor');
      cy.get('input[name="blogUrl"]').type('testUrl');
      cy.get('#submit-blog-button').click();
      cy.contains('testTitle');
      cy.contains('testAuthor');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.CreateBlog({
          title: 'Test Blog 1',
          author: 'TestAuthor1',
          url: 'TestUrl1',
        });
        cy.CreateBlog({
          title: 'Test Blog 2',
          author: 'TestAuthor2',
          url: 'TestUrl2',
        });
      });
      it('we can like a blog', function () {
        cy.get('.show-button').eq(0).click();
        cy.contains('Likes: 0');
        cy.get('.like-button').click();
        cy.contains('Likes: 1');
      });
      it('the user who created it, can delete it', function () {
        cy.get('.show-button').eq(0).click();
        cy.get('#remove-blog-button').click();
        cy.contains('Test Blog 1').should('not.exist');
      });
      it('only the user who created it can see the remove button', function () {
        // first, make another user
        const newUser = {
          name: 'TestUser1',
          username: 'TestUser1',
          password: 'test',
        };
        cy.request('POST', 'http://localhost:3003/api/users', newUser);
        // logout as the current user
        cy.get('#logout-button').click();
        // login as a new user and create a new blog post by them
        cy.login({ username: 'TestUser1', password: 'test' });
        cy.CreateBlog({
          title: 'TestUser1Blog',
          author: 'TestUser1Author',
          url: 'TestUser1Url',
        });
        cy.get('.show-button').eq(2).click();
        cy.get('.show-button').eq(1).click();
        cy.get('#remove-blog-button').click();
        cy.contains('#remove-blog-button').should('not.exist');
      });
      it('displays the blogs in descending order of likes', function () {
        // begin with both blogs at 0 likes
        cy.get('.blog').eq(0).should('contain', 'Test Blog 1');
        cy.get('.blog').eq(1).should('contain', 'Test Blog 2');
        // expand the second and like it
        cy.get('.show-button').eq(1).click();
        cy.get('.show-button').eq(0).click();
        // press the 2nd like button
        cy.get('.like-button').eq(0).click();
        cy.get('.blog').eq(0).should('contain', 'Test Blog 1');
        cy.get('.blog').eq(0).should('contain', 'Likes: 1');
        cy.get('.blog').eq(1).should('contain', 'Test Blog 2');
        // now, like the current second one (i.e. Test Blog 2) twice, and see it jump up
        cy.get('.like-button').eq(1).click();
        cy.get('.blog').eq(1).should('contain', 'Likes: 1');
        cy.get('.like-button').eq(1).click();
        cy.get('.blog').eq(0).should('contain', 'Likes: 2');
        cy.get('.blog').eq(0).should('contain', 'Test Blog 2');
      });
    });
  });
});
