/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPage from '../support/pages/settings.pageObject';
import ValidatedMessagesPage from '../support/pages/validatedMessages.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPage();
const validatedMessagesPage = new ValidatedMessagesPage();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((userData) => {
      user = userData;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    settingsPage.visit();
    homePage.settingsLink.click();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(user.username);
    settingsPage.updateSettingsButton.click();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.username);
    settingsPage.updateSettingsButton.click();
    settingsPage.assertHaveText(
      validatedMessagesPage.swalTitle,
      validatedMessagesPage.updateSuccessfulMessage
    );
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.updateSettingsButton.click();
    settingsPage.assertHaveText(
      validatedMessagesPage.swalTitle,
      validatedMessagesPage.updateSuccessfulMessage
    );
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user.password);
    settingsPage.updateSettingsButton.click();
    settingsPage.assertHaveText(
      validatedMessagesPage.swalTitle,
      validatedMessagesPage.updateSuccessfulMessage
    );
  });

  it('should provide an ability to log out', () => {

    settingsPage.logoutButton.click();
    homePage.assertHeaderContainSignIn();
  });
});
