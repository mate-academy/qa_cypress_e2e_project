/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

const invalidUserData = {
  email: 'testUser#$qa.team',
  password: 'qwerty'
};

describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    signUpPage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should sign up with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not sign up with email containing special characters', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(invalidUserData.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
  });

  it('should not sign up with invalid password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(invalidUserData.password);
    signUpPage.clickSignUpBtn();
  });
});
