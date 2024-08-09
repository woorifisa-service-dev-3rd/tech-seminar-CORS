const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors(
    {
        origin: "http://127.0.0.1:5500",
        credentials : true
    }

));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 요청에 들어온 쿠키를 응답해주는 api
app.use('/send-cookie', (req, res, next) => {
    console.log(req.cookies);
    res.send(req.cookies);
});

// 쿠키를 생성해주는 api
app.use('/set-cookie', (req, res, next) => {
    console.log('쿠키 생성');
    res.cookie('name', 'wangmin', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 1000,
      });
    res.sendStatus(200);
});

app.listen(3000, () => console.log("서버 실행"))

module.exports = app;
