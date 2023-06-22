/// <reference types="cypress" />
/// <reference types="../support" />

import articlePageObject from "../support/pages/article.pageObject";
import articleActionsPageObject from "../support/pages/articleActions.pageObject";

const articleActions = new articleActionsPageObject;
const articlePage = new articlePageObject;
let article;
let user;

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
    articlePage.visit();  
  });
});
});

  it('should be created using New Article form', () => {
    articlePage.titleField
      .type(article.title);
    articlePage.descriptionField
      .type(article.description);
    articlePage.bodyField
      .type(article.body);
    articlePage.publishBtn
      .click(); 
    cy.contains('h1', article.title);
    cy.contains('.col-xs-12', article.body);   
    cy.contains('.author', user.username);
    cy.url().should('eq', `http://localhost:1667/#/articles/${article.title}`);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body).then((response) => {
      let slug = response.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
    });
    articleActions.editArticle.first().click();
    articlePage.titleField
      .clear()
      .type(article.title);
    articlePage.descriptionField
      .clear()
      .type(article.description);
    articlePage.bodyField
      .clear()
      .type(article.body);
    articlePage.publishBtn
      .click();
      cy.url().should('eq', `http://localhost:1667/#/articles/${article.title}`); 
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body).then((response) => {
      let slug = response.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
    });
    articleActions.deleteArticle.first().click();
    cy.url().should('eq', `http://localhost:1667/#/`);
  });
});
