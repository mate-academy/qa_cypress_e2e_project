/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SetingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SetingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('db:clear');

    cy.register(user.email, user.username, user.password);

    cy.signIn(user.email, user.password);

    settingsPage.settingsLinkClick();
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

  // bug
  it('should provide an ability to update an email', () => {
    settingsPage.emailFieldType('qwertyu123@qa.team');
    settingsPage.btnUpdate;
    cy.get('.swal-button').click();
    settingsPage.emailFieldCheck(user.email);
    settingsPage.logOutBtn;

    cy.signIn('qwertyu123@qa.team', user.password);

    cy.get('.swal-title').should('contain', 'Login failed!');
  });

  it.only('should provide an ability to update password', () => {
    settingsPage.passwordFieldType('newPassword1223');
    settingsPage.btnUpdate;
    settingsPage.logOutBtn;
    cy.reload().clearCookies();

    cy.signIn(user.email, 'newPassword1223');

    homePage.visit();
    settingsPage.profileLinkCheck(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logOutBtn;
    settingsPage.checkLogOut();
  });
});
