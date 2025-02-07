/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((data) => {
      user = data;
    });

    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid data', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with invalid data', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.username + 'gmail.com');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    signUpPage.assertValidationPopUp();
  });
});
