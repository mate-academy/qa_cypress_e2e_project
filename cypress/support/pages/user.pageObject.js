import PageObject from './PageObject';

class UserPageObject extends PageObject {
  get followBtn() {
    return cy.get('[data-qa="follow-button"]');
  }

  visitProfile(username) {
    this.visit(`/profile/${username}`);
  }

  clickFollow() {
    this.followBtn.should('be.visible').click();
  }

  assertFollowButtonText(expectedText) {
    this.followBtn.should('have.text', expectedText);
  }
}

export default UserPageObject;
