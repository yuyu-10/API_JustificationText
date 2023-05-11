"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJustifyRequest = void 0;
const justifyController_1 = require("../controllers/justifyController");
const handleJustifyRequest = (req, res) => {
    const justify = (0, justifyController_1.justifyText)(req.body.text);
    res.setHeader('content-type', 'text/plain');
    res.send(justify);
};
exports.handleJustifyRequest = handleJustifyRequest;
//# sourceMappingURL=justifyRoute.js.map