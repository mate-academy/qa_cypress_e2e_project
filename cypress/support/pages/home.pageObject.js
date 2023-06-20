import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get checkArticleList() {
    return cy.get('.article-preview')
  }
}

export default HomePageObject;
