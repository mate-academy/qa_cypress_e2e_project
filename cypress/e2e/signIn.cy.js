/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    signInPage.visit();
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('shouldn`t provide an ability to log in with unregistered email', () => {
    signInPage.typeEmail('unregisteredemail@test.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertPopUp();
  });

  it(`shouldn't provide an ability to log in with email 
  without "@" symbol'`, () => {
    signInPage.typeEmail('invalidemail.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertPopUpInvalidEmail();
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword('notuserp@s$w0rd');
    signInPage.clickSignInBtn();

    signInPage.assertPopUp();
  });

  it(`"Need an account" link should redirect user to sign up page after clicking on it`, () => {
    signInPage.clickHaveAnAccountLink();
    signUpPage.assertSignUpUrl();
  });
});
