import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get username() {
    return cy.getByDataQa('username');
  }

  get bio() {
    return cy.getByDataQa('bio');
  }

  get email() {
    return cy.getByDataQa('email');
  }

  get password() {
    return cy.getByDataQa('password');
  }

  get submitButton() {
    return cy.getByDataQa('submit');
  }

  get logoutButton() {
    return cy.contains('.btn', 'Or click here to logout.');
  }

  clearUsername() {
    this.username.clear();
  }

  typeUsername(username) {
    this.username.type(username);
  }

  clearBio() {
    this.bio.clear();
  }

  typeBio(bio) {
    this.bio.type(bio);
  }

  clearEmail() {
    this.email.clear();
  }

  typeEmail(email) {
    this.email.type(email);
  }

  clearPassword() {
    this.password.clear();
  }

  typePassword(password) {
    this.password.type(password);
  }

  clickSubmit() {
    this.submitButton.click();
  }

  assertUsername(nameToCompare) {
    this.username.should('have.value', nameToCompare);
  }

  assertBio(bioToCompare) {
    this.bio.should('have.value', bioToCompare);
  }

  assertEmail(emailToCompare) {
    this.email.should('have.value', emailToCompare);
  }

  assertPassword(passwordToCompare) {
    this.password.should('have.value', passwordToCompare);
  }

  logout() {
    this.logoutButton.click();
  }
}

export default SettingsPageObject;
