import { dupl } from '../src';

describe('Sample Test ', () => {
  it('Dupl String', () => {
    expect( dupl('one') === 'oneone');
  });
});
