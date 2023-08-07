/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertUsernameLink(user.username);
    homePage.assertHomePageUrl();
    signUpPage.assertModalData(
      'Welcome!',
      'Your registration was successful!'
    );
  });

  it('should not provide an ability to register with invalid password', () => {
    user = { ...user, password: 'qwert!' };
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalData(
      'Registration failed!',
      `Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.`
    );
  });
  it('should not provide an ability to register with invalid email', () => {
    user = { ...user, email: 'tester.com' };
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertModalData(
      'Registration failed!',
      'Email must be a valid email.'
    );
  });
});
