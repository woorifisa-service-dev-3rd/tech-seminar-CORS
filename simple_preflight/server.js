import express, { json } from "express";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();

const app = express();
const upload = multer();

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 파일 제공 설정

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

app.get("/", (_, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.get("/data", (_, res) => {
  res.json({ name: "Kyle", favoriteFood: "Rice" });
});

app.post("/simple", upload.none(), (req, res) => {
  console.log("body: ", req.body);
  res.json({
    message: "요청이 성공적으로 처리되었습니다.",
    res_body: req.body,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(
    `http://127.0.0.1:${port}/ 서버 프로세스가 ${port}번 포트에서 실행 중입니다.`
  );
});
