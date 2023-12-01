import PageObject from '../PageObject';

export class userPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`/@${username}`);
  }

  get followBtn() {
    return cy.getByDataQa('follow-btn');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  assertBtnChahgeToUnfollow(username) {
    this.followBtn
      .invoke('text')
      .should('match', new RegExp(`^\\s*Unfollow\\s*${username}\\s*$`));
  }

  assertBtnChahgeToFollow(username) {
    this.followBtn
      .invoke('text')
      .should('match', new RegExp(`^\\s*Follow\\s*${username}\\s*$`));
  }
}
