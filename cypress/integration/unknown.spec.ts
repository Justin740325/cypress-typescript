import { UnknownPage } from "page/unknown.po";

describe('沒權限頁面', () => {
    let page: UnknownPage;

    beforeEach(() => {
        page = new UnknownPage();

        page.navigateTo();
    })

    it('按下回首頁按鈕，應該導向首頁', () => {
        // arrange
        
        // act
        page.clickGoHome();
        // assert
        page.shouldInDashboardPage();
    });

})
