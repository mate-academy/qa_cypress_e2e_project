/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';


const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser')
      .then((generateUser) => {
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

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.wrongPassword);
    signInPage.clickSignInBtn();
    homePage.alertInvalidCred();
  });

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.typeEmail(user.wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.alertInvalidCred();
  });

  it('should not provide an ability to log in with invalid email', () => {
    signInPage.typeEmail(user.invalidEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.alertInvalidEmail();
  });

  it('should not provide an ability to log in without password', () => {
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    homePage.alertPasswordEmpty();
  });
});
