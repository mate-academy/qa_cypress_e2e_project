import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() { return this.getByQa('username-sign-up'); }
  get emailField() { return this.getByQa('email-sign-up'); }
  get passwordField() { return this.getByQa('password-sign-up'); }
  get signUpBtn() { return this.getByQa('sign-up-btn'); }
  get errorMessages() { return this.getByQa('error-messages'); }

  typeUsername(username) { this.usernameField.type(username); }
  typeEmail(email) { this.emailField.type(email); }
  typePassword(password) { this.passwordField.type(password); }
  clickSignUp() { this.signUpBtn.click(); }
  assertSignedUp(username) {
    this.shouldContainByQa('username-link', username);
  }

  assertErrorContains(text) {
    this.errorMessages
      .find('li')
      .then(($items) => {
        const allText = $items.toArray().map((el) => el.innerText).join(' ');
        expect(allText).to.contain(text);
      });
  }
}

export default SignUpPageObject;
