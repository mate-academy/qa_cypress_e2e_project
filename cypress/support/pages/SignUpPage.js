class SignUpPage {
  visit() {
    cy.visit('/register');
    return this;
  }

  fillUsername(username) {
    cy.get('[data-qa=signup-username]').clear().type(username);
    return this;
  }

  fillEmail(email) {
    cy.get('[data-qa=signup-email]').clear().type(email);
    return this;
  }

  fillPassword(password) {
    cy.get('[data-qa=signup-password]').clear().type(password);
    return this;
  }

  submit() {
    cy.get('[data-qa=signup-submit]').click();
    return this;
  }
}

export default new SignUpPage();
