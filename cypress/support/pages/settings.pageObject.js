import PageObject from '../PageObject';
import generateData from '../generate/index';
import ProfilePageObject from './profile.pageObject';
import HomePageObject from './home.pageObject';
import SignInPageObject from './signIn.pageObject';

class SettingsPageObject extends PageObject {
  genData = generateData();

  url = '/#/settings';

  signInPage = new SignInPageObject();
  homePage = new HomePageObject();
  profilePage = new ProfilePageObject();

  get urlField() {
    return cy.getByDataCy('url-field-settings');
  }

  get usernameField() {
    return cy.getByDataCy('username-field-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-field-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-field-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-field-settings');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn-settings');
  }

  get logOutBtn() {
    return cy.getByDataCy('log-out-btn-settings');
  }

  urlFieldType(url) {
    this.urlField.clear();
    this.urlField.type(url);
  }

  usernameFieldType(username) {
    this.usernameField.clear();
    this.usernameField.type(username);
  }

  bioFieldType(bio) {
    this.bioField.clear();
    this.bioField.type(bio);
  }

  emailFieldType(email) {
    this.emailField.clear();
    this.emailField.type(email);
  }

  passwordFieldType(password) {
    this.passwordField.type(password);
  }

  updateBtnClick() {
    this.updateBtn.click();
  }

  logOutBtnClick() {
    this.logOutBtn.click();
  }

  updateInfoProcess(option) {
    switch (option) {
      case 'valid url':
        this.urlFieldType(this.genData.user.settings.url);
        break;
      case 'valid username':
        this.usernameFieldType(this.genData.user.settings.newUsername);
        break;
      case 'valid bio':
        this.bioFieldType(this.genData.user.settings.bio);
        break;
      case 'valid email':
        this.emailFieldType(this.genData.user.settings.newEmail.default);
        break;
      case 'valid password':
        this.passwordFieldType(
          this.genData.user.settings.newPassword.passwordDefault
        );
        break;
      case 'password less than 8':
        this.passwordFieldType(
          this.genData.user.settings.newPassword.passwordLessThan8
        );
        break;
      case 'password without upper':
        this.passwordFieldType(
          this.genData.user.settings.newPassword.passwordWithoutUpper
        );
        break;
      case 'password without number':
        this.passwordFieldType(
          this.genData.user.settings.newPassword.passwordWithoutNumber
        );
        break;
      case 'password without lower':
        this.passwordFieldType(
          this.genData.user.settings.newPassword.passwordWithoutLower
        );
        break;
      case 'email without name':
        this.emailFieldType(this.genData.user.settings.newEmail.withoutName);
        break;
      case 'email without at':
        this.emailFieldType(this.genData.user.settings.newEmail.withoutAt);
        break;
      case 'email without domain':
        this.emailFieldType(
          this.genData.user.settings.newEmail.withoutDomain
        );
        break;
      case 'email without top-domain':
        this.emailFieldType(
          this.genData.user.settings.newEmail.withoutTopDomain
        );
        break;
      case 'email without dot':
        this.emailFieldType(this.genData.user.settings.newEmail.withoutDot);
        break;
      case 'email with double at':
        this.emailFieldType(
          this.genData.user.settings.newEmail.withDoubleAt
        );
        break;
      case 'email with double dot':
        this.emailFieldType(
          this.genData.user.settings.newEmail.withDoubleDot
        );
        break;
    }

    this.updateBtnClick();
  }

  checkThat(checkWhat) {
    this.visit('/#/');

    if (checkWhat === 'url') {
      this.urlField.should('contain', this.genData.user.settings.url);
    }

    if (checkWhat === 'username') {
      this.homePage.assertHeaderContainUsername(
        this.genData.user.settings.newUsername
      );
    }

    if (checkWhat === 'bio') {
      cy.window().then((win) => {
        const userFromLocal = JSON.parse(win.localStorage.getItem('user'));
        cy.visit(`/#/@${userFromLocal.username}/`);
      });
      this.profilePage.profileBio.should(
        'contain',
        this.genData.user.settings.bio
      );
    }

    if (checkWhat === 'password') {
      this.homePage.visit();
      cy.reload();
      this.homePage.signInBtnClick();
      cy.window().then((win) => {
        const userFromLocal = JSON.parse(win.localStorage.getItem('user'));
        this.signInPage.signInConfirmProcess(
          userFromLocal.email,
          this.genData.user.settings.newPassword.passwordDefault
        );
        this.homePage.assertHeaderContainUsername(userFromLocal.username);
      });
    }

    if (checkWhat === 'email') {
      this.homePage.visit();
      cy.reload();
      this.homePage.signInBtnClick();

      cy.window().then((win) => {
        const userFromLocal = JSON.parse(win.localStorage.getItem('user'));
        this.signInPage.signInConfirmProcess(
          this.genData.user.settings.newEmail.default,
          this.genData.user.password.passwordDefault
        );
        this.homePage.assertHeaderContainUsername(userFromLocal.username);
      });
    }

    if (checkWhat === 'logout') {
      cy.window().then((win) => {
        this.homePage.usernameLink.should('not.exist');
      });
    }
  }
}

export default SettingsPageObject;
