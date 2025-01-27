const path = require('path');
const jsonServer = require('json-server');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800);
    });
    next();
});

// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }
    next();
});

server.use(jsonServer.defaults());
server.use(router);

// eslint-disable-next-line consistent-return
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const { users } = db;

    const userFromBd = users.find(
        (user) => user.username === username && user.password === password,
    );
    if (!userFromBd) {
        return res.json(userFromBd);
    }

    return res.status(403).json({ message: ':AUTH ERROR' });
});

server.listen(8000, () => {
    console.log('Server running on port http://localhost:8000');
});
