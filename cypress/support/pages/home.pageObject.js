import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  getByDataAttr (dataAttr) {
   return cy.get(`[data-cy="${dataAttr}"]`);
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

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
