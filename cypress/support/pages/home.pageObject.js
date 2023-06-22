import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '#/';

  clickOnBtn(btnDataQa) {
    cy.getByDataQa(btnDataQa).eq(0).click();
  }

  fillField(field, input) {
    cy.getByDataQa(field).type(input);
  }
}

export default HomePageObject;
