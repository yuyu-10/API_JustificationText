"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleJustifyRequest = void 0;
const justifyController_1 = require("../controllers/justifyController");
const handleJustifyRequest = (req, res) => {
    //Etape un verifier le token
    //- si token inexitant
    //- si token invalide
    //- si token expiré
    //Etape deux verif la table history pour la limite du jour
    //- si entrée inexistante
    //  - crée direct avec le count incrémenté
    //- si limite depassée
    const justify = (0, justifyController_1.justifyText)(req.body.text);
    res.setHeader('content-type', 'text/plain');
    res.send(justify);
};
exports.handleJustifyRequest = handleJustifyRequest;
//# sourceMappingURL=justifyRoute.js.map