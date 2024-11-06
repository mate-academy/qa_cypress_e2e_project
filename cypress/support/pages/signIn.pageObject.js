import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  verifyRegistrationError(expectedMessage) {
    cy.get('.swal-modal').should('be.visible'); // Перевіряємо, що модальне вікно помилки відображається
    cy.get('.swal-title').should('contain', 'Login failed!'); // Перевіряємо заголовок модального вікна
    cy.get('.swal-text').should('contain', expectedMessage); // Перевіряємо текст помилки
  }
}

export default SignInPageObject;
