/* eslint-disable curly */
/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
const signUp = new SignUpPageObject();
let user;

describe('Sign Up page', () => {
  beforeEach(() => {
    signUp.visit('/' + signUp.url);
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should allow to register a new user with valid creds', () => {
    signUp.enterUsername(user.username);
    signUp.enterEmail(user.email);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.registrationAlert(user.username);
  });

  it('should not allow to register a new user with empty username field', () => {
    signUp.enterEmail(user.email);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.emtyUsernameAlert();
  });

  it('should not allow to register a new user with empty email field', () => {
    signUp.enterUsername(user.username);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.emtyEmailAlert();
  });

  it('should not allow to register a new user with empty password field', () => {
    signUp.enterUsername(user.username);
    signUp.enterEmail(user.email);
    signUp.clickOnSignUpBtn();
    signUp.emtyPasswordAlert();
  });

  it('should not allow to register a new user with 7 characters in the username field', () => {
    const username7Ch = 'Credss7';
    signUp.enterUsername(username7Ch);
    signUp.enterEmail(user.email);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should allow to register a new user with 8 characters in the username field', () => {
    const username8Ch = 'Credsss8';
    signUp.enterUsername(username8Ch);
    signUp.enterEmail(user.email);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.registrationAlert(username8Ch);
  });

  it('should allow to register a new user with 64 characters in the username field', () => {
    const repeat = function (str, count) {
      const array = [];
      for (let i = 0; i <= count;)
        array[i++] = str;
      return array.join('');
    };
    const username64Ch = repeat('a', 64);
    signUp.enterUsername(username64Ch);
    signUp.enterEmail(user.email);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.registrationAlert(username64Ch);
  });

  it('should not allow to register a new user with 65 characters in the username field', () => {
    const repeat = function (str, count) {
      const array = [];
      for (let i = 0; i <= count;)
        array[i++] = str;
      return array.join('');
    };
    const username65Ch = repeat('a', 65);
    signUp.enterUsername(username65Ch);
    signUp.enterEmail(user.email);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should not allow to register a new user without email domain in the email field', () => {
    const emailWithoutDomain = 'testEmail';
    signUp.enterUsername(user.username);
    signUp.enterEmail(emailWithoutDomain);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should not allow to register a new user without email username in the email field', () => {
    const emailWithoutUsername = '@gmail.com';
    signUp.enterUsername(user.username);
    signUp.enterEmail(emailWithoutUsername);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should not allow to register a new user without [@] (at sign) in the email field', () => {
    const emailWithoutAtSign = 'testEmailgmail.com';
    signUp.enterUsername(user.username);
    signUp.enterEmail(emailWithoutAtSign);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should not allow to register a new user with 7 characters in the email field', () => {
    const repeat = function (str, count) {
      const array = [];
      for (let i = 0; i <= count;)
        array[i++] = str;
      return array.join('');
    };
    const emailUsername = repeat('a', 0);
    const emailDomain = repeat('b', 0);
    const randomEmail = emailUsername + '@' + emailDomain + '.com';
    signUp.enterUsername(user.username);
    signUp.enterEmail(randomEmail);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should not allow to register a new user with 8 characters in the email field', () => {
    const repeat = function (str, count) {
      const array = [];
      for (let i = 0; i <= count;)
        array[i++] = str;
      return array.join('');
    };
    const emailUsername = repeat('a', 1);
    const emailDomain = repeat('b', 0);
    const randomEmail = emailUsername + '@' + emailDomain + '.com';
    signUp.enterUsername(user.username);
    signUp.enterEmail(randomEmail);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.registrationAlert(user.username);
  });

  it('should allow to register a new user with 256 characters in the email field', () => {
    const repeat = function (str, count) {
      const array = [];
      for (let i = 0; i <= count;)
        array[i++] = str;
      return array.join('');
    };
    const emailUsername = repeat('a', 245);
    const emailDomain = repeat('b', 6);
    const randomEmail = emailUsername + '@' + emailDomain + '.com';
    signUp.enterUsername(user.username);
    signUp.enterEmail(randomEmail);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.registrationAlert(user.username);
  });

  it('should not allow to register a new user with 257 characters in the email field', () => {
    const repeat = function (str, count) {
      const array = [];
      for (let i = 0; i <= count;)
        array[i++] = str;
      return array.join('');
    };
    const emailUsername = repeat('a', 246);
    const emailDomain = repeat('b', 6);
    const randomEmail = emailUsername + '@' + emailDomain + '.com';
    signUp.enterUsername(user.username);
    signUp.enterEmail(randomEmail);
    signUp.enterPassword(user.password);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should not allow to register a new user with 7 characters in the password field', () => {
    const password7Ch = 'Credss7';
    signUp.enterUsername(user.username);
    signUp.enterEmail(user.email);
    signUp.enterPassword(password7Ch);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should allow to register a new user with 8 characters in the password field', () => {
    const password8Ch = 'Credsss8';
    signUp.enterUsername(user.username);
    signUp.enterEmail(user.email);
    signUp.enterPassword(password8Ch);
    signUp.clickOnSignUpBtn();
    signUp.registrationAlert(user.username);
  });

  it('should allow to register a new user with 128 characters in the password field', () => {
    const repeat = function (str, count) {
      const array = [];
      for (let i = 0; i <= count;)
        array[i++] = str;
      return array.join('');
    };
    const upperCase = repeat('A', 5);
    const lowerCase = repeat('b', 120);
    const number = repeat('2', 3);
    const randomPassword = upperCase + lowerCase + number;
    signUp.enterUsername(user.username);
    signUp.enterEmail(user.email);
    signUp.enterPassword(randomPassword);
    signUp.clickOnSignUpBtn();
    signUp.registrationAlert(user.username);
  });

  it('should not allow to register a new user with 129 characters in the password field', () => {
    const repeat = function (str, count) {
      const array = [];
      for (let i = 0; i <= count;)
        array[i++] = str;
      return array.join('');
    };
    const upperCase = repeat('A', 5);
    const lowerCase = repeat('b', 120);
    const number = repeat('2', 4);
    const randomPassword = upperCase + lowerCase + number;
    signUp.enterUsername(user.username);
    signUp.enterEmail(user.email);
    signUp.enterPassword(randomPassword);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should not allow to register a new user without 1 number in the password field', () => {
    const passwordWithoutNumber = 'Password';
    signUp.enterUsername(user.username);
    signUp.enterEmail(user.email);
    signUp.enterPassword(passwordWithoutNumber);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should not allow to register a new user without 1 upper case letter in the password field', () => {
    const passwordWithoutNumber = 'password1';
    signUp.enterUsername(user.username);
    signUp.enterEmail(user.email);
    signUp.enterPassword(passwordWithoutNumber);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });

  it('should not allow to register a new user without 1 lower case letter in the password field', () => {
    const passwordWithoutNumber = 'PASSWORD1';
    signUp.enterUsername(user.username);
    signUp.enterEmail(user.email);
    signUp.enterPassword(passwordWithoutNumber);
    signUp.clickOnSignUpBtn();
    signUp.failedRegistrationAlert();
  });
});
