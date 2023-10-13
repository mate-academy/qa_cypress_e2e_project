/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with non registered email', () => {
    const nonValidData = {
      email: 'nonregistered@gmail.com',
      password: '1245Qwert!'
    }
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(nonValidData.email)
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertErrorMessage('Login failed! Invalid user credentials.')
  });

  it('should not provide an ability to log in with wrong password', () => {
    const nonValidData = {
      email: 'nonregistered@gmail.com',
      password: '1245Qwert!'
    }
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email)
    signInPage.typePassword(nonValidData.password);
    signInPage.clickSignInBtn();
    signInPage.assertErrorMessage('Login failed! Invalid user credentials.')

  });

  it('should not provide an ability to log in with empty email field', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertErrorMessage('Login failed! Email field required.')

  });

  it('should not provide an ability to log in with empty password field', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email)
    signInPage.clickSignInBtn();
    signInPage.assertErrorMessage('Login failed! Invalid user credentials.')
  });

  it('should not provide an ability to log in with empty fields', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.clickSignInBtn();
    signInPage.assertErrorMessage('Login failed! Email field required.')
  });
});
