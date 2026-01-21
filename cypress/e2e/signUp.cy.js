/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let username;
  let email;
  let password;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      username = user.username;
      email = user.email;
      password = user.password;
    });
  });

  it('should sign up successfully', () => {
    signUpPage.visit();
    signUpPage.fillSignUpForm(username, email, password);
    signUpPage.clickSignUpBtn();
    cy.getByDataQa('success-alert').should('be.visible');
    homePage.visit();
    homePage.assertHeaderContainUsername(username);
  });

  it('should not sign up if invalid email', () => {
    signUpPage.visit();
    signUpPage.typeUsername('Name12345');
    signUpPage.typeEmail('invalid email');
    signUpPage.typePassword('123132');
    signUpPage.clickSignUpBtn();

    cy.getByDataQa('error-alert').should('be.visible');
  });
});
