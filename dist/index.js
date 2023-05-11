"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const justifyRoute_1 = require("./routes/justifyRoute");
const app = (0, express_1.default)();
const port = 3000;
// Middleware pour parser les requêtes en JSON
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Route principale
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Route pour justifier un texte
app.post('/api/justify', justifyRoute_1.handleJustifyRequest);
// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
exports.default = { app };
//# sourceMappingURL=index.js.map