export const justifyText = (text: string): string => {
  const lines: string[] = text.split(/\n/);

  const justifiedLines: string[] = lines.map(line => {
    if (line.length <= 80) {
      return line;
    }

    const words: string[] = line.trim().split(/\s/);
    let lineLength: number = 0;
    let lineWords: string[] = [];

    const justifiedWords: string[][] = words.reduce((justifiedWords, word, i) => {
      if (lineLength + word.length + lineWords.length > 80) {
        justifiedWords.push(lineWords);
        lineWords = [];
        lineLength = 0;
      }

      lineWords.push(word);
      lineLength += word.length;

      if (i === words.length - 1) {
        justifiedWords.push(lineWords);
      }

      return justifiedWords;
    }, []);

    return justifiedWords.map((lineWords, index) => {
      if (index === justifiedWords.length - 1) {
        return lineWords.join(' ');
      }

      const totalSpaces: number = 80 - lineWords.reduce((sum, word) => sum + word.length, 0);
      const numGaps: number = lineWords.length - 1;

      if (numGaps === 0) {
        return lineWords[0];
      }

      const gaps: number[] = [];
      let remainingSpaces: number = totalSpaces;

      for (let i = 0; i < numGaps; i++) {
        const gapSize: number = Math.ceil(remainingSpaces / (numGaps - i));
        gaps.push(gapSize);
        remainingSpaces -= gapSize;
      }

      return lineWords.map((word, i) => {
        if (i === lineWords.length - 1) {
          return word;
        }

        return word + ' '.repeat(gaps[i]);
      }).join('');
    }).join('\n');
  });

  return justifiedLines.join('\n');
};