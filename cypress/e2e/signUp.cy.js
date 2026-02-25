/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import { faker } from '@faker-js/faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

const crashEmeil = faker.string.alpha(10);

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('should register user', () => {
    signUpPage.register(user.username, user.email, user.password);
    signUpPage.assertSwalContainValid('Your registration was successful!');
    signUpPage.clickSwalBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should require a username is not empty', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertSwalContainValid('Username field required.');
  });

  it('should require an email is not empty', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertSwalContainValid('Email field required.');
  });

  it('should require an email is valid', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(crashEmeil);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertSwalContainValid('Email must be a valid email.');
  });

  it('should require a password is not empty', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    signUpPage.assertSwalContainValid('Password field required.');
  });

  it('should not allow register with a password less 8 characters', () => {
    signUpPage.register(user.username, user.email, user.password.slice(0, 7));

    // eslint-disable-next-line max-len
    signUpPage.assertSwalContainValid('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  // eslint-disable-next-line max-len
  it('should not allow register with a password whithout just one number', () => {
    signUpPage.register(user.username, user.email, 'Dfhfhfmf');

    // eslint-disable-next-line max-len
    signUpPage.assertSwalContainValid('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  // eslint-disable-next-line max-len
  it('should not allow register with a password whithout just one uppercase character', () => {
    signUpPage.register(user.username, user.email, '1fhfhfmf');

    // eslint-disable-next-line max-len
    signUpPage.assertSwalContainValid('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  // eslint-disable-next-line max-len
  it('should not allow register with a password whithout just one lowercase character', () => {
    signUpPage.register(user.username, user.email, '1FGYTUHJ');

    // eslint-disable-next-line max-len
    signUpPage.assertSwalContainValid('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  // eslint-disable-next-line max-len
  it('should not allow register with a password whit cyrillic characters', () => {
    signUpPage.register(user.username, user.email, 'каука12ВА');

    // eslint-disable-next-line max-len
    signUpPage.assertSwalContainValid('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not allow register with an existed email', () => {
    signUpPage.register(user.username, user.email, user.password);
    signUpPage.clickSwalBtn();
    settingsPage.visit();

    settingsPage.clickLogoutBtn();
    signUpPage.visit();
    signUpPage.register(user.username, user.email, user.password);
    signUpPage.assertSwalContainValid('Email already taken.');
  });
});
