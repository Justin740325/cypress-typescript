import { PageBase } from "page/pageBase.po";

/** menu>基礎資料設定 */
export class FormDesignPage extends PageBase {

    navigateTo() {
        cy.visit('admin/bpm/form/list');
    }

    shouldInPage() {
        cy.get('admin-bpm-form-list-page').should('exist');
        cy.url().should('contain', 'admin/bpm/form/list');
    }
    

}