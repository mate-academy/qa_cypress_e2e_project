/// <reference types='cypress' />
/// <reference types='../support' />

import settingPageObject from "../support/pages/setting.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const settingsPage = new settingPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.password);
      });
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.clickSettingsLink();

    settingsPage.updateUsername('iLoveMateAcademy');
    settingsPage.clickUpdateSettings();

    cy.get('.swal-modal').should('contain', 'Update successful!');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.clickSettingsLink();

    settingsPage.updateBio('The best mentors ever!♥')
    settingsPage.clickUpdateSettings();

    cy.get('.swal-modal').should('contain', 'Update successful!');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clickSettingsLink();

    settingsPage.updateEmail('newEmail@mail.com');
    settingsPage.clickUpdateSettings();

    cy.get('.swal-button').click();
    settingsPage.assertEmailChanged();
  });

  it('should provide an ability to update password', () => {
    settingsPage.clickSettingsLink();

    settingsPage.updatePassword('newPassword21');
    settingsPage.clickUpdateSettings();

    cy.get('.swal-modal').should('contain', 'Update successful!');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickSettingsLink();

    settingsPage.clickLogoutButton();

    homePage.assertUserLoggedOut();
  });
});
