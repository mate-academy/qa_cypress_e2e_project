import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/';

  get articlePreview() {
    return cy.getByDataCy('user-article-preview');
  }

  get linkAuthor() {
    return cy.getByDataCy('user-author');
  }

  get followOrUnfollowBtn() {
    return cy.getByDataCy('user-follow-btn');
  }

  moveOnArticle() {
    this.articlePreview.click();
  }

  moveOnAnotherUser() {
    this.linkAuthor.click();
  }

  clickOnFollowBtn() {
    this.followOrUnfollowBtn.first().click();
  }
}

export default UserPageObject;
