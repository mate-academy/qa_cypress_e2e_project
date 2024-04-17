/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

let user;

describe('Sign Up page', () => {
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should provide an ablity to create user accout', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSubmitButton();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should prevent createing user accout without email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);

    signUpPage.clickSubmitButton();

    signUpPage.assertPopUpRegistrationFailed();
  });

  it('should prevent createing user accout without username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSubmitButton();

    signUpPage.assertPopUpRegistrationFailed();
  });

  it('should prevent createing user accout without password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);

    signUpPage.clickSubmitButton();

    signUpPage.assertPopUpRegistrationFailed();
  });
});
