/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />
import UpdateUsernamePageObject from '../support/pages/updateUsername.pageObject';
import UpdateBioPageObject from '../support/pages/updateBio.pageObject';
import UpdateEmailPageObject from '../support/pages/updateEmail.pageObject';
import UpdatePasswordPageObject from '../support/pages/updatePassword.pageObject';
import LogOutPageObject from '../support/pages/logOut.pageObject';

describe('Settings page', () => {
  let user;
  const newUsername = 'newUsername';
  const newEmail = 'newEmail';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    const updateUsernamePage = new UpdateUsernamePageObject();
    // eslint-disable-next-line max-len
    cy.visit('/#/settings');

    updateUsernamePage.updateUsername(newUsername);
    cy.contains('.swal-title', 'Update successful!').should('be.visible');
    cy.get('.swal-modal').should('be.visible');
    cy.get('#app nav li a').should('contain', newUsername);
    cy.contains('#app nav li a', newUsername).should('be.visible');
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    const updateBioPage = new UpdateBioPageObject();
    updateBioPage.visit();
    const newBio = 'This is my updated bio!';
    updateBioPage.updateBio(newBio);

    cy.contains('.swal-title', 'Update successful!').should('be.visible');
    cy.get('.swal-modal').should('be.visible');
    cy.get('#app form textarea[placeholder="Short bio about you"]').should('have.value', newBio);
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    const updateEmailPage = new UpdateEmailPageObject();
    updateEmailPage.visit();
    updateEmailPage.updateEmail(newEmail);

    cy.contains('.swal-title', 'Update successful!').should('be.visible');
    cy.get('.swal-modal').should('be.visible');
    cy.get('#app > div > div > div > div > form > fieldset > fieldset:nth-child(1) > input').should('have.value', newEmail);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    const updatePasswordPage = new UpdatePasswordPageObject();
    updatePasswordPage.visit();
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    const logOutPage = new LogOutPageObject();
    logOutPage.visit();
    logOutPage.logout();
    cy.url().should('include', '/#/');
  });
});
