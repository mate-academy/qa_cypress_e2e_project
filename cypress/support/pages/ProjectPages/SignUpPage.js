class SignUpPage {
  eterWalidData(user) {
    cy.getByDataCy('email-sign-un').type(user.email);
    cy.getByDataCy('username-sign-un').type(user.username);
    cy.getByDataCy('password-sign-un').type(user.password);
  }

  AssertWalidData() {
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
  }

  eterWalidDataAndemptyemailField(user) {
    cy.getByDataCy('username-sign-un').type(user.username);
    cy.getByDataCy('password-sign-un').type(user.password);
  }

  AssertemptyemailField() {
    cy.get('.swal-text').should('contain', 'Email field required.');
  }

  AssertInvalidemail() {
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
  }

  eterWalidDataAndemptyPasswordField(user) {
    cy.getByDataCy('email-sign-un').type(user.email);
    cy.getByDataCy('username-sign-un').type(user.username);
  }

  AssertemptyPasswordField() {
    cy.get('.swal-text').should('contain', 'Password field required.');
  }

  eterWalidDataAndemptyUsernamelField(user) {
    cy.getByDataCy('email-sign-un').type(user.email);
    cy.getByDataCy('password-sign-un').type(user.password);
  }

  AssertemptyUsernamelField() {
    cy.get('.swal-text').should('contain', 'Username field required.');
  }

  ClickSingUpBtn() {
    cy.getByDataCy('btn-sign-un').click();
  }

  ClickOkBtn() {
    cy.get('.swal-button').click();
  }

  eterWalidDataAndemailWithoutAt(user) {
    cy.getByDataCy('email-sign-un').type('Makcim_10gmail.com');
    cy.getByDataCy('username-sign-un').type(user.username);
    cy.getByDataCy('password-sign-un').type(user.password);
  }

  eterWalidDataAndemailWithoutDot(user) {
    cy.getByDataCy('email-sign-un').type('Makcim_10@gmailcom');
    cy.getByDataCy('username-sign-un').type(user.username);
    cy.getByDataCy('password-sign-un').type(user.password);
  }

  eterWalidDataAndemailWithoutGmailDotCom(user) {
    cy.getByDataCy('email-sign-un').type('Makcim_10@');
    cy.getByDataCy('username-sign-un').type(user.username);
    cy.getByDataCy('password-sign-un').type(user.password);
  }
}

export const signUpPage = new SignUpPage();
