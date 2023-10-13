/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

const wrongData = {
  email: faker.internet.email().toLowerCase(),
  password: faker.random.alphaNumeric(8)
};

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.typeEmail(wrongData.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertModalContainText();
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongData.password);
    signInPage.clickSignInBtn();

    signInPage.assertModalContainText();
  });

  it('should not provide an ability to log in with an empty email field', () => {
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertModalContainText();
  });

  it('should not provide an ability to log in with an empty password field', () => {
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();

    signInPage.assertModalContainText();
  });
});
