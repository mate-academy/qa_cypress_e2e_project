/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide the ability to sign up with valid creds', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertSwalSucces();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not allow to sign up with wrong email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeWrongEmail(user.wrongEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertSwalEmailFail();
  });

  it('should not allow to sign up with wrong password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typeWrongPassword(user.wrongPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertSwalPassFail();
  });
});
