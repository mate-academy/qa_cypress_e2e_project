import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  constructor() {
    super('/signup');
  }

  typeUsername(username) {
    cy.get('[data-qa=username]').clear();
    cy.get('[data-qa=username]').type(username);
  }

  typeEmail(email) {
    cy.get('[data-qa=email]').clear();
    cy.get('[data-qa=email]').type(email);
  }

  typePassword(password) {
    cy.get('[data-qa=password]').clear();
    cy.get('[data-qa=password]').type(password);
  }

  clickSignUpBtn() {
    cy.get('[data-qa=sign-up-btn]').click();
  }

  signUp({ username, email, password }) {
    cy.log(`Signing up with: ${username}, ${email}, ${password}`);
    this.typeUsername(username);
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignUpBtn();
  }

  assertUserLoggedIn(username) {
    cy.get('[data-qa=header-username]').should('contain', username);
  }

  assertErrorMessage(message) {
    cy.contains('[data-qa=error-message]', message).should('be.visible');
  }
}

export default SignUpPageObject;
