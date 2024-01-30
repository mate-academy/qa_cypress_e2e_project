import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get articlePreview() {
    return cy.get('.article-preview');
  }

  get settings() {
    return cy.getByDataQa('Settings');
  }

  get navBar() {
    return cy.getByDataQa('navBar');
  }

  clickSettings() {
    this.settings.click();
  }

  assertAbsenceOfArticles() {
    this.articlePreview.should('contain.text', 'No articles are here... yet.');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertNavbarDoesntContain(username) {
    this.navBar
      .should('not.contain', username);
  }

  assertNavbarContainLink(link) {
    this.navBar.should('contain', link);
  }
}

export default HomePageObject;
