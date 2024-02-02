/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataCy(selector: string): Chainable<any>
    register(email: string, username: string, password: string): Chainable<any>
    login(username: string, email: string, password: string): Chainable<any>
    findByPlaceholder(placeholder: string): Chainable<any>
    createArticle(title: string, description: string, body: string, tag: string): Chainable<any>
  }
}
