import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.task('db:clear');

      cy.register(user.email, user.username, user.password);

      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      homePage.assertHeaderContainUsername(user.username);

      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = user.username + 'Updated';

    settingsPage.clearUsername();
    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateBtn();

    settingsPage.assertUsernameValue('Update successful!');
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'This is my updated bio';

    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateBtn();

    settingsPage.assertUsernameValue('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'updated' + user.email;

    settingsPage.clearEmail();
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateBtn();

    settingsPage.assertUsernameValue('Update successful!');
  });

  it('should provide an ability to update password', () => {
    const newPassword = user.password + 'New';

    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateBtn();

    settingsPage.assertUsernameValue('Update successful!');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    homePage.assertUrl();
    homePage.assertLoggedOut();
  });
});
