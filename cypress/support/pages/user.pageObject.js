// article-preview

import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  get articlePreview() {
    return cy.getByDataCy('article-preview');
  };

  get followButton() {
    return cy.getByDataCy('follow-btn');
  };

  clickOnArticlePreview() {
    this.articlePreview.click();
  };

  clickOnFollowButton() {
    this.followButton.click();
  };

  assertFollowedUser() {
    this.followButton.should('not.contain', 'Follow');
  }
};

export default UserPageObject;