
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'chave_secreta',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

app.get('/', (req, res) => res.redirect('/login'));

app.get('/register', (req, res) => {
    res.render('cadastro');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run('insert into users (username, password) values (?, ?)', [username, hashedPassword], (err) => {
        if (err) {
            res.send('erro ao registrar usuario');
        } else {
            res.redirect('/login');
        }
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('select * from users where username = ?', [username], (err, user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id;
            res.redirect('/messages');
        } else {
            res.send('credenciais invalidas');
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/messages', isAuthenticated, (req, res) => {
    db.all('select * from messages', (err, messages) => {
        res.render('mural', { messages });
    });
});

app.get('/messages/create', isAuthenticated, (req, res) => {
    res.render('criarmensagem');
});

app.post('/messages/create', isAuthenticated, (req, res) => {
    const { title, content } = req.body;

    db.run('insert into messages (title, content, user_id) values (?, ?, ?)', [title, content, req.session.userId], (err) => {
        if (err) {
            res.send('erro ao criar mensagem');
        } else {
            res.redirect('/messages');
        }
    });
});

app.get('/messages/:id', isAuthenticated, (req, res) => {
    const messageId = req.params.id;

    db.get('select * from messages where id = ?', [messageId], (err, message) => {
        if (message) {
            res.render('detalhes', { message });
        } else {
            res.send('mensagem nao encontrada');
        }
    });
});

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});
