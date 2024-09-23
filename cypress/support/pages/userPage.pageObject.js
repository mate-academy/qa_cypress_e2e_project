import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.getByDataQa('follow-user-btn');
  }

  clickModalBtn() {
    this.followBtn.click();
  }
}

export default UserPageObject;
