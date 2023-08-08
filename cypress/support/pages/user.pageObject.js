/* eslint-disable */
import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  
  get followBtn() {
    return cy.get('.col-xs-12 > div > .btn');
  }

  clickFollowBtn() {
    this.followBtn
      .click();
  }
}

export default UserPageObject;