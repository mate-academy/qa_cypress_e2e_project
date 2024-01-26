/// <reference types='cypress' />
/// <reference types='../support' />

describe('Settings page', () => {
  let user;
  let userSettings;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateUserSettings').then((generateUserSettings) => {
      userSettings = generateUserSettings;
    });
  });

  it('should provide an ability to update username', () => {
    cy.visit('/#/settings');
    cy.getByDataCy('username').clear().type(userSettings.username);
    cy.intercept('POST', '**/user').as('updateUser');
    cy.getByDataCy('updateBTN').click();
    cy.wait('@updateUser').then((interception) => {
      expect(interception.response.body.user.username)
        .to.equal(userSettings.username);
    });
    cy.visit('/#/settings');
  });

  it('should provide an ability to update bio', () => {
    cy.visit('/#/settings');
    cy.getByDataCy('BioInfo').clear().type(userSettings.bio);
    cy.intercept('POST', '**/user**').as('updateUser');
    cy.getByDataCy('updateBTN').click();
    cy.wait('@updateUser').then((interception) => {
      expect(interception.response.body.user.bio)
        .to.equal(userSettings.bio);
    });
  });

  it('should provide an ability to update an email', () => {
    cy.visit('/#/settings');
    cy.getByDataCy('Email').clear().type(userSettings.email);
    cy.intercept('POST', '**/user').as('updateUser');
    cy.getByDataCy('updateBTN').click();
    cy.wait('@updateUser').then((interception) => {
      expect(interception.response.body.user.email)
        .to.equal(userSettings.email);
    });
  });

  it('should provide an ability to update password', () => {
    cy.visit('/#/settings');
    cy.getByDataCy('Password').clear().type(userSettings.password);
    cy.intercept('POST', '**/user').as('updateUser');
    cy.getByDataCy('updateBTN').click();
    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
    cy.clearAllCookies();
    cy.login(user.email, user.username, userSettings.password);
    cy.visit('/#/settings');
    cy.reload();
    cy.getByDataCy('username-link').should('contain.text', user.username);
  });
});
