import PageObject from "../PageObject";

class UserPageObject extends PageObject {
  clickOnFollowBtn() {
    cy.getByDataQa('follow-user-btn').eq(0).click();
  }

  clickOnUnfollowBtn() {
    cy.getByDataQa('follow-user-btn').eq(0).click();
  }

  assertFollowBtn() {
    cy.getByDataQa('follow-user-btn').should('be.visible');
  }
}

export default UserPageObject;
