import { PageObject } from '../PageObject';

export class FollowUnfollowUser extends PageObject {
  get followButton() {
    return cy.getByDataCy('follow-button');
  }

  clickFollowButton () {
    this.followButton.click();
  }

  assertFollowUser () {
    this.followButton.should('be.enabled');
  }
}
