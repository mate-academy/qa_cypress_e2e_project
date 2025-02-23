/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const textSuccess = 'Your registration was successful!';
const invalidEmail = 'testgmail.com';
const textUsernameRequired = 'Username field required.';
// const textEmailRequired = 'Email field required.';
const textValidEmailRequired = 'Email must be a valid email.';
const textPasswordRequired = 'Password field required. ';

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((response) => {
      user = response;
    });
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should provide an ability to sign up with correct credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.pressSignUpBtn();
    homePage.swalModal
      .should('contain.text', textSuccess);
  });

  it('should show error when username field is empty', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.pressSignUpBtn();
    homePage.swalModal
      .should('contain.text', textUsernameRequired);
  });

  it('should show error when provided email is incorrect', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(invalidEmail);
    signUpPage.typePassword(user.password);

    signUpPage.pressSignUpBtn();
    homePage.swalModal
      .should('contain.text', textValidEmailRequired);
  });

  it('should show error when email field is empty', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);

    signUpPage.pressSignUpBtn();
    homePage.swalModal
      .should('contain.text', textPasswordRequired);
  });
});
