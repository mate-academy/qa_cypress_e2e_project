import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = `/#/@riot2`;

  clickFollowBtn() {
    cy.getByDataCy('follow-btn')
      .click();
  }
}

export default UserPageObject;