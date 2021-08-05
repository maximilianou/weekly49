import { dupl, cat } from '../src';

describe('Sample Test ', () => {
  it('Dupl String', () => {
    expect( dupl('one') === 'oneone');
  });
  it('Cat Check', () => {
    expect( cat("/") === '<html><head><title>Hi!</title></head><body>Hi!!</body></html>');
  });
});

