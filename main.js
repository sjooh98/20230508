import './style.css'
import axios from 'axios'; // axios 라이브러리를 가져온다. http전송을 자바스크립트 코드로 가능하게 해주는 라이브러리

window.onload = function () { // 자바스크립트로 접근할 수 있는 브라우저 최상단 객체가 로드되었을때, 다음 함수를 실행하라.
  document.getElementById('chatForm').onsubmit = function (e) { // document최상단 html객체에서 'chatForm'이라는 아이디를 가진 폼객체를 찾아, onsubmit(서브밋 될뗴 실행)함수를 정의함
    e.preventDefault(); // submit 함수의 기본 동작을 하지말라.

    const prompt = document.getElementById('prompt').value; // document의 'prompt'아이디를 가진 html태그를 찾아서 그 값을 const prompt라는 변수에 저장한다.
    const responseElement = document.getElementById('response'); // document의 'response'아이디를 가진애를 찾아서 저장한다

    axios.post('http://157.245.154.238:3000/api/chat', { prompt: prompt }) // axios의 post방식으로 https://localhost:3000/api/chat 목적지로 prompt라는 값에 미리 정의한 prompt를 넣어서 요청한다. 
      .then(function (response) { // 서버에서 값이 오면 
        console.log(response);
        responseElement.textContent = response.data.choices[0].message.content; // 출력한 태그인 p태그에 respose.data.choices[0].message.content의 텍스트 데이터를 넣어준다.  
      })
      .catch(function (error) { // 만약에 에러가 났을 때, 
        console.error('Error:', error); // 에러를 콘솔에 출력하고 
        responseElement.textContent = 'Error: ' + error.message; // 에러메시지를 출력태그의 값에 넣어서 화면에 띄워준다
      });
  };
};

