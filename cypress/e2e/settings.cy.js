/// <reference types='cypress' />
/// <reference types='../support' />
import SettingsPageObject from '../support/pages/settings.pageObject';
const settingPage = new SettingsPageObject();
const { faker } = require('@faker-js/faker');
const testData = {
  updateName: faker.person.firstName().toLowerCase(),
  updateBio: faker.person.bio(),
  updateEmail: faker.internet.email(),
  updatePass: faker.internet.password({ length: 9 })
};

describe('Settings page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = new Object(generateUser);
      cy.login(user.email, user.username, user.password);
    });
    settingPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingPage.typeUsernameField(testData.updateName);
    settingPage.updateSettings();
  });

  it('should provide an ability to update bio', () => {
    settingPage.typeBioField(testData.updateBio);
    settingPage.updateSettings();
  });

  it('should provide an ability to update an email', () => {
    settingPage.typeEmailField(testData.updateEmail);
    settingPage.updateSettings();
  });

  it('should provide an ability to update password', () => {
    settingPage.typePassField(testData.updatePass);
    settingPage.updateSettings();
  });

  it('should provide an ability to log out', () => {
    settingPage.logoutFromSettings();
  });
});
