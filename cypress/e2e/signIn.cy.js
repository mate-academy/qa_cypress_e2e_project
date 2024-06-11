/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const userInvalidData = {
  email: 'invalidEmail',
  password: '1'
};

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials (positive test)', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with the invalid email (negative test)', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.typeEmail(userInvalidData.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertMessageInvalidEmail();
  });

  it('should not provide an ability to log in with the invalid password (negative test)', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(userInvalidData.password);
    signInPage.clickSignInBtn();

    signInPage.assertMessageInvalidPassword();
  });

  it('should not provide an ability to log in with the empty "Email" field', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertMessageEmptyEmail();
  });

  it('should not provide an ability to log in with the empty "Password" field', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();

    signInPage.assertMessageEmptyPassword();
  });
});
