import { PageObject } from './PageObject';

export class HomePage extends PageObject {
  visit() {
    super.visit('/');
  }

  goToSignIn() {
    this.getByQa('nav-sign-in').click();
  }

  goToSignUp() {
    this.getByQa('nav-sign-up').click();
  }

  goToSettings() {
    this.getByQa('nav-settings').click();
  }

  goToNewArticle() {
    this.getByQa('nav-new-article').click();
  }
}
