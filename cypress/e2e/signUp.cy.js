/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

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

  it('should sign up succefully', () => {
    signUpPage.visit();

    signUpPage.typeUsername(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword(password);

    signUpPage.clickSignUpBtn();

    cy.get('div[class="swal-title"]').should(
      'contain', 'Welcome!'
    );
  });

  it('should not sign up if invalid email', () => {
    homePage.visit();
    cy.contains('a', 'Sign up').click();

    signUpPage.typeUsername(username);
    signUpPage.typeEmail('usermail');
    signUpPage.typePassword(password);

    signUpPage.clickSignUpBtn();

    cy.get('div[class="swal-title"]').should(
      'contain', 'Registration failed!'
    );
  });
});
