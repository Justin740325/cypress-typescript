import { PageBase } from "page/pageBase.po";

/** menu>管理組織人員 */
export class BaseCorpPage extends PageBase {

    navigateTo() {
        cy.visit('/admin/base/corp');
    }

    shouldInPage() {
        cy.get('admin-base-corp-page').should('exist');
        cy.url().should('contain', 'admin/base/corp');
    }

}

