import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  openUserPage(username) {
    cy.visit(`/#/@${username}`);
  };

  clickOnFollowUserBtn(username) {
    cy.contains('.btn', `Follow ${username}`).click();
  }

  assertFollow(username) {
    cy.contains('.btn', `Unfollow ${username}`).click();
  }

  clickOnUnfollowUserBtn(username) {
    cy.contains('.btn', `Unfollow ${username}`).click();
  }

  assertUnfollow(username) {
    cy.contains('.btn', `Follow ${username}`).click();
  }
}

export default UserPageObject;
