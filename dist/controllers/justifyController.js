"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyText = void 0;
const justifyText = (text) => {
    const lines = text.split(/\n/);
    const justifiedLines = lines.map(line => {
        if (line.length <= 80) {
            return line;
        }
        const words = line.split(/\s/);
        let lineLength = 0;
        let lineWords = [];
        const justifiedWords = words.reduce((justifiedWords, word, i) => {
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
        return justifiedWords.map(lineWords => {
            const totalSpaces = 80 - lineWords.reduce((sum, word) => sum + word.length, 0);
            const numGaps = lineWords.length - 1;
            if (numGaps === 0) {
                return lineWords[0];
            }
            const gaps = [];
            let remainingSpaces = totalSpaces;
            for (let i = 0; i < numGaps; i++) {
                const gapSize = Math.ceil(remainingSpaces / (numGaps - i));
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
exports.justifyText = justifyText;
//# sourceMappingURL=justifyController.js.map