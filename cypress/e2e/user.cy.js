/// <reference types="cypress" />
/// <reference types="../support" />


describe('User', () => {
  let firstUser;
  let secondUser;

  before(() => {
    cy.task('db:clear');
    cy.registerNewUser().then(user => {
       firstUser = user;
    });
    cy.registerNewUser().then(user => {
       secondUser = user;
    });
 });

it('should be able to follow another user', () => {
  cy.login(firstUser);

  cy.visit(`/#/@${secondUser.username}`);
      cy.getByDataCy('follow-user-btn').click();
   });
});


