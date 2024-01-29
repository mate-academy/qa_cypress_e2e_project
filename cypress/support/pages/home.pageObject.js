import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';
  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get articlePreviewCard() {
    return cy.getByDataCy('article-preview-card');
  }

  get message() {
    return cy.get('.swal-modal');
  }

  get okBtn() {
    return cy.get(`[class="swal-button swal-button--confirm"]`);
  }

  get yourFeedLink() {
    return cy.getByDataCy('your-feed-link');
  }

  clickOkBtn() {
    this.okBtn.click();
  }

  clickUsernameLink(username) {
    this.usernameLink.click();
  }

  clickArticlePreviewCard() {
    this.articlePreviewCard.click();
  }

  clickYourFeedLink() {
    this.yourFeedLink.click();
  }

  assertMessage(message) {
    this.message.should('contain', message);
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertArticlePreviewCardContainsTitle(title) {
    this.articlePreviewCard.should('contain', title);
  }
}

export default HomePageObject;
