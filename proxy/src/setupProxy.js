const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 프록시할 경로 지정
    createProxyMiddleware({
      target: 'http://localhost:5000', // 실제 요청을 보낼 서버의 주소
      changeOrigin: true, // 요청 헤더의 Origin을 타겟 URL로 변경
      pathRewrite: {
        '^/api': '', // 경로에서 '/api'를 제거하여 백엔드 서버에 요청 보내기
      },
    })
  );
};
