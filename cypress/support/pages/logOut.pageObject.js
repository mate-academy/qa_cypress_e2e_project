class LogOutPageObject {
  visit() {
    cy.visit('/#/settings');
  }

  logout() {
    cy.contains('button', 'Or click here to logout.').click();
  }
}

export default LogOutPageObject;
