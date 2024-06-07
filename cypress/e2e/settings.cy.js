/// <reference types='cypress' />
/// <reference types='../support' />

import PageObject from '../support/PageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const pageObject = new PageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let data;
  const successPopupText = 'Update successful!';
  const exampleEmail = 'example@email.slavaUkraini';
  const examplePassword = 'example@passw0rd.slavaUkraini';
  const urlRegisterInclude = 'register';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateData').then((generateData) => {
      data = generateData;
    });
  });

  it('should provide an ability to update username', () => {
    cy.signIn(data.email, data.username, data.password);
    settingsPage.visit();
    settingsPage.assertUsername(data.username);

    settingsPage.typeUsername(data.username);
    settingsPage.clickUpdateSettingsBtn();
    pageObject.assertPopupContainTitle(successPopupText);

    cy.reload();
    settingsPage.assertUsername(`${data.username}${data.username}`);
  });

  it('should provide an ability to update bio', () => {
    cy.signIn(data.email, data.username, data.password);
    settingsPage.visit();
    settingsPage.assertBio('');

    settingsPage.typeBio(data.bio);
    settingsPage.clickUpdateSettingsBtn();
    pageObject.assertPopupContainTitle(successPopupText);

    cy.reload();
    settingsPage.assertBio(data.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.signIn(data.email, data.username, data.password);
    settingsPage.visit();
    settingsPage.assertEmail(data.email);

    settingsPage.typeEmail(exampleEmail);
    settingsPage.clickUpdateSettingsBtn();
    pageObject.assertPopupContainTitle(successPopupText);

    cy.reload();
    settingsPage.assertEmail(exampleEmail);
    settingsPage.clickLogoutBtn();

    signInPage.visit();
    signInPage.typeEmail(exampleEmail);
    signInPage.typePassword(data.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(data.username);
  });

  it('should provide an ability to update password', () => {
    cy.signIn(data.email, data.username, data.password);
    settingsPage.visit();

    settingsPage.typePassword(examplePassword);
    settingsPage.clickUpdateSettingsBtn();
    pageObject.assertPopupContainTitle(successPopupText);
    cy.reload();
    settingsPage.clickLogoutBtn();

    signInPage.visit();
    signInPage.typeEmail(data.email);
    signInPage.typePassword(examplePassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(data.username);
  });

  it('should provide an ability to log out', () => {
    cy.signIn(data.email, data.username, data.password);
    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    homePage.visit();
    homePage.assertHeaderContainSignUpBtn();
    homePage.clickHeaderSignUpBtn();
    pageObject.assertUrlContainsText(urlRegisterInclude);
  });
});
