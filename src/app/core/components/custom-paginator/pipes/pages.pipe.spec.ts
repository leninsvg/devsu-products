import { PagesPipe } from './pages.pipe';

describe('PagesPipe', () => {
  it('create an instance', () => {
    const pipe = new PagesPipe();
    expect(pipe).toBeTruthy();
  });
  it('Generate default pages', () => {
    const pipe = new PagesPipe();
    expect(pipe.transform(0, 0)).toEqual([1]);
  })
  it('Generate pages', () => {
    const pipe = new PagesPipe();
    const pages = pipe.transform(11, 5);
    expect(pages).toEqual([1, 2, 3]);
  })
});
