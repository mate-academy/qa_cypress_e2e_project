
import PageObject from '../PageObject';
export class UserPageObject extends PageObject {
  get followProfileButton() {
    return cy.get('.btn');
  }

  get followButton() {
    return cy.getByDataQa('follow_profile_button');
  }

  clickOnFollowButton() {
    this.followButton.click();
  }

  clickOnUnFollowButton() {
    this.followButton.click();
  }

  clickOnTheFollowProfileLink() {
    this.followProfileButton.click();
  }

  assertFollowBtn() {
    cy.getByDataQa('follow_profile_button').should('be.visible');
  }

  assertFollowBtn1() {
    cy.getByDataQa('follow-user-btn').should('be.visible');
  }

  assertUnfollowProfileButton() {
    this.followButton.should('be.visible');
  }
}
