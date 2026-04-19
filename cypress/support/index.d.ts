/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataQa(
      selector: string
    ): Chainable<any>;
    createUser(
      email: string,
      username: string,
      password: string
    ): Chainable<any>;
    register(
      email: string,
      username: string,
      password: string
    ): Chainable<any>;
    login(
      email: string,
      password: string
    ): Chainable<any>;
    createArticle(
      articleData: {
        author_id?: number;
        title: string;
        description: string;
        body: string;
        tags?: string | string[];
      }
    ): Chainable<any>;
  }
}
