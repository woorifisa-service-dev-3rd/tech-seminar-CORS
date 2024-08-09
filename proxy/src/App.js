import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('ko'); // 기본값: 한국어
  const [targetLanguage, setTargetLanguage] = useState('en'); // 기본값: 영어

  // 번역할 언어가 변경되면 targetLanguage 상태를 업데이트
  const handleTargetLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  // 번역할 텍스트가 변경되면 sourceText 상태를 업데이트
  const handleSourceTextChange = (event) => {
    setSourceText(event.target.value);
  };

  // 텍스트가 변경되면 1.5초 후 언어 감지 및 번역 요청
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sourceText.trim()) {
        detectLanguage(sourceText);
      }
    }, 1500);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [sourceText]);

  // 언어 감지 API 요청
  const detectLanguage = (text) => {
    fetch('/api/detect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ query: text }), // JSON.stringify로 직렬화
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Detected language: ${data.langCode}`); // 언어 감지 로그
        setSourceLanguage(data.langCode); // 감지된 언어 설정
        translateText(text, data.langCode, targetLanguage);
      })
      .catch((error) => console.error('Error detecting language:', error));
  };

  // // 번역 API 요청
  const translateText = (text, detectedLang, targetLang) => {
    fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: detectedLang,
        target: targetLang,
        text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Translation response: ${data.translatedText}`); // 번역 결과 로그
        setTargetText(data.translatedText);
      })
      .catch((error) => console.error('Error translating text:', error));
  };

  return (
    <div className="App">
      <h1>Papago using React</h1>
      <div>
        <select value={sourceLanguage} disabled>
          <option value="ko">한국어</option>
          <option value="en">영어</option>
          <option value="ja">일본어</option>
          <option value="zh-CN">중국어</option>
        </select>
        <textarea
          value={sourceText}
          onChange={handleSourceTextChange}
          placeholder="번역할 텍스트를 입력하세요"
        ></textarea>
      </div>
      <div>
        <select value={targetLanguage} onChange={handleTargetLanguageChange}>
          <option value="ko">한국어</option>
          <option value="en">영어</option>
          <option value="ja">일본어</option>
          <option value="zh-CN">중국어</option>
        </select>
        <textarea value={targetText} readOnly placeholder="번역 결과"></textarea>
      </div>
    </div>
  );
}

export default App;
