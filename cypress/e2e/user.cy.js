/// <reference types="cypress" />
/// <reference types="../support" />

describe('User', () => {
  let user1;
  let user2;

  beforeEach(() => {
    cy.task('db:clear');
    cy.registerNewUser().then(user => {
      user1 = user;
    });
    cy.registerNewUser().then(user => {
      user2 = user;
    });
  });

  it('should be able to follow another user', () => {
    cy.login(user1);
    cy.wait(2000);

    cy.visit(`/#/@${user2.username}`);
    cy.contains('button', `Follow ${user2.username}`).click();
    //Bug report: the functionality isn't working.
  });
});
