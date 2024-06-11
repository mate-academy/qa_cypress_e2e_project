import PageObject from '../PageObject';

class PopUpPageObject extends PageObject {
  get regSuccess() {
    return {
      title: 'Welcome!',
      text: 'Your registration was successful!'
    };
  }

  get regFailedWithoutUsername() {
    return {
      title: 'Registration failed!',
      text: 'Username field required.'
    };
  }

  get regFailedWithoutEmail() {
    return {
      title: 'Registration failed!',
      text: 'Email field required.'
    };
  }

  get regFailedWithoutPassword() {
    return {
      title: 'Registration failed!',
      text: 'Password field required.'
    };
  }

  get regFailedPasswordValidation() {
    return {
      title: 'Registration failed!',
      text:
        'Password must be 8 characters long ' +
        'and include 1 number, 1 uppercase letter,' +
        ' and 1 lowercase letter.'
    };
  }

  get regFailedEmailValidation() {
    return {
      title: 'Registration failed!',
      text: 'Email must be a valid email.'
    };
  }

  get signInFailedCredentials() {
    return {
      title: 'Login failed!',
      text: 'Invalid user credentials.'
    };
  }

  get signInFailedEmptyEmail() {
    return {
      title: 'Login failed!',
      text: 'Email field required.'
    };
  }

  get signInFailedEmptyPassword() {
    return {
      title: 'Login failed!',
      text: 'Password field required.'
    };
  }

  get settingsUpdSuccessful() {
    return {
      title: 'Update successful!',
      text: ''
    };
  }

  get settingsUpdateFailedPasswordValidation() {
    return {
      title: 'Update failed!',
      text:
        'Password must be 8 characters long ' +
        'and include 1 number, 1 uppercase letter,' +
        ' and 1 lowercase letter.'
    };
  }

  get settingsUpdateFailedEmail() {
    return {
      title: 'Update failed!',
      text: 'Email must be a valid email.'
    };
  }

  get articleFailed() {
    return {
      title: 'Oops!'
    };
  }

  get title() {
    return cy.get('.swal-title');
  }

  assertTitle(title) {
    this.title.should('contain', title);
  }

  get text() {
    return cy.get('.swal-text');
  }

  assertText(text) {
    this.text.should('contain', text);
  }

  get okBtn() {
    return cy.get('[class="swal-button swal-button--confirm"]');
  }

  okBtnClick() {
    this.okBtn.click();
  }

  popUpAssert(process) {
    switch (process) {
      case 'registration: success':
        this.assertTitle(this.regSuccess.title);
        this.assertText(this.regSuccess.text);
        break;
      case 'registration: without username':
        this.assertTitle(this.regFailedWithoutUsername.title);
        this.assertText(this.regFailedWithoutUsername.text);
        break;
      case 'registration: without email':
        this.assertTitle(this.regFailedWithoutEmail.title);
        this.assertText(this.regFailedWithoutEmail.text);
        break;
      case 'registration: without password':
        this.assertTitle(this.regFailedWithoutPassword.title);
        this.assertText(this.regFailedWithoutPassword.text);
        break;
      case 'registration: password validation':
        this.assertTitle(this.regFailedPasswordValidation.title);
        this.assertText(this.regFailedPasswordValidation.text);
        break;
      case 'registration: email failed':
        this.assertTitle(this.regFailedEmailValidation.title);
        this.assertText(this.regFailedEmailValidation.text);
        break;
      case 'sign in: not valid credentials':
        this.assertTitle(this.signInFailedCredentials.title);
        this.assertText(this.signInFailedCredentials.text);
        break;
      case 'sign in: without email':
        this.assertTitle(this.signInFailedEmptyEmail.title);
        this.assertText(this.signInFailedEmptyEmail.text);
        break;
      case 'sign in: without password':
        this.assertTitle(this.signInFailedEmptyPassword.title);
        this.assertText(this.signInFailedEmptyPassword.text);
        break;
      case 'settings: update successful':
        this.assertTitle(this.settingsUpdSuccessful.title);
        break;
      case 'settings: failed password':
        this.assertTitle(this.settingsUpdateFailedPasswordValidation.title);
        this.assertText(this.settingsUpdateFailedPasswordValidation.text);
        break;
      case 'settings: failed email':
        this.assertTitle(this.settingsUpdateFailedEmail.title);
        this.assertText(this.settingsUpdateFailedEmail.text);
        break;
      case 'article: failed':
        this.assertTitle(this.articleFailed.title);
        break;
    }

    this.okBtnClick();
  }
}

export default PopUpPageObject;
