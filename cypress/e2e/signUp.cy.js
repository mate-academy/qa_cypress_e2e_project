/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const SignUpPage = new SignUpPageObject();
const HomePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((userData) => {
      user = userData;
    });
  });

  it('should sign up a user with valid credentials', () => {
    SignUpPage.visit();
    SignUpPage.signUpSuccessful(user);
    HomePage.assertHeaderContainUsername(user.username);
  });

  it('should not register a user with a previously registered email', () => {
    SignUpPage.visit();
    cy.register(user);
    SignUpPage.signUpUnsuccessful(user, 'This email is taken');
  });
});
