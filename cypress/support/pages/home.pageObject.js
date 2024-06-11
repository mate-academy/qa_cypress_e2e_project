import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertSuccessfullRegistration() {
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
  }

  yourFeed() {
    cy.contains('.nav-link', 'Your Feed').click();
  }
}

export default HomePageObject;
