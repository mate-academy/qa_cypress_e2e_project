import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';
  
  get userBio() {
    return cy.getByDataCy('userBio');
  }

  get followBtn() {
    return cy.getByDataCy('followUserBtn');
  }

}

export default UserPageObject;
