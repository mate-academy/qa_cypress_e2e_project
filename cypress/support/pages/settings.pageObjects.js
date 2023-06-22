import PageObject from '../PageObject';


class settingsPageObject extends PageObject {
  url = '/#/settings/';

  get usernameField(){
    return cy.getByDataCy('username-settings');
  }

  get bioField(){
    return cy.getByDataCy('bio-settings');
  }

  get emailField(){
    return cy.getByDataCy('email-settings');
  }

  get PasswordField(){
    return cy.getByDataCy('password-settings');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn-settings').click();
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn-settings').click();
  }
}

export default settingsPageObject;