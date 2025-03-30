/// <reference types='cypress' />
/// <reference types='../support' />
import faker from 'faker';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingPageObject from '../support/pages/setting.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const signInPage = new SignInPageObject();
const HomePage = new HomePageObject();
const SettingPage = new SettingPageObject();
const UserPage = new UserPageObject();

describe('Settings page', () => {
  let user;
  const setting = {
    username: faker.name.firstName(),
    bio: faker.lorem.word(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.username, user.password);
      SettingPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    SettingPage.TypeUsernameField(setting.username);
    SettingPage.ClickOnUpdateSettingsBtn();
    SettingPage.AssertInfoUpdate('Update successful!');
    SettingPage.ClickOnConfirmButton();

    HomePage.visit();
    HomePage.assertHeaderContainUsername(setting.username);

  });

  it('should provide an ability to update bio', () => {
    SettingPage.TypeBioField(setting.bio);
    SettingPage.ClickOnUpdateSettingsBtn();
    SettingPage.AssertInfoUpdate('Update successful!');
    SettingPage.ClickOnConfirmButton();

    UserPage.pageUser(user.username);
    UserPage.assertBioUserExist(setting.bio);
  });

  it('should provide an ability to update an email', () => {
    SettingPage.TypeEmailField(setting.email);
    SettingPage.ClickOnUpdateSettingsBtn();
    SettingPage.AssertInfoUpdate('Update successful!');
    SettingPage.ClickOnConfirmButton();
    SettingPage.ClickOnLogoutBtn();

    signInPage.visit();
    signInPage.typeEmail(setting.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    HomePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    SettingPage.TypePasswordField(setting.password);
    SettingPage.ClickOnUpdateSettingsBtn();
    SettingPage.AssertInfoUpdate('Update successful!');
    SettingPage.ClickOnConfirmButton();
    SettingPage.ClickOnLogoutBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(setting.password);
    signInPage.clickSignInBtn();

    HomePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    SettingPage.ClickOnLogoutBtn();

    HomePage.assertHeaderContainSignIn();
    HomePage.assertHeaderContainSignUp();
  });
});
