/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject'

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let article;

 beforeEach(() => {
      cy.task('db:clear');
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
      })

      signInPage.visit();
      cy.task('generateUser').then((generateUser) => {
        user = generateUser;
      })
      .then(() => {
        cy.register(user.email, user.username, user.password);
        cy.logIn(user.email, user.password);
        cy.wait(1000);
        settingsPage.settingsLink();
});
});

  it('should provide an ability to update username', () => {
    settingsPage.newUser();
    settingsPage.updateBtn();
  });

  it('should provide an ability to update bio', () => {
     settingsPage.newBio();
     settingsPage.updateBtn();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.newEmail();
    settingsPage.updateBtn();
  });

  it('should provide an ability to update password', () => {
    settingsPage.newPassword();
    settingsPage.updateBtn();
  });

  it.only('should provide an ability to log out', () => {
   settingsPage.logOutBtn()
  });
});
