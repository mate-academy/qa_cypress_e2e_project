import PageObject from '../PageObject';
import generateData from '../generate/index';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  genData = generateData();

  get haveAnAccountLink() {
    return cy.getByDataCy('sign-up-have-account-link');
  }

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn-confirm');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  clickHaveAnAccountLink() {
    this.haveAnAccountLink.click();
  }

  assertSignUpPage() {
    this.signUpBtn.should('contain', 'Sign up');
  }

  signUpProcess(caseOfSignUp) {
    switch (caseOfSignUp) {
      case 'successWithValidData':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.default);
        this.typePassword(this.genData.user.password.passwordDefault);
        break;
      case 'whithoutUsername':
        this.typeEmail(this.genData.user.email.default);
        this.typePassword(this.genData.user.password.passwordDefault);
        break;
      case 'withoutEmail':
        this.typeUsername(this.genData.user.username);
        this.typePassword(this.genData.user.password.passwordDefault);
        break;
      case 'withoutPassword':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.default);
        break;
      case 'passwordLessThan8':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.default);
        this.typePassword(this.genData.user.password.passwordLessThan8);
        break;
      case 'passwordWithoutNumber':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.default);
        this.typePassword(this.genData.user.password.passwordWithoutNumber);
        break;
      case 'passwordWithoutUpper':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.default);
        this.typePassword(this.genData.user.password.passwordWithoutUpper);
        break;
      case 'passwordWithoutLower':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.default);
        this.typePassword(this.genData.user.password.passwordWithoutLower);
        break;
      case 'emailWithoutName':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.withoutName);
        this.typePassword(this.genData.user.password.passwordDefault);
        break;
      case 'emailWithoutAt':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.withoutAt);
        this.typePassword(this.genData.user.password.passwordDefault);
        break;
      case 'emailWithoutDomain':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.withoutDomain);
        this.typePassword(this.genData.user.password.passwordDefault);
        break;
      case 'emailWithoutTopDomain':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.withoutTopDomain);
        this.typePassword(this.genData.user.password.passwordDefault);
        break;
      case 'emailWithoutDot':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.withoutDot);
        this.typePassword(this.genData.user.password.passwordDefault);
        break;
      case 'emailWithDoubleAt':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.withDoubleAt);
        this.typePassword(this.genData.user.password.passwordDefault);
        break;
      case 'emailWithDoubleDot':
        this.typeUsername(this.genData.user.username);
        this.typeEmail(this.genData.user.email.withDoubleDot);
        this.typePassword(this.genData.user.password.passwordDefault);
        break;
    }

    this.clickSignUpBtn();
  }
}

export default SignUpPageObject;
