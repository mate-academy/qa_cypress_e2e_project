import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/@';

  get favoriteCount() {
    return cy.getByDataQa('favorites-count');
  }
}

export default UserPageObject;
