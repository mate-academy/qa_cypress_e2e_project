import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  clickUpdateUsername() {
    cy.get(':nth-child(1) > .form-control').click();
  }

  clickUpdateBio() {
    cy.get(':nth-child(3) > .form-control').click();
  }

  clickUpdateEmail() {
    cy.get(':nth-child(4) > .form-control').click();
  }

  clickUpdatePassword() {
    cy.get(':nth-child(5) > .form-control').click();
  }

  typeNewValue(selector, newValue) {
    cy.get(selector).clear().type(newValue);
  }

  clickUpdateSettingsButton() {
    cy.get('form > :nth-child(1) > .btn').click();
  }
}

export default SettingsPageObject;
