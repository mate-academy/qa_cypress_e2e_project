import PageObject from '../PageObject';

export default class UserPageObject extends PageObject {
  url = '/#/my-feed';

  get followButton() {
    return cy.getByDataQA('follow-btn').first();
  };

  get unfollowButton() {
    return cy.getByDataQA('unfollow-btn').first();
  };
};
