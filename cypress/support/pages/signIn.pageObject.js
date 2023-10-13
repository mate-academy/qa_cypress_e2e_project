import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.get('[data-qa="email-sign-in"]').clear().click();
  }

  get passwordField() {
    return cy.get('[data-qa="password-sign-in"]').clear().click();
  }

  get signInBtn() {
    return cy.get('[data-qa="sign-in-btn"]');
  }

  get profileName() {
    return cy.get('[data-qa="username-link"]');
  }

  get failPopUp() {
    return cy.get('.swal-modal');
  };

  get failBtn() {
    return cy.get('.swal-modal').should('contain',
      'Login failed!')
      .find('.swal-button');
  };

  get websiteBanner() {
    return cy.get('[data-qa="Website banner"]');
  }

  assertWebsiteLogo() {
    cy.get('p').should('contain',
      'A place to share your knowledge.');
  }

  assertForHomePageBanner() {
    this.websiteBanner.should('contain', 'conduit');
  }

  clickFailBtn() {
    this.failBtn.click();
  }

  confirmFailSignIn() {
    this.failPopUp.should('contain', 'Login failed!');
    this.failPopUp.should('contain', 'Invalid user credentials.');
  }

  confirmUserNameInProfile(nameProfile) {
    this.profileName.should('contain', `${nameProfile}`);
  }

  visit() {
    cy.visit('/#/login');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }
}

export default SignInPageObject;
