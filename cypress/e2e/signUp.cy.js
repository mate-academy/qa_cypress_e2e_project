/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    user = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(10)
    };
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not allow sign up without username', () => {
    signUpPage.visit();

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.checkFail('Registration failed!');
  });

  it('should not allow sign up without email', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.checkFail('Registration failed!');
  });

  it('should not allow sign up without password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    signUpPage.checkFail('Registration failed!');
  });
});
