class HomePage {
  visitSetingsPage() {
    cy.visit('/#/settings');
  }

  visitLoginPage() {
    cy.visit('/#/login');
  }

  visitSignUpPage() {
    cy.visit('/#/register');
  }

  assertHeaderContainUsername(user) {
    cy.getByDataCy('username-link').should('contain', user.username);
  }
}

export const homePage = new HomePage();
