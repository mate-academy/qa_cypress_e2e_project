import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get bioField() { return this.getByQa('bio'); }
  get usernameField() { return this.getByQa('username-settings'); }
  get emailField() { return this.getByQa('email-settings'); }
  get passwordField() { return this.getByQa('password-settings'); }
  get updateBtn() { return this.getByQa('update-settings-btn'); }

  typeBio(bio) { this.bioField.clear().type(bio); }
  typeUsername(username) { this.usernameField.clear().type(username); }
  typeEmail(email) { this.emailField.clear().type(email); }
  typePassword(password) { this.passwordField.clear().type(password); }
  clickUpdate() { this.updateBtn.click(); }
}

export default SettingsPageObject;
