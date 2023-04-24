import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get title() {
    return cy.getByDataQA('title');
  }

  get profileImgUrl() {
    return cy.getByDataQA('profile-img-url');
  }

  get username() {
    return cy.getByDataQA('username');
  }

  get userBio() {
    return cy.getByDataQA('user-bio');
  }

  get email() {
    return cy.getByDataQA('email');
  }

  get password() {
    return cy.getByDataQA('password');
  }

  get updateSettingsBtn() {
    return cy.getByDataQA('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataQA('logout-btn');
  }

  get closeModal() {
    return cy.contains('button', 'OK').click();
  }
}

export default SettingsPageObject;
