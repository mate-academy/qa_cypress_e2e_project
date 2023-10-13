import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  getByDataAttr (dataAttr) {
    return cy.get(`[data-qa="${dataAttr}"]`);
  }

  fillField(dataAttr, newData) {
    this.getByDataAttr(dataAttr)
      .clear()
      .type(newData);
  }

  fillFields(dataAttr, newData) {
    this.getByDataAttr(dataAttr)
      .type(newData);
  }
}

export default HomePageObject;
