/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with existing username', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);
    const newUsername = faker.name.firstName().toLowerCase();

    signUpPage.typeUsername(newUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertTakenEmail();
  });

  it('should not provide an ability to sign up with existing password', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);
    const newPassword = faker.internet.password();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(newPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertTakenEmail();
  });
});
