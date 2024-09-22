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

  it('should provide an ability to update bio', () => {
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
    const updateSuccessfulMessage = 'Update successful!';
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataQa('settings-user-email-field').should('be.visible');
    cy.getByDataQa('settings-user-email-field').clear();
    cy.getByDataQa('settings-user-email-field').type(user.updateEmail);
    cy.getByDataQa('settings-update-settings-btn').click();
    cy.get('.swal-modal').should('contain', updateSuccessfulMessage);
    cy.get('.swal-button').click();
    cy.getByDataQa('settings-user-email-field')
      .should('contain', user.updateEmail);
  });

  it('should provide an ability to update password', () => {
    const updateSuccessfulMessage = 'Update successful!';
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataQa('settings-user-password-field').should('be.visible');
    cy.getByDataQa('settings-user-password-field').type(user.updatePassword);
    cy.getByDataQa('settings-update-settings-btn').click();
    cy.get('.swal-modal').should('contain', updateSuccessfulMessage);
    cy.get('.swal-button').click();
    cy.reload().clearCookies();
    cy.visit('/#/login');
    cy.getByDataQa('email-sign-in')
      .type(user.email);
    cy.getByDataQa('password-sign-in')
      .type(user.updatePassword);
    cy.getByDataQa('sign-in-btn')
      .click();

    cy.getByDataQa('username-link')
      .should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');
    cy.getByDataQa('settings-log-out-btn').should('be.visible');
    cy.getByDataQa('settings-log-out-btn').click();
    cy.url().should('be.equal', 'http://localhost:1667/#/');
    cy.getByDataQa('sign-in-link')
      .should('exist');
    cy.getCookie('drash_sess')
      .should('have.property', 'value', 'null');
  });
});
