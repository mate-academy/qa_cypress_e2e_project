import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  constructor() {
    super();
    this.followBtn = () => cy.get('[data-qa="follow-btn"]');
  }

  visitProfile(username) {
    super.visit(`/profile/${username}`);
  }

  clickFollow() {
    this.followBtn().should('be.visible').click();
  }

  assertFollowButtonText(expectedText) {
    this.followBtn().should('contain.text', expectedText);
  }
}

export default UserPageObject;
