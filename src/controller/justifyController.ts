export const justifyText = (text: string): string => {
    const lines: string[] = text.split(/\n/);
  
    const justifiedLines: string[] = lines.map((line: string): string => {
      const words: string[] = line.split(/\s/);
      let lineLength: number = 0;
      let lineWords: string[] = [];
  
      const justifiedWords: string[][] = words.reduce(
        (justifiedWords: string[][], word: string, i: number): string[][] => {
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
        },
        []
      );
  
      return justifiedWords
        .map((lineWords: string[]): string => {
          const totalSpaces: number = 80 - lineWords.reduce(
            (sum: number, word: string): number => sum + word.length,
            0
          );
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
  
          return lineWords
            .map((word: string, i: number): string => {
              if (i === lineWords.length - 1) {
                return word;
              }
  
              return word + ' '.repeat(gaps[i]);
            })
            .join('');
        })
        .join('\n');
    });
  
    return justifiedLines.join('\n');
}
   