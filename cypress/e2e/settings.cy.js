/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import './../support/commands.js'
import {
  newEmail,
  newPassword,
  newBio,
  newUsername,
} from './../support/testData.js';

const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      expect(user).to.exist;
      signInPage.visit();
      cy.register(user.email, user.username, user.password);
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
      cy.wait(2000)
    });
  });

  it('should provide an ability to update username', () => {
    cy.updateUsername(newUsername)
  });

  it ('should provide an ability to update bio', () => {
    cy.updateBio(newBio)
  });

  it ('should provide an ability to update an email', () => {
    cy.updateEmail(newEmail)
  });

  it('should provide an ability to update password', () => {
    cy.updatePassword(newPassword)
  });

  it ('should provide an ability to log out', () => {
    cy.logOut()
  });
});
