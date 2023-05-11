app.post('/api/justify', (req, res) => {
    const j = justify.justifyText(req.body.text);
    res.setHeader('content-type', 'text/plain');
    res.send(j);
});
//# sourceMappingURL=justify.js.map