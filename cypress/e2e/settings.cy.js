/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject
  from '../support/pages/home.pageObject';
import SettingsPageObject
  from '../support/pages/settings.pageObject';
import ProfilePageObject
  from '../support/pages/profile.pageObject';
import SignInPageObject
  from '../support/pages/signIn.pageObject';
import { faker } from '@faker-js/faker';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  const randomNumber = Math.ceil(Math.random(1000) * 1000);
  const userName = faker.name.firstName() + `${randomNumber}`;

  const data = {
    username: userName,
    bio: faker.lorem.sentence(),
    email: 'test' + `${randomNumber}` + '@mail.com',
    password: '!QAZ2wsx3edc'
  };

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeUsernameField(data.username);
    settingsPage.clickUpdateBtn();
    settingsPage.assertErrorTitle('Update successful!');
    user.username = data.username;

    homePage.visit();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeBioField(data.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertErrorTitle('Update successful!');
    settingsPage.clickErrorBtn();

    profilePage.visit(`/#/@${user.username}/`);
    profilePage.assertBio(data.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeEmailField(data.email);
    settingsPage.clickUpdateBtn();
    settingsPage.assertErrorTitle('Update successful!');
    settingsPage.clickErrorBtn();
    // user.email = data.email;

    signInPage.visit();
    signInPage.typeEmail(data.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typePasswordField(data.password);
    settingsPage.clickUpdateBtn();
    settingsPage.assertErrorTitle('Update successful!');
    settingsPage.clickErrorBtn();
    user.password = data.password;

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogOutBtn();
    homePage.assertLogOut();
  });
});
