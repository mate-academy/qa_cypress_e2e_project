class Header {
  get logo() {
    return cy.get('[data-cy="app-logo"]');
  }

  clickOnLogo() {
    this.logo.click();
  }
}

export default Header;
