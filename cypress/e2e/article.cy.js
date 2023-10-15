/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');

describe('Article user flow', () => {
  
beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/login');
  });

  it('should be created using New Article form', () => {
    let user;

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.request('POST', 'http://localhost:1667/users', {
        email: user.email,
        username: user.username,
        password: user.password
      });

      cy.getByDataCy('login-email-input').type(user.email);
      cy.getByDataCy('login-password-input').type(user.password);
      cy.getByDataCy('signin-button').click(); 

      cy.get('[data-cy="new-article"]').click();

      let article;
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;

        cy.getByDataCy('article-title').type(article.title);
        cy.getByDataCy('article-description').type(article.description);
        cy.getByDataCy('article-body').type(article.body);
        cy.get('.vue-tags-input').type(article.tag + '{enter}');
        cy.getByDataCy('publish-article-btn').click();
        cy.url().should('eq', `http://localhost:1667/#/articles/${article.title}`);
        cy.getByDataCy('autor').should('include.text', user.username);

      });
    });
  });

  it('should be edited using Edit button', () => {
    let user;

    const newArticleTitle = faker.lorem.word();
    const newArticleDescription = faker.lorem.words();
    const newArticleBody = faker.lorem.words();

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.request('POST', 'http://localhost:1667/users', {
        email: user.email,
        username: user.username,
        password: user.password
      });

      cy.getByDataCy('login-email-input').type(user.email);
      cy.getByDataCy('login-password-input').type(user.password);
      cy.getByDataCy('signin-button').click(); 

      cy.get('[data-cy="new-article"]').click();

      let article;
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;

        cy.getByDataCy('article-title').type(article.title);
        cy.getByDataCy('article-description').type(article.description);
        cy.getByDataCy('article-body').type(article.body);
        cy.get('.vue-tags-input').type(article.tag + '{enter}');
        cy.getByDataCy('publish-article-btn').click();
        cy.url().should('eq', `http://localhost:1667/#/articles/${article.title}`);
        cy.getByDataCy('autor').should('include.text', user.username);
        
        cy.get('.article-actions > .article-meta > :nth-child(3) > [data-cy="edit-article-btn"] > span').click();
        // cy.getByDataCy('edit-article-btn').click();
        cy.url().should('eq', `http://localhost:1667/#/editor/${article.title}`);
        cy.getByDataCy('article-title').clear().type(newArticleTitle);
        cy.getByDataCy('article-description').clear().type(newArticleDescription);
        cy.getByDataCy('article-body').clear().type(newArticleBody);
        cy.getByDataCy('publish-article-btn').click();
        cy.getByDataCy('article-titleH1').should('include.text', newArticleTitle);
        cy.getByDataCy('navbar-username').click();
        cy.getByDataCy('article-list-preview').should('include.text', newArticleDescription);
      });
    });
  });

    it('should be deleted using Delete button', () => {
    let user;

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.request('POST', 'http://localhost:1667/users', {
        email: user.email,
        username: user.username,
        password: user.password
      });

      cy.getByDataCy('login-email-input').type(user.email);
      cy.getByDataCy('login-password-input').type(user.password);
      cy.getByDataCy('signin-button').click(); ; 

      cy.get('[data-cy="new-article"]').click();

      let article;
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
cy.getByDataCy('article-title').type(article.title);
        cy.getByDataCy('article-description').type(article.description);
        cy.getByDataCy('article-body').type(article.body);
        cy.get('.vue-tags-input').type(article.tag + '{enter}');
        cy.getByDataCy('publish-article-btn').click();
        cy.url().should('eq', `http://localhost:1667/#/articles/${article.title}`);
        cy.getByDataCy('autor').should('include.text', user.username);
        
        cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger').click();
        // cy.get('delete-article-btn').first().click();            / this code doesn't work because there are 2 buttons on the page, I haven't figured out how to do it correctly

        
        cy.url().should('eq', 'http://localhost:1667/#/');
        cy.getByDataCy('navbar-username').click();
        // cy.getByDataCy('article-list-preview').should('not.include.text', article.title);        /for some reason does not find this item
        cy.contains('No articles are here... yet.');
      });
    });
  });

});