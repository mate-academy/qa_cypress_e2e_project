import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/editor';

  get authorLink() {
    return cy.getByDataQa('home-author-link');
  }

  get followButton() {
    return cy.getByDataQa('profile-follow-button');
  }

  clickAuthorLink() {
    this.authorLink
      .click();
  }

  clickFollowButoon() {
    this.followButton
      .click();
  }
}

export default UserPageObject;
