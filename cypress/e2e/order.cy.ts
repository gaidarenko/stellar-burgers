import { SELECTOR_MODAL, SELECTOR_INGREDIENT_NAME, SELECTOR_INGREDIENT_TYPE_BUN } from './constants';

describe('Заказ', () => {
  it('Создание заказа', () => {
    cy.setup();

    cy.get(SELECTOR_INGREDIENT_TYPE_BUN)
      .first()
      .within(() => {
        cy.get('button').click();
      })

    cy.get('[data-testid="ingredient-type-main"]')
      .first()
      .within(() => {
        cy.get('button').click();
      })

    cy.get('[data-testid="ingredient-type-sauce"]')
      .first()
      .within(() => {
        cy.get('button').click();
      })

    cy.get('[data-testid="make-order"]').click();
    cy.wait('@order');

    cy.get(SELECTOR_MODAL)
      .should('exist')
      .should('be.visible')
      .within(() => {
        cy.contains('идентификатор заказа').should('exist');
        cy.contains('85056').should('exist');
        cy.get('[data-testid="modal-close"]').click();
      });

    cy.get(SELECTOR_MODAL).should('not.exist');
    cy.get('[data-testid="burger-top"]').should('not.exist');
    cy.get('[data-testid="burger-bottom"]').should('not.exist');
    cy.get('[data-testid="burger-no-middle"]').should('exist');
  })
})