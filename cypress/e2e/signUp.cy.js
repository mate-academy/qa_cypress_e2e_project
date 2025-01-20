/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  const fakeUser = {
    username: 'fakeUser',
    email: 'fakeUserfakeUser.com',
    password: 'fakeuser'
  };

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide the ability to log in with new data', () => {
    signUpPage.visit();
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.findModalText('Your registration was successful!');

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not register a user with invalid data', () => {
    signUpPage.visit();
    signUpPage.typeUserName(fakeUser.username);
    signUpPage.typeEmail(fakeUser.email);
    signUpPage.typePassword(fakeUser.password);
    signUpPage.clickSignUpBtn();
    signUpPage.findModalTitle('Registration failed!');
  });
});
