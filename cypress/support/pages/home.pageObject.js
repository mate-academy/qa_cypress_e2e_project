import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get authorLink() {
    return cy.getByDataCy('author-name-link')
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickOnAuthorLink() {
    this.authorLink.click();
  }
}



export default HomePageObject;
