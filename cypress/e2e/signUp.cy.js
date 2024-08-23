/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signup.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('must enable registration with valid credentials', () => {
    signUpPage.userNameFieldType(user.username);
    signUpPage.emailFieldType(user.email);
    signUpPage.passwordFieldType(user.password);
    signUpPage.signUpBtnClick();

    signUpPage.checkRegistration('Your registration was successful!');
    signUpPage.profileLinkCheck(user.username);
  });

  it('must enable registration with invalid credentials', () => {
    signUpPage.userNameFieldType(user.username);
    signUpPage.emailFieldType('errorTest.email.com');
    signUpPage.passwordFieldType(user.password);
    signUpPage.signUpBtnClick();

    signUpPage.checkRegistration('Email must be a valid email.');
  });
});
