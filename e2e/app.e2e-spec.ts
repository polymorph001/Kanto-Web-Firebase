import { KantoWebNgPage } from './app.po';

describe('kanto-web-ng App', () => {
  let page: KantoWebNgPage;

  beforeEach(() => {
    page = new KantoWebNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
