/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

let user;
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
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

  it(`shouldn't provide an ability to signup with empty username`, () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    signUpPage.assertAllerMessage('Registration failed');
    signUpPage.assertAllerMessage('Username field required');
  });

  it(`shouldn't provide an ability to signup with empty email field`, () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    signUpPage.assertAllerMessage('Registration failed');
    signUpPage.assertAllerMessage('Email field required');
  });
});
