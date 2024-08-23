import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  userAutorClick() {
    cy.getByDataCy('user-autor-link').click();
  }

  yourFeedClick() {
    cy.getByDataCy('your-feed-link').click();
  }

  followBtn() {
    cy.getByDataCy('follow-btn').click();
  }
}

export default UserPageObject;
