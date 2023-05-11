"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJustifyRequest = void 0;
const justifyController_1 = require("../controllers/justifyController");
const handleJustifyRequest = (req, res) => {
    const j = (0, justifyController_1.justifyText)(req.body.text);
    res.setHeader('content-type', 'text/plain');
    res.send(j);
};
exports.handleJustifyRequest = handleJustifyRequest;
//# sourceMappingURL=justifyRoute.js.map