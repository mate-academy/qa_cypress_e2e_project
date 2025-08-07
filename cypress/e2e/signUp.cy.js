/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let username: string;
  let email: string;
  let password: string;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      username = user.username;
      email = user.email;
      password = user.password;
    });
  });

  it('should sign up successfully', () => {
    homePage.visit();
    signUpPage.visit();

    signUpPage.typeUsername(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpButton();

    homePage.assertHeaderContainUsername(username);
  });

  it('should not sign up if email is invalid', () => {
    homePage.visit();
    signUpPage.visit();

    signUpPage.typeUsername('Name12345');
    signUpPage.typeEmail('invalid email');
    signUpPage.typePassword('123132');
    signUpPage.clickSignUpButton();

    signUpPage.assertSignUpError();
  });
});
