class SignInPage {
  visit() {
    cy.visit('/login');
  }

  typeEmail(email) {
    cy.get('input[formcontrolname="email"]').type(email);
  }

  typePassword(password) {
    cy.get('input[formcontrolname="password"]').type(password);
  }

  clickSignInBtn() {
    cy.get('button[type="submit"]').click();
  }
}

export const signInPage = new SignInPage();
