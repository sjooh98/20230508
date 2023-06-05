import express from 'express'; // nodejs서버를 좀 더 쉬운 문법으로 구동시킬수 있는 프레임웤
import axios from 'axios'; // http요청을 쉽게 할 수 있게 해주는 라이브러리 
import cors from 'cors'; // cross origin 정책을 커스터마이징 할 수 있게 해주는 라이브러리 
import path from 'path'; // 경로와 관련된 설정을 도와주는 라이브러리

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); // app이라는 변수에 express프레임웤을 이용해서 초기화한후, 생성된 객체를 넣어주는 코드
const PORT = 3000; // 포트를 상수로 3000번으로 설정합니다. 

app.use(express.static(path.join(__dirname, 'docs')));
app.use(express.json()); // josn이라는 형식을 쓸 수 있게 설정 
app.use(cors()); // cors를 기본설정해서 주소가 같지 않아도 전부 통신 가능하도록 열어놓는 코드

app.get('/', (req, res) => {
  res.render('/docs/index.html');
});

app.post('/api/chat', async (req, res) => { // post방식으로 https://localhost:3000/api/chat이라는 주소로 요청을 받는 설정
  const prompt = req.body.prompt; // 응답(req)의 body의 prompt변수안의 값을 prompt라는 변수에 저장
  try {
    const response = await axios.post( // 오픈ai api 서버에 요청을 post방식으로 보냄. 그 응답을 response라는 변수에 저장
      'https://api.openai.com/v1/chat/completions', // 해당 api 요청 주소
      { // request body에 해당함
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}] // 배열형식 안에 role, content라는 항목을 가진 오브젝트를 넣어서 보냄
      },
      {
        headers: { // 요청 헤더를 정의 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` // 오픈에이아이 api키를 여기에 삽입. 
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(PORT);
});
