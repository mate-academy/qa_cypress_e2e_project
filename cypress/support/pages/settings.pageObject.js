import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get updateSettingsBtn() {
    return cy.contains('button', 'Update Settings');
  }

  visit() {
    cy.visit(this.url);
  }

  changeItem(placeholder, newValue) {
    cy.get(`[placeholder="${placeholder}"]`).as('input');
    cy.get('@input').clear();
    cy.get('@input').type(newValue);
  }

  checkUrl(username) {
    cy.url().should('include', `/profile/${username}`);
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }
}

export default SettingsPageObject;
