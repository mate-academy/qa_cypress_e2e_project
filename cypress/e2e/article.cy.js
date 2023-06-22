/// <reference types="cypress" />
/// <reference types="../support" />

import articlePageObject from '../support/pages/article.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const articlePage = new articlePageObject();
const homePage = new homePageObject();

describe('Article', () => {
  let user;

  const testData = {

    title: faker.name.firstName(),
    description: faker.address.country(),
    body: faker.address.country(),
    newTitle: faker.name.firstName(),
  };

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });

  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    articlePage.visit();

    articlePage.titleField
    .type(testData.title);

    articlePage.descriptionField
    .type(testData.description);

    articlePage.bodyField
    .type(testData.body);

    articlePage.publishBtn;

    articlePage.titleArticle
      .should('contain', testData.title);
      cy.wait(2000);


  });

  it('should be edited using Edit button', () => {

    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    articlePage.visit();

    articlePage.titleField
    .type(testData.title);

    articlePage.descriptionField
    .type(testData.description);

    articlePage.bodyField
    .type(testData.body);

    articlePage.publishBtn;

    articlePage.titleArticle
      .should('contain', testData.title);

    articlePage.editBtn;

    articlePage.titleField
      .clear()
      .type(testData.newTitle);

    articlePage.publishBtn;

    articlePage.titleArticle
      .should('contain', testData.newTitle);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    articlePage.visit();

    articlePage.titleField
    .type(testData.title);

    articlePage.descriptionField
    .type(testData.description);

    articlePage.bodyField
    .type(testData.body);

    articlePage.publishBtn;

    articlePage.titleArticle
      .should('contain', testData.title);

    articlePage.deleteBtn;  

    homePage.usernameLink
      .click();

    articlePage.articleUser
      .should('contain','No articles are here... yet.')  


  });
});