import PageObject from '../PageObject';

/// <reference types="cypress" />

class ArticlePageObject extends PageObject {
  constructor(slug) {
    super();

    this.url = `#/articles/${slug}`;
  }

  get banner() {
    return cy.getByDataQa('banner-info');
  }

  get editArticleBtn() {
    return cy.getByDataQa('btn-edit-article');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('btn-delete-article');
  }

  assertBannerContainsArticleInfo(authorName, articleInfo) {
    const {
      title,
      publishDate
    } = articleInfo;

    this.banner
      .children(this.articleTitle)
      .should('contain.text', title)
      .and('be.visible');

    this.banner
      .children(this.articleAuthor)
      .should('contain.text', authorName)
      .and('be.visible');

    this.banner
      .children(this.publishDate)
      .should('contain.text', publishDate)
      .and('be.visible');
  }

  assertArticleBodyExists(articleBody) {
    this.articleBody
      .should('exist')
      .and('be.visible')
      .and('contain.text', articleBody);
  }

  assertArticleTitleUpdated(newArticleTitle) {
    this.articleTitle
      .should('contain.text', newArticleTitle);
  }

  assertArticleBodyUpdated(newArticleBody) {
    this.articleBody
      .should('contain.text', newArticleBody);
  }

  assertBannerContainsEditArticleBtn(editBtn) {
    this.banner
      .children(this.editArticleBtn)
      .should('exist')
      .and('be.visible')
      .and('contain.text', editBtn);
  }

  assertBannerContainsDeleteArticleBtn(deleteBtn) {
    this.banner
      .children(this.deleteArticleBtn)
      .should('exist')
      .and('be.visible')
      .and('contain.text', deleteBtn);
  }

  assertBannerContainsFollowBtn(followBtn) {
    this.banner
      .children(this.followUserBtn)
      .should('exist')
      .and('be.visible')
      .and('contain', followBtn);
  }

  clickOnEditArticleBtn() {
    this.editArticleBtn
      .first()
      .click();
  }

  clickOnDeleteArticleBtn() {
    this.deleteArticleBtn
      .first()
      .click();
  }

  clickOnFollowBtn() {
    this.followUserBtn
      .first()
      .click();
  }

  assertFollowBtnIsUnfollow(unfollowBtn) {
    this.followUserBtn
      .first()
      .should('contain', unfollowBtn);
  }

  clickOnUnfollowBtn() {
    this.followUserBtn
      .first()
      .click();
  }
}

export default ArticlePageObject;
