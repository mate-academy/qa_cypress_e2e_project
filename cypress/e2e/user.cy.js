/// <reference types="cypress" />

describe('User', () => {
  let user;
  beforeEach(() => {
      cy.task('db:clear');
      cy.task('NewUser').then(NewUser => {
        user = NewUser;
        });
    });
  it('should be able to follow the another user', () => {
    cy.register();
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/@riot');

    cy.getByDataCy('followBtn')   //a user is not able to follow the another user. bug
      .click();
    cy.getByDataCy('unfollowBtn') //blocked
      .should('exist');
  });
});
