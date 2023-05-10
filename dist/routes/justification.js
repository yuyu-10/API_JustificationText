"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const justificationText = (req, res) => {
    const { text } = req.body;
    res.json(text.length);
};
module.exports = {
    justificationText
};
//# sourceMappingURL=justification.js.map