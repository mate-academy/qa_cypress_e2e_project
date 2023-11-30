import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

/// <reference types='cypress' />
/// <reference types='../support' />

const faker = require('faker');

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  const wrongEmail = faker.internet.email();
  const wrongPassword = faker.random.alphaNumeric(8);

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with unexisting email', () => {
    signInPage.typeEmail(wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertInvalidCredentialsModal();
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();

    signInPage.assertInvalidCredentialsModal();
  });

  it('should not provide an ability to log in with empty email field', () => {
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertEmailRequiredModal();
  });

  it('should not provide an ability to log in with empty password field',
    () => {
      signInPage.typeEmail(user.email);
      signInPage.clickSignInBtn();

      signInPage.assertPasswordRequiredModal();
    });
});
