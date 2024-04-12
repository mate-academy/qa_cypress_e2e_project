/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const faker = require('faker');
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const invalidCredentialsMessage = 'Invalid user credentials.';
const invalidEmailMessage = 'Email must be a valid email';
const emailErrorMessage = 'Email field required.';
const passwordErrorMessage = 'Password field required.';

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    cy.register(user.email, user.username, user.password);
    const wrongPassword = faker.lorem.word(8);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();
    signInPage.assertModalWindow(invalidCredentialsMessage);
  });

  it('should not provide an ability to log in with invalid email', () => {
    cy.register(user.email, user.username, user.password);
    const invalidEmail = 'Olena@gmail';

    signInPage.typeEmail(invalidEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertModalWindow(invalidEmailMessage);
  });

  it('should not provide an ability to log in with with blank email field', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertModalWindow(emailErrorMessage);
  });

  it('should not provide an ability to log in with with blank password field', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.assertModalWindow(passwordErrorMessage);
  });
});
