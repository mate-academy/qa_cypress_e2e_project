import PageObject from '../PageObject';

class MyFeedPage extends PageObject {
  url = '/#/my-feed/';

  get authorList() {
    return cy.getByDataCy('author-list');
  }

  get readMoreButton() {
    return cy.getByDataCy('read-more-btn');
  }

  clickReadMoreLink() {
    this.readMoreButton.first().click();
  }

  clickAuthorLink(author) {
    this.authorList.contains(author).click();
  }
}

export default MyFeedPage;
