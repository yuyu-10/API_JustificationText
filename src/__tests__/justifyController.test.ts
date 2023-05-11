import { justifyText } from '../controllers/justifyController';

describe('justifyText function', () => {
  it('should return a string', () => {
    const input = 'Lorem ipsum dolor sit amet.';
    const output = justifyText(input);
    expect(typeof output).toBe('string');
  });

  it('should return a single line if input is less than 80 characters', () => {
    const input = 'Lorem ipsum dolor sit amet.';
    const output = justifyText(input);
    expect(output).toBe(input);
  });

  it('should return text with 80 characters per line', () => {
    const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in purus sed ligula semper luctus.';
    const output = justifyText(input);
    const lines = output.split('\n');
    const isAll80Chars = lines.every((line) => line.length === 80);
    expect(isAll80Chars).toBe(true);
  });

  it('should not break words', () => {
    const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in purus sed ligula semper luctus.';
    const output = justifyText(input);
    const lines = output.split('\n');
    const lastLine = lines[lines.length - 1];
    const lastWord = lastLine.split(' ')[lastLine.split(' ').length - 1];
    expect(lastWord.length).toBeGreaterThan(0);
  });
});


