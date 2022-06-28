// 게임에 핋요한 로직

// 랜덤번호로 정답 지정
// 유저 번호 입력, go 버튼 클릭
// 번호 맞추면 맞췄다
// 랜덤 번호가 유저번호보다 작으면 Down
// 랜덤 번호가 유저번호보다 크면 Up
// reset 버튼을 누르면 게임 리셋
// 기회 5번을 쓰면 게임 끝, 버튼이 disable
// 범위 밖 숫자면 알려주며 기회 차감 X
// 유저가 이미 입력한 숫자도 알려주며 기회 차감 X
// 정답 확인란 만들기


// 랜덤번호 지정
let computerNum = 0

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1
    console.log(`정답은 ${computerNum}`)
}

pickRandomNum()

// Go 버튼
let playButton = document.getElementById("play-button")     // 게임 버튼
let userInput = document.getElementById("user-input")       // 유저 번호
let resultArea = document.getElementById("result-area")     // 결과 창
let chancesArea = document.getElementById("chance-area")    // 찬스 남은횟수
let answerArea = document.getElementById("answer-area")     // 정답 확인 창
let answerButton = document.getElementById("answer-button") // 정답 확인버튼

// 남은 기회
let chances = 5                // 초기화
let gameOver = false           // 초기화

// 이미 입력한 수에 대한 히스토리 생성
let history = []

playButton.addEventListener("click", play)   // 매개변수에 play() 형태 X

function play() {
    let userValue = userInput.value

    // 1 ~ 100 사이 외에 수를 입력하는 경우
    if(userValue < 1 || userValue > 100) {
        resultArea.textContent = "1 ~ 100 사이 수를 입력하세요!!"
        return      // 함수 종료시킴 즉, 밑의 코드를 실행 X
    }

    if(history.includes(userValue)) {    // 히스토리에 값이 존재한다면,
        resultArea.textContent = "이미 확인한 숫자입니다!!"
        return                          // 함수 종료
    }

    if(userValue < computerNum) {
        resultArea.textContent = "Up"
        chances--
        chancesArea.textContent = `남은 기회는 ${chances}번!!`  // 횟수 출력
    } else if(userValue > computerNum) {
        resultArea.textContent = "Down"
        chances--
        chancesArea.textContent = `남은 기회는 ${chances}번!!`  // 횟수 출력
    } else {
        resultArea.textContent = "Exact!!"
        playButton.disabled = true       // 맞추면 Go 버튼 비활성화
        chancesArea.textContent = `${6-chances}번 만에 맞췄습니다!!`
    }

    // 히스토리에 값 푸시
    history.push(userValue)

    if(chances < 1) {
        chancesArea.textContent = "도전 실패!!"
        gameOver = true
    }
    if(gameOver) {
        playButton.disabled = true
    }
}

// input 창 focus 시, 초기화
userInput.addEventListener("focus", deleteInput)

function deleteInput() {
    userInput.value = ""
}

// 리셋 버튼
let resetButton = document.getElementById("reset-button")
resetButton.addEventListener("click", reset)

function reset() {
    // 유저 인풋창을 비우기
    userInput.value = ""

    // 새로운 번호 만들기
    pickRandomNum()

    // 결과 멘트창 초기화
    resultArea.textContent = "결과가 나옵니다!"

    // 찬스 초기화
    chances = 5

    // 찬스 횟수 출력 초기화
    chancesArea.textContent = `남은 횟수 ${chances}번!!`

    // Go 버튼 활성화
    playButton.disabled = false

    // gameOver 초기화
    gameOver = false

    // 정답란 가리기
    answerArea.textContent = "[정답확인을 눌러보세요!]"
}

// 정답확인
answerButton.addEventListener("click", appearAnswer)

function appearAnswer() {
    answerArea.textContent = computerNum
}