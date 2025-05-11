const API_KEY = '31e2df242b1447818a921806251105';
const weatherContainer = document.getElementById('weatherContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// DOM elements
const locationName = document.getElementById('locationName');
const localTime = document.getElementById('localTime');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const feelslike = document.getElementById('feelslike');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const precip = document.getElementById('precip');

// 날씨 정보 가져오기
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no&lang=ko`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            throw new Error(data.error.message);
        }
    } catch (error) {
        alert('날씨 정보를 가져오는데 실패했습니다. 올바른 도시명을 입력해주세요.');
        weatherContainer.classList.remove('active');
    }
}

// 날씨 정보 표시
function displayWeather(data) {
    const { location, current } = data;

    // 위치 정보 업데이트
    locationName.textContent = `${location.name}, ${location.country}`;
    
    // 현지 시간을 더 보기 좋게 포맷팅
    const localDateTime = new Date(location.localtime);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    localTime.textContent = localDateTime.toLocaleString('ko-KR', options);

    // 날씨 정보 업데이트
    weatherIcon.src = current.condition.icon;
    weatherIcon.alt = current.condition.text;
    temperature.textContent = `${Math.round(current.temp_c)}°`;
    condition.textContent = current.condition.text;

    // 상세 정보 업데이트
    feelslike.textContent = `${Math.round(current.feelslike_c)}°C`;
    humidity.textContent = `${current.humidity}%`;
    wind.textContent = `${current.wind_kph} km/h`;
    precip.textContent = `${current.precip_mm} mm`;

    // 날씨 컨테이너 표시
    weatherContainer.classList.add('active');
}

// 이벤트 리스너
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('도시명을 입력해주세요.');
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert('도시명을 입력해주세요.');
        }
    }
});

// 페이지 로드 시 서울의 날씨 표시
window.addEventListener('load', () => {
    getWeather('Seoul');
});
