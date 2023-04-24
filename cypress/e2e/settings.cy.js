/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.PageObject';
import Header from '../support/pages/header.pageObject';
import ModalWindow from '../support/pages/modalWindow.pageObject';

const settings = new SettingsPageObject();
const header = new Header();
const modal = new ModalWindow();

describe('Settings page', () => {
  let username, email, password;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      email = user.email;
      username = user.username;
      password = user.password;
      cy.loginNewUser(email, username, password);
    });
    settings.visit();
  });

  it('should provide an ability to update username', () => {
    settings.username.type('{selectAll}ChangedUsername');
    settings.updateSettingsBtn.click();
    cy.fixture('modalWindow').then((window) => {
      modal.title.should('have.text', window.updateSettingsSuccess);
      modal.submitFormBtn.click();
    });
    header.usernameLink.should('contain.text', 'ChangedUsername');
  });

  it('should provide an ability to update bio', () => {
    settings.userBio.type('{selectAll}Changed user bio');
    settings.updateSettingsBtn.click();
    cy.fixture('modalWindow').then((window) => {
      modal.title.should('have.text', window.updateSettingsSuccess);
      modal.submitFormBtn.click();
    });
  });

  it('should provide an ability to update an email', () => {
    settings.email.type('{selectAll}changed@email.com');
    settings.updateSettingsBtn.click();
    cy.fixture('modalWindow').then((window) => {
      modal.title.should('have.text', window.updateSettingsSuccess);
      modal.submitFormBtn.click();
    });
  });

  it('should provide an ability to update password', () => {
    settings.password.type('{selectAll}Changed123!');
    settings.updateSettingsBtn.click();
    cy.fixture('modalWindow').then((window) => {
      modal.title.should('have.text', window.updateSettingsSuccess);
      modal.submitFormBtn.click();
    });
    settings.logoutBtn.click();
    cy.login(email, 'Changed123!');
    header.usernameLink.should('contain.text', username);
  });

  it('should provide an ability to log out', () => {
    settings.logoutBtn.click();
    header.usernameLink.should('not.exist');
  });
});
