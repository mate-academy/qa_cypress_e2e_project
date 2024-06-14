import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#';

  get userArticle() {
    return cy.getByDataCy('user-article');
  }

  get userFeed() {
    return cy.getByDataCy('main-feed');
  }

  get userFollow() {
    return cy.getByDataCy('user-follow');
  }

  clickUserArticle() {
    this.userArticle
      .click();
  }

  clickUserFeed() {
    this.userFeed
      .click();
  }

  clickUserFollow() {
    this.userFollow
        .eq(0).click();
  }

  asserUpdateSuccessful() {
    cy.get('[class="swal-title"]')
      .should('contain', 'Update successful!');
  }
}

export default UserPageObject;