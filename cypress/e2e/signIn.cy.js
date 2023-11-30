/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
      cy.task('db:clear');
      cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      signInPage.visit();
      cy.register(user.email, user.username, user.password);
    });
  });




  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {

      const wrongEmail = faker.internet.email();

      signInPage.typeEmail(wrongEmail);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      signInPage.wrongLogin('Login failed!');
     

  });

  it('should not provide an ability to log in with wrong password', () => {

    const wrongPassword = faker.internet.password();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();

    signInPage.wrongLogin('Login failed!');
   

});
});
