import { BpmUserDashboardPage } from "page/bpm/user/bpmUserDashboard.po";

describe('Bpm 使用者大廳', () => {
    let page: BpmUserDashboardPage;

    beforeEach(() => {
        page = new BpmUserDashboardPage();

        cy.get('body').then(($body) => {
            if ($body.find(page.selector).length) {
                // found it
                page.clickCorpLogo();
            } else {
                // not here
                page.navigateTo();
            }
        });
    })

    it('點擊通知中心，應該顯示通知中心清單', () => {
        // arrange
        // act
        page.clickNotify();
        // assert
        page.shouldOpenNotifyList();

        // act
        page.clickNotify();
        // assert
        page.shouldCloseNotifyList();
    });

    it('點擊右上角頭像，應該打開選單', () => {
        // arrange
    
        // act
        page.clickAvatar();
        // assert
        page.shouldOpenOption();

        // act
        page.clickAvatar();
        // assert
        page.shouldCloseOption();
    });

    it('點擊 tab item，應該切換成對應的 tab 內容', () => {
        // act
        page.clickTabMyDoc();
        // assert
        page.shouldTabOpenMyDoc();

        // act
        page.clickTabProcess();
        // assert
        page.shouldTabOpenProcess();

        // act
        page.clickTabApply();
        // assert
        page.shouldTabOpenApply();
    });

})
