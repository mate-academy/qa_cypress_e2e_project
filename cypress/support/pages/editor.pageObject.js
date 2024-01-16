import PageObject from '../PageObject';

class EditorPageObject extends PageObject {
    url = '/editor';

    get titleField() {
        return cy.getByDataCy('title-article');
    }
    get whatAboutField() {
        return cy.getByDataCy('what-about-article');
    }
    
    get writeArticleField() {
        return cy.getByDataCy('write-article');
    }

    get tagsField() {
        return cy.getByDataCy('tag-article');
    }

    get publishBtn() {
        return cy.getByDataCy('publish-button');
    }

    typeTitle(title) {
        this.titleField.type(title);
    }

    typeAbout(about) {
        this.whatAboutField.type(about);
    }

    typeArticle(article) {
        this.writeArticleField.type(article);
    }

    typeTag(tag) {
        this.tagsField.type(tag);
    }
    
    clickPublishBtn() {
        this.publishBtn.click();
    }

  }
  
  export default EditorPageObject;