import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get profilePictureField() {
    return cy.getByPlaceholder('URL or profile picture');
  }

  get usernameField() {
    return cy.getByPlaceholder('Your username');
  }

  get bioField() {
    return cy.getByPlaceholder('Short bio about you');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  get updateSettingsBtn() {
    return cy.contains('.btn', 'Update Settings');
  }

  get updateSuccessfulMessage() {
    cy.wait(1000);
    return cy.get(`[role="dialog"]`);
  }

  get dialogOkBtn(){
   return cy.get('.swal-button');
  }

  get logoutBtn() {
    return cy.contains('.btn', 'Or click here to logout.');
  }
}

  

export default SettingsPageObject;