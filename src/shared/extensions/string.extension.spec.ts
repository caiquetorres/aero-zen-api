import './string.extension';

describe('StringExtensions', () => {
  it('should convert a string to title case', () => {
    const str = 'caique';
    expect(str.toTitleCase()).toEqual('Caique');
  });
});
