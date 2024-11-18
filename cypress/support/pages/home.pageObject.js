import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.get(':nth-child(4) > .nav-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain.text', username);
  }

  ClickOnUsernameLinkInHeader() {
    this.usernameLink.click();
  }
}

export default HomePageObject;
