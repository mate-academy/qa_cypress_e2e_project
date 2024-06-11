/// <reference types='cypress' />
/// <reference types='../support' />
import SettingsPageObject from '../support/pages/SettingsPageObject';
import { faker } from '@faker-js/faker';
// import PageObject from '../support/pages/PageObject';
// const SettingsPage = new SettingsPageObject();
const settingsPage = new SettingsPageObject();
const newUsername = faker.internet.userName();
  const newBio = faker.lorem.sentence();
  const newEmail = faker.internet.email();
  const newPassword = faker.internet.password();
describe('Settings page', () => {
  let user;
  
  beforeEach(() => {
    cy.task('db:clear');
    // cy.visit('/#/');
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUserName(newUsername);
    settingsPage.clickUpdateBtn();
    // Додаткові перевірки, що зміни збережено
    //cy.contains(newUsername).should('exist');
    cy.get('.swal-title').should('contain','Update successful!')

  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateBtn();
    // Додаткові перевірки, що зміни збережено
   // cy.contains(newBio).should('exist');
    cy.get('.swal-title').should('contain','Update successful!')
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateBtn();
    // Додаткові перевірки, що зміни збережено
    //cy.contains(newEmail).should('exist');
    settingsPage.assertUpdatedEmail();

  });

  it("should provide an ability to update a password", () => {
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.clickOkBtn();
    settingsPage.clickLogoutBtn();
    cy.visit('/#/');
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    //cy.contains(newPassword).should('exist');

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    // Додаткові перевірки, що користувач вийшов з системи
    
    cy.url().should('include', '/login');
  });
})
});
