import { SELECTOR_MODAL, SELECTOR_INGREDIENT_NAME, SELECTOR_INGREDIENT_TYPE_BUN } from './constants';

describe('Модальные окна', () => {
  beforeEach(() => {
    cy.setup();
  });

  it('Открываются по клику на ингедиенте и закрываются по клику на Х', () => {
    let name = '';
    cy.get(SELECTOR_INGREDIENT_TYPE_BUN)
      .first()
      .within(() => {
        cy.get('[data-testid="ingredient-link"]').click();
      })
      .then(item => {
        name = item.find(SELECTOR_INGREDIENT_NAME).text();
      });

    cy.get(SELECTOR_MODAL)
      .should('exist')
      .should('be.visible')
      .within(() => {
        cy.contains('Детали ингредиента').should('exist');
        cy.contains(name).should('exist');
        cy.get('[data-testid="modal-close"]').click();
      });

    cy.get(SELECTOR_MODAL)
      .should('not.exist')
  })

  it('Открываются по клику на ингедиенте и закрываются по клику на оверлее', () => {
    let name = '';
    cy.get(SELECTOR_INGREDIENT_TYPE_BUN)
      .last()
      .within(() => {
        cy.get('[data-testid="ingredient-link"]').click();
      })
      .then(item => {
        name = item.find(SELECTOR_INGREDIENT_NAME).text();
      });

    cy.get(SELECTOR_MODAL)
      .should('exist')
      .should('be.visible')
      .within(() => {
        cy.contains('Детали ингредиента').should('exist');
        cy.contains(name).should('exist');
      });

    cy.get('[data-testid="modal-overlay"]').click({ force: true });

    cy.get(SELECTOR_MODAL)
      .should('not.exist')
  })
})