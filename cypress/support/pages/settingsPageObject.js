/* eslint-disable */
import PageObject from '../PageObject'

class SettingsPageObject extends PageObject {
  url = '/#/settings'

  get usernameField() {
    return cy.getByDataCy('update-username-field')
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn')
  }

  get bioField() {
    return cy.getByDataCy('update-bio-field')
  }

  get emailField() {
    return cy.getByDataCy('update-email-field')
  }

  get passwordField() {
    return cy.getByDataCy('update-password-field')
  }

  get logoutBtn() {
    return cy.getByDataCy('or-click-here-to-logout-btn')
  }

  typeUsername(username) {
    this.usernameField.clear().type(username)
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click()
  }

  assertProfilePage(username) {
    return cy.url().should('contain', `/profile/${username}`)
  }

  typeBio(bio) {
    this.bioField.type(bio)
  }

  typeEmail(email) {
    this.emailField.clear().type(email)
  }

  typePassword(password) {
    this.passwordField.clear().type(password)
  }

  clickLogoutBtn() {
    this.logoutBtn.click()
  }

  assertLogout(expectedPath) {
    cy.url().should('include', expectedPath)
  }
}

export default SettingsPageObject
