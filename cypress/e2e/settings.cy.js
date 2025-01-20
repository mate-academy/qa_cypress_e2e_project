/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsInPage = new SettingsPageObject();
const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
      settingsInPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    cy.task('generateUser').then((newUser) => {
      settingsInPage.typeUserName(newUser.username);
      settingsInPage.clickUpdateBtn();
      settingsInPage.clickModalOkBtn();

      homePage.assertHeaderContainUsername(newUser.username);
    });
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'New bio text. Check me';

    settingsInPage.typeBio(newBio);
    settingsInPage.clickUpdateBtn();
    settingsInPage.clickModalOkBtn();

    settingsInPage.visit(`#/@${user.username}/`);
    settingsInPage.findBioText(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'papashka@gmail.com';

    settingsInPage.typeEmail(newEmail);
    settingsInPage.clickUpdateBtn();
    signUpPage.findModalTitle('Update successful!');
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'NewPassword123!';
    settingsInPage.typePassword(newPassword);
    settingsInPage.clickUpdateBtn();
    settingsInPage.clickModalOkBtn();
    settingsInPage.clickLogoutBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsInPage.clickLogoutBtn();
  });
});
