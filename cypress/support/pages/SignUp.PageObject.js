import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get nameField() {
    return cy.get('[data-qa="Username-field"]')
      .clear()
      .click();
  };

  get emailField() {
    return cy.get('[data-qa="Email-field"]')
      .clear()
      .click();
  };

  get passwordField() {
    return cy.get('[data-qa="Password-field"]')
      .clear()
      .click();
  };

  get signUpBtn() {
    return cy.get('[data-qa="Sign-up-btn"]');
  };

  get popUp() {
    return cy.get('.swal-modal');
  };

  get popUpBtn() {
    return cy.get('.swal-modal').should('contain', 'Welcome!')
      .find('.swal-button');
  };

  get profileName() {
    return cy.get('[data-qa="username-link"]');
  };

  get failpopUp() {
    return cy.get('.swal-modal');
  };

  get failBtn() {
    return cy.get('.swal-modal').should('contain',
      'Registration failed!')
      .find('.swal-button');
  };

  visitRegisterPage() {
    cy.visit('/#/register');
  };

  typeName(name) {
    this.nameField.type(name);
  };

  typeEmail(email) {
    this.emailField.type(email);
  };

  typePassword(password) {
    this.passwordField.type(password);
  };

  clickSignUpBtn() {
    this.signUpBtn.eq(1).click();
  };

  RegisterProov() {
    this.popUp.should('contain', 'Welcome!');
    this.popUp.should('contain', 'Your registration was successful!');
  };

  clickProoveBtn() {
    this.popUpBtn.click();
  };

  confirmUserNameInProfile(profileName) {
    this.profileName.should('contain', `${profileName}`);
  };

  clickFailBtn() {
    this.failBtn.click();
  };

  confirmFailOne() {
    this.failpopUp.should('contain', 'Username field required.')
      .should('contain', 'Registration failed!');
  };

  confirmFailTwo() {
    this.failpopUp.should('contain', 'Email field required.')
      .should('contain', 'Registration failed!');
  };

  confirmFailThree() {
    this.failpopUp.should('contain', 'Password field required.')
      .should('contain', 'Registration failed!');
  };

  confirmFailFour() {
    this.failpopUp.should('contain', 'Email must be a valid email.')
      .should('contain', 'Registration failed!');
  };

  confirmFailFive() {
    this.failpopUp.should('contain', 'Email already taken. ')
      .should('contain', 'Registration failed!');
  };

  confirmFailSix() {
    this.failpopUp.should('contain', 'Registration failed!');
  }

  confirmFailPasswordField() {
    this.failpopUp.should('contain',
      'Password must be 8 characters long');
    this.failpopUp.should('contain',
      'and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }
}

export default SignUpPageObject;
