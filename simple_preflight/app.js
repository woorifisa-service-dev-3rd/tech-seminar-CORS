document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form").onsubmit = (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    const formData = new FormData(form);

    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        const responseData = xhr.responseText;
        const result = JSON.parse(responseData);
        alert("축하드립니다. 맛있는 하루였네요 ^___^");
      }
    };

    xhr.open("POST", "http://localhost:3000/simple");
    xhr.send(formData);
  };

  document.getElementById("preflightButton").addEventListener("click", (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/data", {
      method: "GET",
      headers: {
        "X-Custom-Header": "CustomValue", // 커스텀 헤더 추가
        "Content-Type": "application/json", // Content-Type을 application/json으로 설정
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        console.log(result.name, result.favoriteFood);

        document.getElementById(
          "reponse-result"
        ).textContent = `${result.name} 의 최애음식 ${result.favoriteFood}`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
})
