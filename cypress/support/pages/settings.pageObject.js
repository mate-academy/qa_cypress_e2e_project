import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  get updateSettingsElement() {
    return cy.getByDataQa('update-settings');
  }

  get dialogTitleElement() {
    return cy.getByDataQa('dialog-title');
  }

  get logoutElement() {
    return cy.getByDataQa('logout');
  }

  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('settings-username');
  }

  get bioField() {
    return cy.getByDataQa('settings-bio');
  }

  get emailField() {
    return cy.getByDataQa('settings-email');
  }

  get passwordField() {
    return cy.getByDataQa('settings-password');
  }

  update(field, value) {
    this[`${field}Field`].clear();
    this[`${field}Field`].type(value);
    cy.intercept('POST', '/user').as('updateUser');
    this.updateSettingsElement.click();
    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
    this.dialogTitleElement.should('have.text', 'Update successful!');
    this.dismissDialog();
  }

  assertField(field, value) {
    this[`${field}Field`].should('have.value', value);
  }

  logout() {
    this.logoutElement.click();
    this.assertSignedOut();
  }
}

export default SettingsPageObject;
