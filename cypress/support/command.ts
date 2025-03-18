/// <reference types="cypress" />

import './commands';
import { eq } from "lodash";

// Cypress.Commands.add('pathname',(expectedpathname: string) => {
//      return cy.location('pathname').should('eq',expectedpathname);
// })

Cypress.Commands.add('pathname', (expectedpathname) => {
    return cy.location('pathname').should('eq', expectedpathname);
  });  