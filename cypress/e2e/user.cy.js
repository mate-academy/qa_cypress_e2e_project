/// <reference types="cypress" />
/// <reference types="../support" />

describe('User', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should be able to follow the another user', () => {
    cy.registerNew();
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/@Testuser');

    cy.getByDataCy('follow-btn')
      .should('exist');
    cy.getByDataCy('follow-btn')
      .click();
  });
});
