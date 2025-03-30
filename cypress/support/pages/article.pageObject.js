import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get newArticleLink () {
    return cy.getByDataCy('new-article-link');
  };

  get articleTitleField () {
    return cy.getByDataCy('article-title-field');
  }

  get articleTextField () {
    return cy.getByDataCy('article-text-field');
  }

  get articleAboutField () {
    return cy.getByDataCy('article-about-field');
  }

  get tagsField () {
    return cy.getByDataCy('tags-field');
  };

  get publishArticleBtn () {
    return cy.getByDataCy('publish-article-button');
  };

  get articleTitle () {
    return cy.get('h1');
  }

  get articleText () {
    return cy.get('p');
  }

  get editArtickeLink () {
    return cy.getByDataCy('edit-article-link');
  }

  get deleteArticleBtn () {
    return cy.getByDataCy('delete-arcile-button');
  }

  clickDeleteArticleBtn () {
    this.deleteArticleBtn.first().click();
  }

  clickEditArticleBtn () {
    this.editArtickeLink.first().click();
  }

  assertArticleText(text) {
    this.articleText.should('be.visible');
    this.articleText.should('contain', text);
  }

  assertArticleTitle(title) {
    this.articleTitle.should('be.visible');
    this.articleTitle.should('contain', title);
  }

  typeArticleTittle(title) {
    this.articleTitleField.type(title);
  }

  typeActicleText(text) {
    this.articleTextField.type(text);
  };

  typeBioArticle(bio) {
    this.articleAboutField.type(bio);
  };

  typeTags(tag) {
    this.tagsField.type(tag);
    this.tagsField.click('{Enter}');
  };

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  };

  editArticleTitle (title) {
    this.articleTitleField.clear();
    this.articleTitleField.type(title);
  };

  editArticleText (text) {
    this.articleTextField.clear();
    this.articleTextField.type(text);
  }

  editArtickeBio (bio) {
    this.articleAboutField.clear();
    this.articleAboutField.type(bio);
  }

  createArticle () {
    this.articleTitleField.type('title');
    this.articleTextField.type('text');
    this.articleAboutField.type('cdjksks ajxnsl xslam');
    this.publishArticleBtn.click();
  };
};
export default ArticlePageObject;
