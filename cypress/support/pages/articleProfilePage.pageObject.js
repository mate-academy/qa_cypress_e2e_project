import PageObject from '../PageObject';

class ArticleProfile extends PageObject {
  visit(title) {
    cy.visit(`/#/articles/${title}`);
  };

  clickOnEditBtn() {
    cy.getByDataCy('edit-my-article-btn').eq(0).click();
  }

  clickOnDeleteBtn() {
    cy.getByDataCy('delete-my-article-btn').eq(0).click();
  }
}

export default ArticleProfile;
