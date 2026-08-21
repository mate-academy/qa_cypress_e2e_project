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
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to create an account', () => {
    signUpPage.signUp(user);

    homePage.assertHeaderContainUsername(user.username);
    signUpPage.assertUrlIncludes('/#/');
  });

  it('should not create an account with an already used email', () => {
    cy.register(user.email, `existing-${user.username}`, user.password);

    signUpPage.signUp(user);

    signUpPage.assertRegistrationFailed('Email already taken.');
    signUpPage.assertUrlIncludes('/#/register');
  });
});
