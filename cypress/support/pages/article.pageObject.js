import PageObject from "../PageObject";

class ArticlePageObject extends PageObject {
  url = "/";

  get NewArticleLink() {
    cy.get('[data-qa="newArticleLinkHeader"').click();
  }

  get EditArticleTitle() {
    cy.get('[data-qa="articleEditTitle"');
  }

  get EditArticleDescription() {
    cy.get('[data-qa="articleEditDescription"');
  }

  get EditArticleBody() {
    cy.get('[data-qa="articleEditBody"');
  }

  get EditArticleTags() {
    cy.get('[data-qa="articleEditTags"');
  }

  get HitPublishButton() {
    cy.get('[data-qa="articleEditPublishButton"').click();
  }

  get HitDeleteArticleButton() {
    cy.get('data-qa="deleteArticle"').click();
  }

  get HitEditArticleButton() {
    cy.get('data-qa="editArticle"').click();
  }
}

export default ArticlePageObject;
