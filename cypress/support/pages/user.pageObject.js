import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#';

  visitUserPage(username) {
    cy.visit(`#/@${username}/`);
  }

  get followBtn() {
    return cy.getByDataCy('follow-user-btn');
  }

  clickOnFollowBtn() {
    this.followBtn.click();
  }

  assertFollowBtn(username) {
    this.unFollowBtn.should('contain', `Follow ${username}`);
  }
  
  get unFollowBtn() {
    return cy.getByDataCy('unfollow-user-btn');
  }

  clickOnUnFollowBtn() {
    this.unFollowBtn.click();
  }

  assertUnFollowBtn(username) {
    this.followBtn.should('contain', `Unfollow ${username}`);
  }
}

export default UserPageObject;
