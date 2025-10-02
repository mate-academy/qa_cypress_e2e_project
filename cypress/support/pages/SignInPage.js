class SignInPage {
  visit() {
    cy.visit('/login');
    return this;
  }

  fillEmail(email) {
    cy.get('[data-qa=signin-email]').clear().type(email);
    return this;
  }

  fillPassword(password) {
    cy.get('[data-qa=signin-password]').clear().type(password);
    return this;
  }

  submit() {
    cy.get('[data-qa=signin-submit]').click();
    return this;
  }
}

export default new SignInPage();
