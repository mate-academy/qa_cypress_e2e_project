/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import SettingsPageObject from '../support/pages/settings.pageObject';

const settingPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser')
      .then((generateUser) => {
        cy.login(
          generateUser.email,
          generateUser.username,
          generateUser.password
        );
        user = generateUser;
      })
      .then(() => {
        settingPage.visit();
      });
  });

  it.only('should provide an ability to update username', () => {
    const newUsername = `${faker.person.lastName().toLocaleLowerCase()}123123`;

    settingPage.changeItem('Username', `${newUsername}`);
    settingPage.clickOnUpdateSettingsBtn();
    settingPage.checkUrl(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.person.bio();

    settingPage.changeItem('Short bio about you', `${newBio}`);
    settingPage.clickOnUpdateSettingsBtn();
    settingPage.checkUrl(user.username);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    settingPage.changeItem('Email', `${newEmail}`);
    settingPage.clickOnUpdateSettingsBtn();
    settingPage.checkUrl(user.username);
  });

  it('should provide an ability to update password', () => {
    const newPass = faker.internet.password();

    settingPage.changeItem('New Password', `${newPass}`);
    settingPage.clickOnUpdateSettingsBtn();
    settingPage.checkUrl(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.contains('button', 'Or click here to logout.').click();
    cy.url().should('include', '/');
  });
});
