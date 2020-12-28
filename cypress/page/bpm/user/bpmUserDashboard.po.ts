import { LoginPage } from "page/login.po";
import { PageBase } from "page/pageBase.po";

export class BpmUserDashboardPage extends PageBase {

    selector = 'app-user-bpm-dashboard-page';

    private notifyBtnSelector = 'user-header-notify-component button';
    private avatarBtnSelector = 'header-option-component button';

    navigateTo() {
        // cy.visit('/user/bpm/dashboard');

        cy.fixture('account').then(function (data) {
            const accounts = data;

            const loginPage = new LoginPage();
            loginPage.autoLogin(accounts.bpmuser);
        });
    }

    /** 點擊公司 logo */
    clickCorpLogo() {
        cy.get('uof-corp-logo >img').click();
    }
    
    /** 點擊通知中心 */
    clickNotify() {
        cy.get(this.notifyBtnSelector, {timeout: 10000}).click();
    }

    /** 點擊右上 avatar 頭像 */
    clickAvatar() {
        cy.get(this.avatarBtnSelector).click();
    }

    /** 點擊 tab 我的單據 */
    clickTabMyDoc() {
        cy.get('ejs-tab .e-toolbar-items .e-toolbar-item span[uof-i18n-key="user.bpm.dashboard.tab-title-trace"]').click();
    }
    /** 點擊 tab 待處理 */
    clickTabProcess() {
        cy.get('ejs-tab .e-toolbar-items .e-toolbar-item span[uof-i18n-key="user.bpm.dashboard.tab-title-process"]').click();
    }
    /** 點擊 tab 申請 */
    clickTabApply() {
        cy.get('ejs-tab .e-toolbar-items .e-toolbar-item span[uof-i18n-key="user.bpm.comm.apply"]').click();
    }

    
    /** 是否開啟通知中心 */
    shouldOpenNotifyList() {
        cy.get(this.notifyBtnSelector).then(ele => {
            const id = Cypress.$(ele).attr("id");
            cy.get(`div[id="${id}-popup"].e-popup-open`).should('exist');
        });
    }

    /** 是否關閉通知中心 */
    shouldCloseNotifyList() {
        cy.get(this.notifyBtnSelector).then(ele => {
            const id = Cypress.$(ele).attr("id");
            cy.get(`div[id="${id}-popup"].e-popup-close`).should('exist');
        });
    }

    /** 是否開啟 Option */
    shouldOpenOption() {
        cy.get(this.avatarBtnSelector).then(ele => {
            const id = Cypress.$(ele).attr("id");
            cy.get(`div[id="${id}-popup"].e-popup-open`).should('exist');
        });
    }

    /** 是否關閉 Option */
    shouldCloseOption() {
        cy.get(this.avatarBtnSelector).then(ele => {
            const id = Cypress.$(ele).attr("id");
            cy.get(`div[id="${id}-popup"].e-popup-close`).should('exist');
        });
    }

    /** 是否 tab 內容為我的單據 */
    shouldTabOpenMyDoc() {
        cy.get('user-bpm-dashboard-trace-component').should('exist');
    }

    /** 是否 tab 內容為待處理 */
    shouldTabOpenProcess() {
        cy.get('user-bpm-dashboard-task-component').should('exist');
    }

    /** 是否 tab 內容為申請 */
    shouldTabOpenApply() {
        cy.get('user-bpm-dashboard-apply-component').should('exist');
    }
    
    
}
