/* eslint-disable */
import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserLinkOnArticleTab(userName) {
    cy.get('a[href*="#/@' + userName + '"]')
      .contains(userName)
      .click({ force: true });
  }

  openMyFeedTab() {
    cy.get('a[href*="#/my-feed"]').click();
  }

  get button() {
    return cy.get('.btn');
  }

  clickBtn(text) {
    this.button.contains(text).click();
  }
}

export default UserPageObject;
