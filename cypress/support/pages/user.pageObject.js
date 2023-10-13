import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  assertUserImage(element, data) {
    cy.getByDataQa(element)
      .should('have.attr', 'src', data);
  }
}

export default UserPageObject;
