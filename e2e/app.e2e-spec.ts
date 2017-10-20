import { RetPlannerPage } from './app.po';

describe('ret-planner App', function() {
  let page: RetPlannerPage;

  beforeEach(() => {
    page = new RetPlannerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
