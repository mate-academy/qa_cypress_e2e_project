/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import './../support/commands.js'

const signInPage = new SignInPageObject();

describe('User', () => {
  let user;
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
  
      expect(user).to.exist;
  
      signInPage.visit();
      cy.register(user.email, user.username, user.password);
  
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
      cy.wait(2000)
    })
  });

  it ('should be able to follow the another user', () => {
    cy.logOut();
    cy.signUp();
    cy.get('.swal-button').click();
    cy.visit(`/#/@${user.username}`);
    cy.get('button.btn.btn-sm.btn-outline-secondary.action-btn').click();
    cy.reload()
    cy.get('button.btn.btn-sm.btn-outline-secondary.action-btn')
  .should('not.include.text', 'Follow');
  });
});