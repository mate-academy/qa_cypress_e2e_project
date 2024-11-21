/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
const SignUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    SignUpPage.visit();
  });

  it('should provide an ability to register in with valid credentials', () => {
    SignUpPage.typeUsername(user.username);
    SignUpPage.typeEmail(user.email);
    SignUpPage.typePassword(user.password);
    SignUpPage.clickSignUpBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it(`shouldn't provide an ability to register in without email credential`, () => {
    SignUpPage.typeUsername(user.username);
    SignUpPage.typePassword(user.password);
    SignUpPage.clickSignUpBtn();
    SignUpPage.assertErrorMessageForEmail();
  });

  it(`shouldn't provide an ability to register in without username credential`, () => {
    SignUpPage.typePassword(user.password);
    SignUpPage.typeEmail(user.email);
    SignUpPage.clickSignUpBtn();
    SignUpPage.assertErrorMessageForUsername();
  });

  it(`shouldn't provide an ability to register in without password credential`, () => {
    SignUpPage.typeUsername(user.username);
    SignUpPage.typeEmail(user.email);
    SignUpPage.clickSignUpBtn();
    SignUpPage.assertErrorMessageForPassword();
  });
});
