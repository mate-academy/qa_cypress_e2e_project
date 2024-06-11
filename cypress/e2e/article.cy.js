/// <reference types="cypress" />
/// <reference types="../support" />

const faker = require('faker');

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.registerUser(user.username, user.email, user.password); 
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.signIn(user.email, user.password); 
  });

  it('should allow a logged-in user to create an article', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();

    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('input[placeholder="Enter tags"]').type(article.tag).type('{enter}');

    cy.get('.btn').contains('Publish Article').click();

    cy.url().should('include', '/articles/');
    cy.get('h1').should('contain', article.title);
  });


  it('should not allow an unauthenticated user to create an article', () => {
    cy.clearCookies();
    cy.visit('/#/editor');
    cy.url().should('include', '/login');
  });

  it('should be edited using Edit button', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();

    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('input[placeholder="Enter tags"]').type(article.tag).type('{enter}');

    cy.get('.btn').contains('Publish Article').click();

    cy.url().should('include', '/articles/');
    cy.get('h1').should('contain', article.title);

    cy.contains('Edit Article').click();

    cy.url().should('include', '/editor');
  
    cy.get('input[placeholder="Article Title"]').clear().type('Updated Title');
    cy.get('input[placeholder="What\'s this article about?"]').clear().type('Updated Description');
    cy.get('textarea[placeholder="Write your article (in markdown)"]').clear().type('Updated Body');
    cy.get('input[placeholder="Enter tags"]').clear().type('Updated Tag').type('{enter}');
  
    cy.contains('Publish Article').click();
  
    cy.url().should('include', '/articles');
  
    cy.contains('Updated Title').should('exist');

  });

  it('should be deleted using Delete button', () => {
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();

    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]').type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(article.body);
    cy.get('input[placeholder="Enter tags"]').type(article.tag).type('{enter}');

    cy.get('.btn').contains('Publish Article').click();

    cy.url().should('include', '/articles/');
    cy.get('h1').should('contain', article.title);

    cy.contains('Delete Article').click();

  });
});
