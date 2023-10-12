import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get authorName() {
    return cy.getByDataCy('author-name-home-page');
  }

  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  clickOnProfileLink() {
    this.usernameLink
      .click();
  }

  clickOnAuthor() {
    this.authorName
      .click();
  }

  clickOnFollowBtn() {
    this.followBtn
      .click();
  }

  assertBtnName(btnname) {
    this.followBtn
      .should('include.text', btnname);
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
