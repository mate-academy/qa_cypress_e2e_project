import PageObject from '../PageObject';

class otherUserProfilePageObject extends PageObject {

  visitOtherUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  get followUnfollowButton() {
    return cy.getByDataQa('follow-unfollow-btn');
  }

  clickFollowUnfollowBtn() {
    this.followUnfollowButton.click();
  }

  assertFollowBtnChahgedUnfollow(username) {
    this.followUnfollowButton
    .invoke('text')
    .should('match', new RegExp(`^\\s*Unfollow\\s*${username}\\s*$`));
  }

  assertUnfollowBtnChahgedFollow(username) {
    this.followUnfollowButton
    .invoke('text')
    .should('match', new RegExp(`^\\s*Follow\\s*${username}\\s*$`));
  }

}

export default otherUserProfilePageObject;
