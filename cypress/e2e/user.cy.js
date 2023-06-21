/// <reference types="cypress" />
/// <reference types="../support" />

describe('User', () => {
  let follower;
  let followedUser;

  before(() => {
    cy.task('db:clear');
      cy.register().then(user => {
         follower = user;
      });
      cy.register().then(user => {
         followedUser = user;
      });
  });

  it('should provide an ability for the user to follow the another user', () => {
    cy.login(follower);

    cy.visit(`/#/@${followedUser.username}`)

    cy.get('[data-qa="follow-btn"]')
      .click();
  });
});
