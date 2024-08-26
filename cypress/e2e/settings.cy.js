/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SetingsPageObject from '../support/pages/settings.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SetingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      const randomSuffix = Date.now();
      user = {
        ...generateUser,
        email: `test${randomSuffix}@mail.com`,
        username: `User${randomSuffix}`,
      };

      cy.register(user.email, user.username, user.password);
      signInPage.visit();

      cy.signIn(user.email, user.password);
      homePage.clickOnSettingsLink();
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.userNameFieldType('newusername');
    settingsPage.btnUpdate;
    settingsPage.userNameFieldCheck('newusername');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioFieldType('new');
    settingsPage.btnUpdate;
    settingsPage.bioFieldCheck('new');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailFieldType('test164@gmail.com');
    settingsPage.btnUpdate;
    settingsPage.emailFieldCheck('test164@gmail.com');
    settingsPage.logOutBtn;
    signInPage.visit();
    cy.get('.swal-button').click();
    signInPage.emailField.type('test1764@gmail.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    cy.get('.swal-modal').should('contain', 'Invalid user credentials.');
    // This is a bug
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordFieldType('newPassword1!');
    settingsPage.btnUpdate;
    cy.get('.swal-button').click();
    settingsPage.logOutBtn;
    signInPage.visit();
    signInPage.emailField.type(user.email);
    signInPage.typePassword('newPassword1!');
    signInPage.clickSignInBtn();
    homePage.visit();
    settingsPage.profileLinkCheck(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logOutBtn;
    settingsPage.checkLogOut();
  });
});
