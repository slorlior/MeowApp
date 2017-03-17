import { MeowAppClientPage } from './app.po';

describe('meow-app-client App', () => {
  let page: MeowAppClientPage;

  beforeEach(() => {
    page = new MeowAppClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
