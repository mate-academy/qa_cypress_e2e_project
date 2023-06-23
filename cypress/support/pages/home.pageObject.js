import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  clickOnBtn(btnDataCy) {
    cy.getByDataCy(btnDataCy).eq(0).click();
  }
}
export default HomePageObject;
