/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/article.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register with wrong email',
    () => {
      signUpPage.typeEmail('sdf');
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpBtn();
      signUpPage.assertFailedSignUp();
    });
  it('should not provide an ability to register with wrong password',
    () => {
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword('test');
      signUpPage.clickSignUpBtn();
      signUpPage.assertFailedSignUp();
    });
});
