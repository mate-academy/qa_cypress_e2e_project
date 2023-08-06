/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const faker = require('faker');
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should allow to register new user', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.signUpButton();
    signUpPage.registationMessage();
  });

  it('should not allow to register new user without username', () => {
    signUpPage.visit();
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorUsernameRequired();
    signUpPage.closeAlert();
  });

  it('should not allow to register new user without email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorEmailRequired();
    signUpPage.closeAlert();
  });

  it('should not allow to register new user without password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorPasswordRequired();
    signUpPage.closeAlert();
  });

  it('should not allow to register new user with registered email', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.visit();
    signUpPage.typeUsername(faker.lorem.word());
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorEmailTaken();
    signUpPage.closeAlert();
  });

  it('should not allow to register new user without @ in the Email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('sometestdataqa.com');
    signUpPage.typePassword(user.password);
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorWrongEmail();
    signUpPage.closeAlert();
  });

  it('should not allow to register user without emailname in the Email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('@qa.com');
    signUpPage.typePassword(user.password);
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorWrongEmail();
    signUpPage.closeAlert();
  });

  it('should not allow to register user with two @ in the Email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('user@mail@qa.com');
    signUpPage.typePassword(user.password);
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorWrongEmail();
    signUpPage.closeAlert();
  });

  it('should not allow to register without domain name in the Email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('usertest456@');
    signUpPage.typePassword(user.password);
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorWrongEmail();
    signUpPage.closeAlert();
  });

  it('should not allow to register with 7 characters in the password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('User12!');
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorWrongPassword();
    signUpPage.closeAlert();
  });

  it('should not allow to register without number in the password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('Password!');
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorWrongPassword();
    signUpPage.closeAlert();
  });

  // eslint-disable-next-line max-len
  it('should not allow to register without uppercase letter in the password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('psswrd1!');
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorWrongPassword();
    signUpPage.closeAlert();
  });

  // eslint-disable-next-line max-len
  it('should not allow to register without lowercase letter in the password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('PSSWRD1!');
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorWrongPassword();
    signUpPage.closeAlert();
  });

  it('should not allow to register new user with registered username', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(faker.internet.email());
    signUpPage.typePassword(user.password);
    signUpPage.signUpButton();
    signUpPage.errorTitle();
    signUpPage.errorUsernameTaken();
    signUpPage.closeAlert();
  });
});
