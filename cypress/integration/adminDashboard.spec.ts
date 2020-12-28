import { AdminDashboardPage } from "page/admin/base/adminDashboard.po";
import { BaseSettingPage } from "page/admin/base/baseSetting.po";
import { BaseCorpPage } from "page/admin/base/baseCorp.po";
import { SystemSettingPage } from "page/admin/base/systemSetting.po";

import { AddCorpDialog } from "page/admin/base/dialog/addCorp.po";
import { ResetPwdDialog } from "page/admin/base/dialog/resetPwd.po";

import { FormDesignPage } from "page/admin/bpm/formDesign.po";

import { LoginPage } from "page/login.po";


describe('Admin 大廳', () => {
    let page: AdminDashboardPage;
    let loginPage: LoginPage;

    beforeEach(() => {
        page = new AdminDashboardPage();
        loginPage = new LoginPage();

        // 如果沒在 admin 大廳，則登入進去大廳
        cy.get('body').then(($body) => {
            if ($body.find('admin-header-component').length) {
                // found it

            } else {
                // not here
                page.navigateTo();
            }
        });


    })

    it('menu點擊後，應該出現選單', () => {
        // arrange
        // act
        page.clickMenu();
        // assert
        page.shouldOpenMenu();

        // arrange
        // act
        page.clickMenu();
        // assert
        page.shouldCloseMenu();
    });

    it('頭像點擊後，應該出現選單', () => {
        // arrange
        // act
        page.clickAvatar();
        // assert
        page.shouldOpenOption();

        // arrange
        // act
        page.clickAvatar();
        // assert
        page.shouldCloseOption();
    });

    it('點擊公司選單，應該出現選單', () => {
        // arrange
        cy.get('body').then(($body) => {
            if ($body.find(page.corpListBtnSelector).length) {
                // act
                page.clickCorpList();
                // assert
                page.shouldOpenCorpList();

                // act
                page.clickCorpList();
                // assert
                page.shouldCloseCorpList();
            }
        });
    });

    describe('點擊頭像>編輯個人密碼', () => {
        let dialog: ResetPwdDialog;
        let accounts: any;

        beforeEach(() => {
            dialog = new ResetPwdDialog();
            cy.fixture('account').then(function (data) {
                accounts = data;
            });

            //如果 dialog 沒開啟，則打開它
            cy.get('body').then(($body) => {
                if ($body.find(dialog.selector).length) {
                    // found it
                } else {
                    // not here
                    page.clickAvatar();
                    page.clickResetPwd();
                    dialog.shouldOpen();
                }
            });

        })

        it('點擊取消按鈕，應該關閉 dialog', () => {
            // arrange
            // act
            dialog.clickCancel();
            // assert
            dialog.shouldClose();
        });

        it('輸入新密碼，兩次不一樣，應該跳出錯誤警告', () => {
            // arrange
            dialog.inputNewPwd(accounts.admin.password);
            dialog.inputVerifyPwd('123');
            // act
            dialog.clickOk();
            // assert
            dialog.getErrorTip().should('exist');
        });

        it('輸入新密碼驗證通過，應該關閉 dialog 並跳出 toast', () => {
            // arrange
            dialog.inputNewPwd(accounts.admin.password);
            dialog.inputVerifyPwd(accounts.admin.password);
            // act
            dialog.clickOk();
            // assert
            dialog.shouldClose();
            page.shouldHasToast();
        });

    })

    describe('點擊頭像>登出', () => {

        beforeEach(() => {

            cy.get('body').then(($body) => {
                if ($body.find('ul li[id="logout"]').length) {
                    // found it
                } else {
                    // not here
                    page.clickAvatar();
                }
            });

        })

        it('點擊登出，應該至登入畫面', () => {
            // arrange
            // act
            page.clickLogout();
            page.wait500ms();
            // assert
            loginPage.shouldInLoginPage();
        });


    })

    describe('點擊 menu item', () => {
        let baseSettingPage: BaseSettingPage;
        let baseCorpPage: BaseCorpPage;
        let formDesignPage: FormDesignPage;
        let systemSettingPage: SystemSettingPage;
        let addCorpDialog: AddCorpDialog;
        

        beforeEach(() => {
            baseSettingPage = new BaseSettingPage();
            baseCorpPage = new BaseCorpPage();
            formDesignPage = new FormDesignPage();
            systemSettingPage = new SystemSettingPage();
            addCorpDialog = new AddCorpDialog();

            cy.get('body').then(($body) => {
                if ($body.find(page.menuOpenSelector).length) {
                    // found it
                } else {
                    // not here
                    page.clickMenu();
                }
            });

        })

        it('>基礎資料設定，應切換至基礎資料設定頁', () => {
            // arrange
            // act
            page.clickMenuSettingBaseData();
            // assert
            baseSettingPage.shouldInPage();
        });

        it('>建立公司，應跳出建立公司 dialog', () => {
            // arrange
            // act
            page.clickMenuAddCorp();
            // assert
            addCorpDialog.shouldOpen();
            addCorpDialog.clickCancel();
        });

        it('>管理組織人員，應切換至管理組織人員頁', () => {
            // arrange
            // act
            page.clickMenuBaseCorp();
            // assert
            baseCorpPage.shouldInPage();
        });

        it('>設計表單，應切換至設計表單頁', () => {
            // arrange
            // act
            page.clickMenuFormDesign();
            // assert
            formDesignPage.shouldInPage();
        });

        it('>系統設定，應切換至系統設定頁', () => {
            // arrange
            // act
            page.clickMenuSystemSetting();
            // assert
            systemSettingPage.shouldInPage();
        });


    })



})
