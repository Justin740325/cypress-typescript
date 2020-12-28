import { LoginPage } from "page/login.po";
import { PageBase } from "page/pageBase.po";
import { UnknownPage } from "page/unknown.po";

export class AdminDashboardPage extends PageBase {

    corpListBtnSelector = 'admin-header-corp-switch-component >button';

    menuOpenSelector = 'ejs-sidebar.e-open';
    menuCloseSelector = 'ejs-sidebar.e-close';

    navigateTo() {
        cy.fixture('account').then(function (data) {
            const accounts = data;

            const loginPage = new LoginPage();
            loginPage.autoLogin(accounts.admin);

            const unknownPage = new UnknownPage();
            unknownPage.clickGoHome();
        });
    }

    /** 點擊左上 menu 按鈕 */
    clickMenu() {
        cy.get('button >uof-icon[uofname="u-menu"]').click();
        this.wait500ms();
    }

    private getAvatarBtn() {
        return cy.get('header-option-component').find('button');
    }

    /** 點擊右上 avatar 頭像 */
    clickAvatar() {
        this.getAvatarBtn().click();
    }

    /** 點擊公司選單 */
    clickCorpList() {
        cy.get(this.corpListBtnSelector).click();
    }

    /** 點擊個人密碼 */
    clickResetPwd() {
        cy.get('ul >li >span[uof-i18n-key="global.comm.optonmenu.resetpwd"]').click();
    }

    /** 點擊登出 */
    clickLogout() {
        cy.get('ul >li >span[uof-i18n-key="global.comm.optonmenu.logout"]').click();
    }

    /** 點擊menu>設定基礎資料 */
    clickMenuSettingBaseData() {
        cy.get(this.menuOpenSelector)
            .find('ul li span[uof-i18n-key="global.layout.menu.M-ORG-BASE-SET"]').click();
    }
    /** 點擊menu>管理組織人員 */
    clickMenuBaseCorp() {
        cy.get(this.menuOpenSelector)
            .find('ul li span[uof-i18n-key="global.layout.menu.M-ORG-EMPL-EDIT"]').click();
    }
    /** 點擊menu>設計表單 */
    clickMenuFormDesign() {
        cy.get(this.menuOpenSelector)
            .find('ul li span[uof-i18n-key="global.layout.menu.M-BPM-SCR-DESIGN"]').click();
    }
    /** 點擊menu>系統設定 */
    clickMenuSystemSetting() {
        cy.get(this.menuOpenSelector)
            .find('ul li span[uof-i18n-key="global.layout.menu.M-SYS-CONFIG-SET"]').click();
    }
    /** 點擊menu>建立公司 */
    clickMenuAddCorp() {
        cy.get(this.menuOpenSelector)
            .find('ul li span[uof-i18n-key="global.layout.menu.M-ORG-CORP-ADD"]').click();
    }



    /** 是否開啟公司選單 */
    shouldOpenCorpList() {
        cy.get(this.corpListBtnSelector).then(ele => {
            const id = Cypress.$(ele).attr("id");
            cy.get(`div[id="${id}-popup"].e-popup-open`).should('exist');
        });
    }

    /** 是否關閉公司選單 */
    shouldCloseCorpList() {
        cy.get(this.corpListBtnSelector).then(ele => {
            const id = Cypress.$(ele).attr("id");
            cy.get(`div[id="${id}-popup"].e-popup-close`).should('exist');
        });
    }

    /** 是否開啟 Option */
    shouldOpenOption() {
        this.getAvatarBtn().then(ele => {
            const id = Cypress.$(ele).attr("id");
            cy.get(`div[id="${id}-popup"].e-popup-open`).should('exist');
        });
    }

    /** 是否關閉 Option */
    shouldCloseOption() {
        this.getAvatarBtn().then(ele => {
            const id = Cypress.$(ele).attr("id");
            cy.get(`div[id="${id}-popup"].e-popup-close`).should('exist');
        });
    }


    /** 是否開啟 menu */
    shouldOpenMenu() {
        cy.get(this.menuOpenSelector).should('exist');
    }

    /** 是否關閉 menu */
    shouldCloseMenu() {
        cy.get(this.menuCloseSelector).should('exist');
    }



}
