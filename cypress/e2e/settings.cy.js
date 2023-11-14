/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject
  from '../support/pages/settings.pageObject';

const settings = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let userInfo;

  before(() => {
    cy.task('generateUserInfo').then((generateUserInfo) => {
      userInfo = generateUserInfo;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    settings.visit();
  });

  it('should provide an ability to update username', () => {
    settings.usernameType(userInfo.username);
    settings.setingsBtn.click();

    settings.assertChanges();
  });

  it('should provide an ability to update bio', () => {
    settings.bioType(userInfo.bio);
    settings.setingsBtn.click();

    settings.assertChanges();
  });

  it('should provide an ability to update an email', () => {
    settings.emailType(userInfo.email);
    settings.setingsBtn.click();

    settings.assertChanges();
  });

  it('should provide an ability to update password', () => {
    settings.passwordType(userInfo.password);
    settings.setingsBtn.click();

    settings.assertChanges();
  });

  it('should provide an ability to log out', () => {
    settings.logOutBtn.click();

    settings.assertConduitBanner();
  });
});
