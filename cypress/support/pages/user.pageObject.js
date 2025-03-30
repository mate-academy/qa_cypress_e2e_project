import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  clickOnFollowButton(username) {
    cy.contains('button', username).click();
  }

  clickOnUnfollowButton(username) {
    cy.contains('button', username).click();
  }

  assertUnfollowButton(username) {
    cy.contains('button', username).should(`be.visible`);
  }

  assertFollowButton(username) {
    cy.contains('button', username).should(`be.visible`);
  }
}
export default UserPageObject;
