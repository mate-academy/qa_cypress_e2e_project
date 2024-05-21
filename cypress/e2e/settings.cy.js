/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const signUpPage = new SignUpPageObject();
// console.log(signUpPage);
const settings = new SettingsPageObject();
const homePage = new HomePageObject();
let user;
const newUserName = 'newname';
// const newBio = 'newbio';
// const newEmail = 'newmail';
// const newPassword = 'newpassword';

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.visit('/user/register');
      signUpPage.typeUserName(user.username);
      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signInPage.clickSignInBtn();
      cy.visit('/settings');
    });
  });

  it('should provide an ability to update username', () => {
    settings.typeUserName(newUserName);
    settings.clickUpdateBtn();

    homePage.usernameLink.should('contain', user.username + newUserName);
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
