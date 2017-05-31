import { Firechat2Page } from './app.po';

describe('firechat2 App', () => {
  let page: Firechat2Page;

  beforeEach(() => {
    page = new Firechat2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
