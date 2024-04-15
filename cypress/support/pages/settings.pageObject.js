import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

get usernameField() {
  return cy.getByDataQa('username-settings');
}

get bioField() {
  return cy.getByDataQa('bio-settings');
}

get userInfo() {
  return cy.getByDataQa('bio-settings');
}

get emailField() {
  return cy.getByDataQa('email-settings');
}

get passwordField() {
  return cy.getByDataQa('New password-settings');
}

get updateButton() {
  return cy.getByDataQa('update button-settings');
}

get logoutButton() {
  return cy.getByDataQa('logout-button-settings');
}

get profileLinkValue() {
    return cy.getByDataQa('profile-link');
}

assertUsernameLinkisVisible() {
    this.profileLinkValue.should('be.visible');
}

assertUpdatedUserInfo(newBio) {
    this.userInfo.should('contain', newBio);
}

assertUsernameValue(newUsername) {
    this.profileLinkValue.should('contain', newUsername);
}

assertEmailValue(newEmail) {
  this.emailField.should('have.value', newEmail);
}

assertTokenIsRemoved() {
    cy.getCookie('auth').should('not.exist');
}

}

export default SettingsPageObject;