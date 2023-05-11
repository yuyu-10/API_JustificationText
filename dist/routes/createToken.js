"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreateTokenRoute = void 0;
const createTokenController_1 = require("../controllers/createTokenController");
const handleCreateTokenRoute = (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'L\'email est requis.' });
    }
    if ((0, createTokenController_1.tokenExistsForEmail)(email)) {
        return res.status(400).json({ message: 'Un jeton existe déjà pour cet email.' });
    }
    const payload = { email };
    const token = (0, createTokenController_1.generateToken)(payload);
    (0, createTokenController_1.saveTokenForEmail)(email, token);
    res.setHeader('Authorization', `${token}`);
    res.json({ email });
};
exports.handleCreateTokenRoute = handleCreateTokenRoute;
//# sourceMappingURL=createToken.js.map