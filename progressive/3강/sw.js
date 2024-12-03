self.addEventListener('install', pEvent1 => {
    console.log('서비스워커 설치(install)함!', pEvent1);
});

self.addEventListener('activate', pEvent2 => {
    console.log('서비스워커 동작(activation) 시작됨!', pEvent2);
});

self.addEventListener('fetch', pEvent3 => {
    console.log("데이터 요청(fetch)!", pEvent3.request)
});