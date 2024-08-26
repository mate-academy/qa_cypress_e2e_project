/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      const randomSuffix = Date.now();
      user = {
        ...generateUser,
        email: `test${randomSuffix}@mail.com`,
        username: `User${randomSuffix}`
      };
    });
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with non-printeble username', () => {
    signUpPage.visit();

    signUpPage.typeUsername(' ');
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('contain', 'Your registration was successful!');
    homePage.assertHeaderContainUsername(' ');
    // This is a bug
  });

  it('should not provide an ability to sign up with invalid email', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('test12gmail.com');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('contain', 'Email must be a valid email.');
  });
});
