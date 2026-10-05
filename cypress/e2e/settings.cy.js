import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const page = new SettingsPageObject();
const signIn = new SignInPageObject();
const profile = new ProfilePageObject();

describe('Settings', () => {
  let user;
  let updated;

  beforeEach(() => {
    cy.task('generateUser').then((data) => {
      user = data;
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
    });
    cy.task('generateUser').then((data) => { updated = data; });
    page.visit();
  });

  it('updates the username and persists it after reload', () => {
    page.assertField('username', user.username);
    page.update('username', updated.username);
    page.reload();
    page.assertField('username', updated.username);
    page.assertHeaderContainUsername(updated.username);
    page.openProfile();
    profile.visitUser(updated.username);
  });

  it('updates the bio on the public profile', () => {
    page.update('bio', updated.bio);
    page.reload();
    page.assertField('bio', updated.bio);
    page.openProfile();
    profile.assertBio(updated.bio);
  });

  it('updates the email used to sign in', () => {
    page.assertField('email', user.email);
    page.update('email', updated.email);
    page.reload();
    page.assertField('email', updated.email);
    page.logout();
    signIn.visit();
    signIn.signIn(user);
    signIn.assertErrors('Invalid user credentials.');
    signIn.dismissDialog();
    signIn.visit();
    signIn.signIn({ ...user, email: updated.email });
    signIn.assertHeaderContainUsername(user.username);
  });

  it('updates the password and rejects the old password', () => {
    page.update('password', updated.password);
    page.logout();
    signIn.visit();
    signIn.signIn(user);
    signIn.assertErrors('Invalid user credentials.');
    signIn.dismissDialog();
    signIn.visit();
    signIn.signIn({ ...user, password: updated.password });
    signIn.assertHeaderContainUsername(user.username);
  });

  it('logs out and remains signed out after reload', () => {
    page.logout();
    page.reload();
    page.assertSignedOut();
  });
});
