/// <reference types="cypress" />
/// <reference types="../support" />

describe('User', () => {
   let firstUser;
   let secondUser;

   before(() => {
      cy.task('db:clear');
      cy.register().then(user => {
         firstUser = user;
      });
      cy.register().then(user => {
         secondUser = user;
      });
   });

   it('should be able to follow the another user', () => {
      cy.login(firstUser);
      cy.wait(2000);
      cy.visit(`/#/@${secondUser.username}`);
      cy.getByDataQa('follow-btn').click();
   });
});
