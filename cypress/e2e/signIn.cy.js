/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SwalMessagePageObject from '../support/swalMessages/SwalMessages.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const swalMessage = new SwalMessagePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeAllSignInData(user.email, user.password);

    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  describe('should not provide an ability to log in with wrong credentials', () => {
    it('wrong email', () => {
      signInPage.typeAllSignInData('wrongMail@mail.com', user.password);

      signInPage.clickSignInBtn();

      swalMessage.loginFailed();
    });

    it('wrong password', () => {
      signInPage.typeAllSignInData(user.email, 'wrongPassword');

      signInPage.clickSignInBtn();

      swalMessage.loginFailed();
    });
  });

  describe('should not provide an ability to log in without some of credentials', () => {
    it('without password', () => {
      signInPage.typeEmail(user.email);

      signInPage.clickSignInBtn();

      swalMessage.loginFailed('Password field required.');
    });

    it('without email', () => {
      signInPage.typePassword(user.password);

      signInPage.clickSignInBtn();

      swalMessage.loginFailed('Email field required.');
    });
  });
});
