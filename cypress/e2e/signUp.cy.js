/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject
  from '../support/pages/signUp.pageObject';
import HomePageObject
  from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should sign up with valid credentials', () => {
    signUpPage.visit();

    signUpPage.fillForm(user);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title')
      .should('contain', 'Welcome');
    cy.get('.swal-button').click();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not sign up with taken email', () => {
    cy.createUser(
      user.email, user.username, user.password
    );

    signUpPage.visit();

    signUpPage.typeUsername('another' + user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title')
      .should('contain', 'Registration failed');
  });
});
