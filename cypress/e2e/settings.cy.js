/// <reference types="cypress" />
/// <reference types="../support" />

// import SignInPageObject from '../support/pages/signIn.pageObject';
// import SignUpPageObject from '../support/pages/signUp.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
// import HomePageObject from '../support/pages/home.pageObject';

// const signInPage = new SignInPageObject();
// const signUpPage = new SignUpPageObject();
const settings = new SettingsPageObject();
// const homePage = new HomePageObject();
let user;

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.visit('/#/register');
      settings.typeRegisterUserName(user.username);
      settings.typeRegisterEmail(user.email);
      settings.typeRegisterPassword(user.password);
      settings.clickSignUpBtn();
      cy.get('.swal-button').click();
      cy.visit('/#/settings');
    });
  });

  it.only('should provide an ability to update username', () => {
    settings.typeUserName(user.username);
    // cy.get('input[data-qa="username-field"]').clear().type(userName);
    settings.clickSignUpBtn();
  });

  it('should provide an ability to update bio', () => {

  });

  it('should provide an ability to update an email', () => {

  });

  it('should provide an ability to update password', () => {

  });

  it('should provide an ability to log out', () => {

  });
});
