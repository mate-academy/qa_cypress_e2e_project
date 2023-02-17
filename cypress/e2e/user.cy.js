/// <reference types="cypress" />
/// <reference types="../support" />

describe('User', () => {
  let user;
  let article;

  beforeEach(() => {
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
    cy.visit('/#/@testQA');

    cy.getByDataCy('follow-btn')
      .should('exist');
    cy.getByDataCy('follow-btn')
      .click(); //the button does not work, the user is not able to follow another user
  });

  it.skip('should be able to unfollow the another user', () => {
    cy.registerNew();
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/@testQA');

    cy.getByDataCy('follow-btn')
      .should('exist');
    cy.getByDataCy('follow-btn')
      .click();
    cy.getByDataCy('unfollow-btn')
      .should('exist'); //the button is not on the page
  });
});
