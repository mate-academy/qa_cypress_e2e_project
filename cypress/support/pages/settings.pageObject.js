import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return this.getByQa('settings-username');
  }

  get bioField() {
    return this.getByQa('settings-bio');
  }

  get emailField() {
    return this.getByQa('settings-email');
  }

  get passwordField() {
    return this.getByQa('settings-password');
  }

  get updateBtn() {
    return this.getByQa('settings-submit');
  }

  get logoutBtn() {
    return this.getByQa('settings-logout');
  }

  replace(field, value) {
    field.clear().type(value);
    this.updateBtn.click();
    this.assertUpdateSuccessful();
  }

  updateUsername(username) {
    this.replace(this.usernameField, username);
  }

  updateBio(bio) {
    this.replace(this.bioField, bio);
  }

  updateEmail(email) {
    this.replace(this.emailField, email);
  }

  updatePassword(password) {
    this.passwordField.clear().type(password);
    this.updateBtn.click();
    this.assertUpdateSuccessful();
  }

  assertUpdateSuccessful() {
    this.assertAlertContains('Update successful!');
    this.confirmAlert();
  }

  logout() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
