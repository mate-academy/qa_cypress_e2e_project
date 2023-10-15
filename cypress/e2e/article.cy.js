/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/login');
  });

  const createUserAndSignIn = (user) => {
    cy.createUserAndSignIn(user);
  };

  const createArticle = (user) => {
    cy.getByDataCy('new-article').click();

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;

      cy.getByDataCy('article-title').type(article.title);
      cy.getByDataCy('article-description').type(article.description);
      cy.getByDataCy('article-body').type(article.body);
      cy.get('.vue-tags-input').type(article.tag + '{enter}');
      cy.getByDataCy('publish-article-btn').click();
      cy.url().should('eq', `http://localhost:1668/#/articles/${article.title}`);
      cy.getByDataCy('author').should('include.text', user.username);
    });
  };

  it('should be created using New Article form', () => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      createUserAndSignIn(user);
      createArticle(user);
    });
  });

  it('should be edited using Edit button', () => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      createUserAndSignIn(user);
      createArticle(user);

      const newArticleTitle = faker.lorem.word();
      const newArticleDescription = faker.lorem.words();
      const newArticleBody = faker.lorem.words();

      cy.get('[data-cy="article-title-h1"] > .article-meta > :nth-child(3) > [data-cy="edit-article-btn"] > span').click();
      cy.url().should('eq', `http://localhost:1668/#/editor/${user.username}/${article.title}`);
      cy.getByDataCy('article-title').clear().type(newArticleTitle);
      cy.getByDataCy('article-description').clear().type(newArticleDescription);
      cy.getByDataCy('article-body').clear().type(newArticleBody);
      cy.getByDataCy('publish-article-btn').click();
      cy.getByDataCy('article-title-h1').should('include.text', newArticleTitle);
      cy.getByDataCy('username-link').click();
      cy.getByDataCy('article-list-profile').should('include.text', newArticleDescription);
    });
  });

  it('should be deleted using Delete button', () => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      createUserAndSignIn(user);
      createArticle(user);
  
      cy.get('[data-cy="article-title-h1"]').then(($articleTitle) => {
        const title = $articleTitle.text();
  
        cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger').click();
        cy.url().should('eq', 'http://localhost:1668/#/');
        cy.getByDataCy('username-link').click();
        cy.getByDataCy('article-list-profile').should('not.include.text', title);
      });
    });
  });
});


