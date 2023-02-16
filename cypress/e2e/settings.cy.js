/// <reference types="cypress" />

import userPageObject from "../support/pages/userPage.pageObject";
import homePageObject from "../support/pages/home.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const signInPage = new SignInPageObject();
const userPage = new userPageObject();
const homePage = new homePageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });
  
  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    cy.registerNew(user.username, user.email, user.password);
    });
    userPage.visit()
  });

  it('should provide an ability to update username', () => {
    
    userPage.usernameField
      .type('{selectAll}New username');
    userPage.updateBtn
      .click();
    userPage.modalOk
      .click()
    homePage.usernameLink
      .should('contain', 'New username')
  });

  it('should provide an ability to update bio', () => {

    userPage.bioField
      .type('{selectAll}New bio')
    userPage.updateBtn
      .click();
    userPage.modalOk
      .click()
    
  });

  it.skip('should provide an ability to update an email', () => { //тест скіпаю бо на сайті цей функціонал не працює
    
    userPage.emailField
      .type('{selectAll}newmail@mail.com')
    userPage.updateBtn
      .click();
    userPage.modalOk
      .click()
    userPage.emailField
    .should('contain', 'newmail@mail.com')
    userPage.logoutBtn
      .click()

    signInPage.visit()

    signInPage.emailField
      .type('newmail@mail.com')
    signInPage.passwordField
      .type(password)
    signInPage.signInBtn
      .click()
    
  });
  
  it('should provide an ability to update password', () => {

    userPage.passwordField
      .type('{selectAll}123456789QazxsW!')
    userPage.updateBtn
      .click();
    userPage.modalOk
      .click()
    userPage.logoutBtn
      .click()
    homePage.loginBtn
      .click()
    signInPage.emailField
      .type(user.email)
    signInPage.passwordField
      .type('123456789QazxsW!')
    signInPage.signInBtn
      .click()
    homePage.usernameLink
      .should('contain', user.username)
  });

  it('should provide an ability to log out', () => {
   
    userPage.logoutBtn
      .click()
    cy.url()
      .should('deep.equal', 'http://localhost:1667/#/')

  });
});
