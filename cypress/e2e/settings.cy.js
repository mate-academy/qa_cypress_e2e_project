/// <reference types='cypress' />
/// <reference types='../support' />

describe('Settings page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    const updateSuccessfulMessage = 'Update successful!';
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataQa('settings-user-username-field').should('be.visible');
    cy.getByDataQa('settings-user-username-field').clear();
    cy.getByDataQa('settings-user-username-field').type(user.updateUsername);
    cy.getByDataQa('settings-update-settings-btn').click();
    cy.get('.swal-modal').should('contain', updateSuccessfulMessage);
    cy.getByDataQa('username-link').should('contain', user.updateUsername);
  });

  it.only('should provide an ability to update bio', () => {
    const updateSuccessfulMessage = 'Update successful!';
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataQa('settings-user-bio-field').should('be.visible');
    cy.getByDataQa('settings-user-bio-field').type(user.bio);
    cy.getByDataQa('settings-update-settings-btn').click();
    cy.get('.swal-modal').should('contain', updateSuccessfulMessage);
    cy.get('.swal-button').click();
    cy.getByDataQa('username-link').click();
    cy.getByDataQa('user-profile-image').should('contain', user.bio);
  });

  it('should provide an ability to update an email', () => {

  });

  it('should provide an ability to update password', () => {

  });

  it('should provide an ability to log out', () => {

  });
});
