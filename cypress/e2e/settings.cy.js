/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.request('POST', '/users', {
      email: user.email,
      username: user.username,
      password: user.password,
    }).then(({ body }) => {
      cy.setCookie('drash_sess', body.user.token);
    });
    settingsPage.visit();
    cy.getByDataCy('username-settings')
      .should('have.value', user.username);
  });

  it('should provide an ability to update username', () => {
    const newUsername = user.username + '_v2';

    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button--confirm').click();

    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'This is my updated bio text.';

    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button--confirm').click();

    cy.getByDataCy('bio-settings').should('contain', newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'updated_' + user.email;

    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button--confirm').click();

    cy.getByDataCy('email-settings').should('have.value', newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'NewPass123!';

    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button--confirm').click();

    cy.login(user.email, newPassword);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    cy.url().should('include', '/#/');
    cy.getByDataCy('username-link').should('not.exist');
  });
});
