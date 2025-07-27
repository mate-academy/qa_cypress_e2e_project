/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  it('should allow valid user registration', () => {
    const user = {
      email: `user_${Date.now()}@mail.com`,
      username: `user${Date.now()}`,
      password: 'StrongPass123!'
    };

    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not allow invalid registration', () => {
    signUpPage.visit();
    signUpPage.typeUsername('');
    signUpPage.typeEmail('bad-email');
    signUpPage.typePassword('123');
    signUpPage.clickSignUpBtn();
    cy.contains('email must be a valid email').should('be.visible');
  });
});
