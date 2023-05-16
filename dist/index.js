"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.log(err);
});
const justifyRoute_1 = require("./routes/justifyRoute");
const createUserRoute_1 = require("./routes/createUserRoute");
const verifTokenController_1 = require("./controllers/verifTokenController");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware pour parser les requêtes en JSON
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Route principale
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
// Route pour justifier un texte
app.post('/api/justify', verifTokenController_1.tokenMiddleware, justifyRoute_1.handleJustifyRequest);
//Route pour l'authentification par email et token
app.post('/api/token', createUserRoute_1.createUser);
//# sourceMappingURL=index.js.map