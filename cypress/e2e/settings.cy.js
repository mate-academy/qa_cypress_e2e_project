/// <reference types='cypress' />
/// <reference types='../support' />
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const settingPage = new SettingsPageObject();

describe('Settings', () => {
  let user;

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.usermname, user.password);
      });
    });
    settingPage.visit();
  });

  it.only('should provide an ability to update username', () => {
    homePage.fillField('updateUsername', user.username);
    settingPage.clickUpdateBtn();
    settingPage.assertSuccessUpdate('Update successful!');
    settingPage.assertUpdatedUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    homePage.fillField('updateBio', user.bio);
    settingPage.clickUpdateBtn();
    settingPage.assertSuccessUpdate('Update successful!');
    settingPage.assertUpdatedBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    homePage.fillField('updateEmail', user.updateEmail);
    settingPage.clickUpdateBtn();
    settingPage.assertSuccessUpdate('Update successful!');
  });

  it('should provide an ability to update password', () => {
    homePage.fillField('updatePassword', user.updatePassw);
    settingPage.clickUpdateBtn();
    settingPage.assertSuccessUpdate('Update successful!');
  });

  it.only('should provide an ability to log out', () => {
    settingPage.clickLogOutBtn();
    settingPage.assertLogOut(user.username);
  });
});
