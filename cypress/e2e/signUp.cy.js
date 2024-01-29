/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObjects';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to Sign up with correct credentials', () => {
    signUpPage.visit();
    signUpPage.clickOnSignUpLink();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertSuccessfulRegistration();
    homePage.assertHeaderContainUsername(user.username);
  });

  it.only('should not provide an ability to Sign up with taken email', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);
    signUpPage.clickOnSignUpLink();
    signUpPage.typeUsername(user.newUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertAlreadyTakenEmail();
  });
});
