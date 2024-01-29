/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-unused-vars */
/// <reference types='cypress' />
/// <reference types='../support' />

describe('Article', () => {
  let user;
  let article;
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    }); 

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.visit('/#/editor');
    cy.url().should('include', 'editor');
    cy.get('[data-cy="title-field"]').type(article.title);  //filling in the article title field
    cy.get('[data-cy="description-field"]').type(article.description); //filling in the article description field
    cy.get('[data-cy="body-field"]').type(article.body); //filling in the article body field
    cy.get('[data-cy="Tag-field"]').eq(0).type(article.tag); //filling in the article tag field
    cy.get('[data-cy="publish-button"]').click(); //clicking on the publish article button   cy.url().should('not.include', 'editor');  //url is changed
    cy.url()
      .should('include', 'articles')
      .should('include', article.title); //url is like /articles/article.title
    cy.get('[data-cy="username-link"]').click(); //clicking on the username profile link
    cy.get('[data-cy="profileMyArticle-link"]').click(); //clicking on the My Articles link
    cy.get('[data-cy="articleTitle-link"]')
      .should('contain', article.title); // My Articles block has article.title
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
    });
    cy.get('[data-cy="editArticle-button"]').first().click();
    cy.url()
      .should('include', 'editor')
      .should('contain', article.title);
    cy.get('[data-cy="title-field"]').type('Cypress');
    cy.get('[data-cy="description-field"]').type('automation_e2e');
    cy.get('[data-cy="publish-button"]').click();
    cy.url().should('not.include', 'editor');  //url is changed
    cy.url()
      .should('include', 'articles')
      .should('contain', article.title); //url is like '/articles/article.title'
    cy.get('[data-cy="username-link"]').click(); //clicking on the username profile link
    cy.get('[data-cy="profileMyArticle-link"]').click(); //clicking on the My Articles link
    cy.get('[data-cy="articleTitle-link"]')
      .should('contain', 'Cypress'); // My Articles block has 'Cypress' title
    cy.get('[data-cy="articleDescription-text"]')
      .should('contain', 'automation_e2e'); // My Articles block has 'automation_e2e' Description
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
    }); 
    cy.url()
      .should('include', 'articles')
      .should('contain', article.title);
    cy.get('[data-cy="deleteArticle-button"]').first().click();
    cy.url().should('not.include', 'articles');  //url is changed
    cy.get('[data-cy="homeYourFeed-link"]').click();
    cy.url().should('include', 'my-feed');  //url is changed
    cy.get('[data-cy="noArticlesHere-text"]')
      .should('contain.text', 'No articles are here... yet.');
  });
});
