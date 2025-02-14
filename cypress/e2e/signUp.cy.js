/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject
  from '../support/pages/home.pageObject';
import SignUpPageObject
  from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

function signUpHelper(user) {
  signUpPage.typeUsername(user.username);
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(user.password);

  signUpPage.clickSubmitBtn();
}

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.visit();
    signUpHelper(user);

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register' +
      'with already existing email', () => {
    signUpPage.visit();
    signUpHelper(user);

    signUpPage.assertErrorTitle('Registration failed!');
    signUpPage.assertErrorText('Email already taken.');
  });

  it('should not provide an ability to register' +
      ' with weak password', () => {
    const tmpUser = user;
    tmpUser.email += 'a';
    tmpUser.password = 'QWEasdzxc';

    signUpPage.visit();
    signUpHelper(user);

    signUpPage.assertErrorTitle('Registration failed!');
    signUpPage.assertErrorText('Password must be 8 characters long ' +
      'and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });
});
