import { PageBase } from "page/pageBase.po";

/** menu>基礎資料設定 */
export class BaseSettingPage extends PageBase {

    navigateTo() {
        cy.visit('admin/base/setting');
    }

    shouldInPage() {
        cy.get('admin-base-setting-page').should('exist');
        cy.url().should('contain', 'admin/base/setting');
    }
    

}
