"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const justifyController_1 = require("../controllers/justifyController");
describe('justifyText', () => {
    test('should return an empty string when passed an empty string', () => {
        const result = (0, justifyController_1.justifyText)('');
        expect(result).toEqual('');
    });
    test('should return the original text when each line is already 80 characters or less', () => {
        const text = 'This is a short line.\nThis is another short line.';
        const result = (0, justifyController_1.justifyText)(text);
        expect(result).toEqual(text);
    });
    test('should justify text with multiple lines', () => {
        const text = 'This is a longer line that needs to be justified.\nThis is another longer line that also needs to be justified.';
        const expected = 'This   is   a   longer   line   that   needs   to   be   justified.\nThis  is  another  longer  line  that  also  needs  to  be  justified.';
        const result = (0, justifyController_1.justifyText)(text);
        expect(result).toEqual(expected);
    });
    test('should handle lines with multiple spaces between words', () => {
        const text = 'This     line     has     multiple     spaces.';
        const expected = 'This line has multiple spaces.';
        const result = (0, justifyController_1.justifyText)(text);
        expect(result).toEqual(expected);
    });
    test('should handle lines with no spaces between words', () => {
        const text = 'Thislinehasnospaces.';
        const expected = 'Thislinehasnospaces.';
        const result = (0, justifyController_1.justifyText)(text);
        expect(result).toEqual(expected);
    });
});
//# sourceMappingURL=justifyController.test.js.map