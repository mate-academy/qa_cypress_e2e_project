import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  assertHeaderContainUsername(username) {
    cy.get('[data-cy="username-link"]').should('contain', username);
  }

  clickOnSettingsIcon() {
    cy.get('[href="#/settings"]').click();
  }

  clickOnLogoutBtn() {
    cy.contains('.btn', 'Or click here to logout').click();
  }

  clickOnSignUpBtn() {
    cy.get('[href="#/register"]').click();
  }
}

export default HomePageObject;
