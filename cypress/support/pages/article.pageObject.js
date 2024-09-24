import PageObject from "../PageObject";

class ArticlePageObject extends PageObject {
  url = "/";

  get NewArticleLink() {
    return cy.get('[data-qa="newArticleLinkHeader"]').click();
  }

  get EditArticleTitle() {
    return cy.get('[data-qa="articleEditTitle"]');
  }

  get EditArticleDescription() {
    return cy.get('[data-qa="articleEditDescription"]');
  }

  get EditArticleBody() {
    return cy.get('[data-qa="articleEditBody"]');
  }

  get EditArticleTags() {
    return cy.get('input[data-qa="articleEditTags"]');
  }

  get HitPublishButton() {
    return cy.get('[data-qa="articleEditPublishButton"]').click();
  }

  get HitDeleteArticleButton() {
    return cy.get('[data-qa="deleteArticleButton"]').eq(0).click();
  }

  get HitEditArticleButton() {
    return cy.get('[data-qa="editArticleButton"]').eq(0).click();
  }
}
export default ArticlePageObject;
