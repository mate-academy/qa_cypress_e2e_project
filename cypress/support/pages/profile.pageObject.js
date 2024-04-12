import PageObject from '../PageObject';

class ProfilePage extends PageObject {
  get myArticlesPreview() {
    return cy.getByDataCy('my-articles-preview');
  }

  assertArticleNotExist(articleTitle) {
    this.myArticlesPreview.should('not.contain', articleTitle);
  }
}

export default ProfilePage;
