/*현재 url 복사*/
function fn_currentUrlCopy() {

    const isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());
    const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) === null && navigator.maxTouchPoints != 5 ? false : true; // iPad는 터치 가능수로 확인
    let currentUrl = window.location.href;
    let title = document.getElementById('shareTitle').textContent;

    if(isMobile || isIOS){ // 모바일
        if(navigator.share){
            navigator.share({
                title: title,
                url: currentUrl,
            });
        } else {
            alert("지원하지 않는 환경입니다.");
        }
    } else { // PC
        if (typeof(navigator.clipboard)=='undefined') {
            const textArea = document.createElement("textarea");
            textArea.value = currentUrl;
            textArea.style.position="fixed";  //avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            toastr.info(msg);

            document.body.removeChild(textArea);
            copyConfirmMessage();
            return false;
        } else {
            navigator.clipboard
                .writeText(currentUrl)
                .then(res => {
                    copyConfirmMessage();
                });
        }
    }
}

/*날짜 String 점 찍기*/
function fn_dateFormat(strDate){
    if(!strDate && strDate < 8) return '';
    const yyyy = strDate.substring(0, 4);
    const mm = strDate.substring(4, 6);
    const dd = strDate.substring(6, 8);
    return yyyy + "." + mm + "." + dd;
}

/*날짜 String 점 찍기(yy.MM.dd)*/
function fn_dateFormat2(strDate){
    if(!strDate && strDate < 8) return '';
    const yy = strDate.substring(2, 4);
    const mm = strDate.substring(4, 6);
    const dd = strDate.substring(6, 8);
    return yy + "." + mm + "." + dd;
}

/* null 체크*/
function fn_nullHelper(obj){
    if(!obj || obj == null || obj == undefined || obj == "null" || obj == "undefined") {
        return false;
    } else {
        return true;
    }
}

/*입력 체크(숫자, 영문, 한글, 공백, .만)*/
function fn_rule_search(input){
    /*const regExp = /[^a-zA-Z0-9가-힣ㄱ-ㅎ.\s]/g;
    if (regExp.test(input.value)) {
        input.value = input.value.replace(regExp, '');
    }*/
    let inputValue = input.value;
    let maxKrLength = 10;
    let maxEngLength = 20;
    let maxNumLength = 10;

    // 한/영/숫자 입력확인 및 허용되지 않는 문자 제거
    if (!/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9.\s]*$/.test(inputValue)) {
        input.value = inputValue.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9.\s]/g, '');
    }

    // 한/영에 다른 maxLength 값 적용 및 자르기
    //input.value = fn_truncateToMax(inputValue, maxKrLength, maxEngLength, maxNumLength);
    return input.value;
}

// 한/영/숫자에 다른 maxLength 값 적용 및 자르기
function fn_truncateToMax(value, maxKrLength, maxEngLength, maxNumLength) {
    let krCount = 0;
    let engCount = 0;
    let numCount = 0;
    let truncated = '';

    for (let i = 0; i < value.length; i++) {
        let char = value[i];
        if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(char)) {
            if (krCount < maxKrLength) {
                truncated += char;
                krCount++;
            }
        } else if (/[a-zA-Z]/.test(char)) {
            if (engCount < maxEngLength) {
                truncated += char;
                engCount++;
            }
        } else if (/[0-9]/.test(char)) {
            if (numCount < maxNumLength) {
                truncated += char;
                numCount++;
            }
        } else {
            truncated += char; // 공백 및 점은 무제한 허용
        }
    }

    return truncated;
}

//실시간 지수
function fn_openRealTimeModal(){
    const modal = $(".c-modal.c-modal--real-time-index");
    const tbody = modal.find(".c-table__body");
    $.ajax({
        url: "/api/v1/main/footer/realTime",
        type: "get",
        dataType: "json",
        success: function(data){
            if(data) {
                let html = '';
                for (let i = 0; i < data.length; i++) {
                    html += '<tr class="c-table__row">';
                    html += '    <td class="c-table__cell c-table__cell--body">' + data[i].name + '</td>';
                    html += '    <td class="c-table__cell c-table__cell--body">' + data[i].code + '</td>';
                    html += '    <td class="c-table__cell c-table__cell--body">' + data[i].price + '</td>';
                    html += '    <td class="c-table__cell c-table__cell--body">' + data[i].diffRate + '</td>';
                    html += '    <td class="c-table__cell c-table__cell--body">' + data[i].updateTime + '</td>';
                    html += '</tr>';
                }
                tbody.empty();
                tbody.append(html);
            }
            loadCompletedItems();
        },
        error: function(){
            alert("관리자에게 문의하세요.");
        }
    })
}

//메인검색어 enter로 입력 및 키 입력시 이벤트
$('#search-input').on('keyup focus', function (e) {
    if (e.keyCode === 13) {
        const searchSubmitBtn = $(".c-util__search-submit-btn");
        searchSubmitBtn.click();
    } else {
        const keyword = e.currentTarget.value;
        const relMain = JSON.parse(sessionStorage.getItem("relMain"));

        const mainAssociationSearch = $("#mainAssociationSearch");
        const mainAssociationSearchList = $("#mainAssociationSearchList");
        if (keyword.length > 0) {
            let isFind = false;
            let html = ''
            let matchCnt = 0;
            if(relMain) {
                for (let i = 0; i < relMain.length; i++) {
                    const lowerCaseRelFind = relMain[i].toLowerCase();
                    const lowerCaseKeyword = keyword.toLowerCase();
                    const index = lowerCaseRelFind.indexOf(lowerCaseKeyword);
                    if (index !== -1) {
                        html += '<a href="javascript:void(0)" onpointerdown="fn_mainSearch(\'' + relMain[i] + '\')">'
                            + relMain[i].substring(0, index)
                            + '<span class="highlight">' + relMain[i].substring(index, index + keyword.length) + '</span>'
                            + relMain[i].substring(index + keyword.length) + '</a>';
                        isFind = true;
                        matchCnt = matchCnt + 1;
                    }
                    if (matchCnt > 9) break;
                }
            }
            mainAssociationSearchList.empty();
            mainAssociationSearchList.append(html);
            if (matchCnt > 0) {
                mainAssociationSearch.addClass("visible");
            } else {
                mainAssociationSearch.removeClass("visible");
            }
        } else {
            mainAssociationSearchList.empty();
            mainAssociationSearch.removeClass("visible");
        }
    }
}).blur(function (e){
    const relatedTarget = e.relatedTarget;
    if (relatedTarget == null) {
        const findAssociationSearch = $("#mainAssociationSearch");
        const findAssociationSearchList = $("#mainAssociationSearchList");
        findAssociationSearchList.empty();
        findAssociationSearch.removeClass("visible");
    }
});

//메인 키워드 검색하기
let isMainSearch = false;
function fn_mainSearch(keyword){
    if(!isMainSearch) {
        if (!keyword) {
            keyword = $.trim($('#search-input').val());
            if (keyword.length < 1) {
                alert('검색어를 입력해 주세요');
                return false;
            }
        }
        keyword = keyword.replace(/&amp;/g, '&').replace(/&#38;/g, '&');
        isMainSearch = true;
        location.href = "/main/search?k=" + encodeURIComponent(keyword);
    }
}

//그래프 그리기
function fn_drawingGraphs(classNm){
    const chartElements = document.querySelectorAll("." + classNm);
    if(chartElements.length > 0) {
        chartElements.forEach(function (chartElement) {
            if(chartElement.dataset.graphValue) {
                initMainLineChart(chartElement, JSON.parse(chartElement.dataset.graphValue));
                chartElement.classList.remove(classNm);
            }
        });
    }
}

//리포트 append HTML 생성
function fn_appendReportListHTML(content){
    let html = '';
    for(let i=0 ; i<content.length ; i++) {
        if (content[i].chnnlDiv === 'SPOT' || content[i].chnnlDiv === 'WEEKLY' || content[i].chnnlDiv === 'MONTHLY') {
            html += '<li class="c-card c-card--insight-etf scroll-visible append-content">';
            html += '    <a href="/insight/report/detail?n=' + content[i].id + '">';
            html += '        <div  class="c-card__wrap">';
            html += '            <span class="c-card__wrap--eyebrow">' + content[i].chnnlDivName + '</span>';
            html += '            <p class="c-card__wrap--title">' + content[i].title + '</p>';
            html += '            <div class="c-card__wrap--btn-wrap">';
            html += '                <span class="c-card__wrap--date">' + fn_dateFormat(content[i].viewDate) + '</span>';
            html += '                <button class="c-card__button c-card__button--more">상세보기</button>';
            html += '            </div>';
            html += '        </div>';
            if(!content[i].file){
                html += '       <div class="c-card__img default">';
                html += '           <img src="../../static/ClientUI/images/sub/pc/insight-etf-default-img.jpg" alt="이미지">';
                html += '       </div>';
            } else {
                html += '       <div class="c-card__img">';
                html += '           <img src="/upload/' + content[i].file.filePath + '/' + content[i].file.fileLname + '" alt="' + content[i].altText + '">';
                html += '       </div>';
            }
            html += '        </div>';
            html += '    </a>';
            html += '</li>';
        } else if (content[i].chnnlDiv === 'ANNUAL' || content[i].chnnlDiv === 'GLOBAL_INSIGHT') {
            html += '<li class="c-card c-card--insight-etf c-card--insight-etf__guide-book scroll-visible append-content">';
            html += '    <div  class="c-card__wrap c-card__wrap--guide-book">';
            html += '        <span class="c-card__wrap--eyebrow">' + content[i].chnnlDivName + '</span>';
            html += '        <p class="c-card__wrap--title">' + content[i].title + '</p>';
            html += '        <div class="c-card__wrap--btn-wrap">';
            html += '            <span class="c-card__wrap--date">' + fn_dateFormat(content[i].viewDate) + '</span>';
            html += '            <ul>';
            html += '                <li class="c-card__button c-card__button--view">';
            html += '                    <button data-target-name="j-modal--pdf-viewer" data-role="modalOpenBtn" data-file-name="' + content[i].file.fileLname + '">바로보기</button>';
            html += '                </li>';
            html += '                <li class="c-card__button c-card__button--download">';
            html += '                    <a href="/upload/' + content[i].file.filePath + '/' + content[i].file.fileLname + '" download="' + content[i].file.fileName + '">다운로드</a>';
            html += '                </li>';
            html += '            </ul>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="c-card__img default">';
            html += '       <img src="../../static/ClientUI/images/sub/pc/insight-etf-default-img.jpg" alt="이미지">';
            html += '    </div>';
            html += '</li>';
        }
    }
    return html;
}

//리포트 append HTML 생성
function fn_appendTvListHTML(content){
    let html = '';
    for(let i=0 ; i<content.length ; i++){
        html += '<li class="c-card c-card--insight-etf scroll-visible append-content">';
        html += '    <a href="/insight/tv/detail?n=' + content[i].id + '">';
        html += '        <div  class="c-card__wrap">';
        html += '            <span class="c-card__wrap--eyebrow">' + content[i].chnnlDivName + '</span>';
        html += '            <p class="c-card__wrap--title">' + content[i].title + '</p>';
        html += '            <div class="c-card__wrap--btn-wrap">';
        html += '                <span class="c-card__wrap--date">' + fn_dateFormat(content[i].viewDate) + '</span>';
        html += '                <button class="c-card__button c-card__button--more">상세보기</button>';
        html += '            </div>';
        html += '        </div>';
        if(!content[i].file){
            html += '       <div class="c-card__img default">';
            html += '           <img src="../../static/ClientUI/images/sub/pc/insight-etf-default-img.jpg" alt="이미지">';
            html += '       </div>';
        } else {
            html += '       <div class="c-card__img">';
            html += '           <img src="/upload/' + content[i].file.filePath + '/' + content[i].file.fileLname + '" alt="' + content[i].altText + '">';
            html += '       </div>';
        }
        html += '    </a>';
        html += '</li>';
    }
    return html;
}

function fn_sort(obj, sortType, order) {

    if ( sortType === 'fn1m' ) {
        if ( order ) {
            obj = obj.sort( (a, b) => a.fn1m - b.fn1m  );
        } else {
            obj = obj.sort( (a, b) => b.fn1m - a.fn1m  );
        }
    }

    if ( sortType === 'fn3m' ) {
        if ( order ) {
            obj = obj.sort( (a, b) => a.fn3m - b.fn3m  );
        } else {
            obj = obj.sort( (a, b) => b.fn3m - a.fn3m  );
        }
    }

    if ( sortType === 'fn6m' ) {
        if ( order ) {
            obj = obj.sort( (a, b) => a.fn6m - b.fn6m  );
        } else {
            obj = obj.sort( (a, b) => b.fn6m - a.fn6m  );
        }
    }

    if ( sortType === 'fn12m' ) {
        if ( order ) {
            obj = obj.sort( (a, b) => a.fn12m - b.fn12m  );
        } else {
            obj = obj.sort( (a, b) => b.fn12m - a.fn12m  );
        }
    }

    if ( sortType === 'fn3y' ) {
        if ( order ) {
            obj = obj.sort( (a, b) => a.fn3y - b.fn3y  );
        } else {
            obj = obj.sort( (a, b) => b.fn3y - a.fn3y  );
        }
    }

    if ( sortType === 'fnCa' ) {
        if ( order ) {
            obj = obj.sort( (a, b) => a.fnCa - b.fnCa  );
        } else {
            obj = obj.sort( (a, b) => b.fnCa - a.fnCa  );
        }
    }

    return obj;
}

//간편 계산하기 수익금 상품
function fn_randomGoods(money) {
    const goods1 = ["아메리카노", "국밥", "편의점 도시락"];
    const goods5 = ["치킨", "피자", "와인", "모바일 게임 쿠폰"];
    const goods10 = ["스타벅스 카드", "운동화", "고급 양주", "스마트 홈 디바이스"];
    const goods50 = ["최신 스마트 워치", "마사지 건", "무선 이어폰", "미니 공기청정기"];
    const goods100 = ["태블릿", "명품 카드지갑", "캠핑 장비", "로봇 청소기 "];
    const goods500 = ["노트북", "의류 관리기", "최신형 세탁기"];
    const goods1000 = ["스마트 냉장고", "유럽 여행 항공권", "프리미엄 홈시어터"];
    const goods3000 = ["프리미엄 크루즈 여행 패키지", "전세계 여행 패키지", "최신 가전 패키지"];
    const goods5000 = ["최신 경차", "프리미엄 준준형 신차", "스마트 홈 가전 풀세트"];
    const goods10000 = ["고급 중대형 신차", "전기차,럭셔리 가구 세트", "하이엔드 오디오 시스템"];
    const goodsMax = ["프리미엄 럭셔리 연간 회원권", "슈퍼카", "개인 헬기"];

    let goods = "";
    let result = "";
    if(money < 1){
        return "";
    } else if (money <= 10000) {
        goods = goods1;
    } else if(money <= 50000) {
        goods = goods5;
    } else if(money <= 100000) {
        goods = goods10;
    } else if(money <= 500000) {
        goods = goods50;
    } else if(money <= 1000000) {
        goods = goods100;
    } else if(money <= 5000000) {
        goods = goods500;
    } else if(money <= 10000000) {
        goods = goods1000;
    } else if(money <= 30000000) {
        goods = goods3000;
    } else if(money <= 50000000) {
        goods = goods5000;
    } else if(money <= 100000000) {
        goods = goods10000;
    } else {
        goods = goodsMax;
    }

    return goods[Math.floor(Math.random() * goods.length)];
}

//0.5초 후 loadCompletedItems 실행
function fn_loadCompletedItemsWithSetTimeOut(){
    setTimeout(() => {
        loadCompletedItems();
    }, 500);
}

//전체 검색 인기 키워드
$(".c-util__search-open-btn").click(function(e){
    $.ajax({
        url: "/api/v1/main/search/keyword",
        type: "get",
        dataType: "json",
        success: function (data) {
            if(data) {
                const relKeywordList = data.relKeywordList;
                if(relKeywordList && relKeywordList.length > 0) {
                    sessionStorage.setItem("relMain", JSON.stringify(relKeywordList));
                }

                const kvKeywordList = data.kvKeywordList;
                if(kvKeywordList && kvKeywordList.length > 0) {
                    let html = '';
                    for (let i = 0; i < kvKeywordList.length; i++) {
                        let keyword = fn_getTag(kvKeywordList[i].keyword);
                        html += '<span onpointerdown="fn_mainSearch(\'' + keyword + '\')">' + keyword + '</span>';
                    }
                    const tagList = $(".c-util__search-tag-list");
                    tagList.empty();
                    tagList.append(html);
                }
            }
        },
        error: function () {
            alert("관리자에게 문의하세요.");
        }
    });
});

//보유종목 없을때 차트 옵션
function fn_emptyChartOption(){
    return {
        tooltip: {
            trigger: 'item',
            show: false  // 툴팁을 비활성화합니다.
        },
        legend: {
            show: false,
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['63%', '93%'],
                avoidLabelOverlap: false,
                label: {
                    show: true, // 기본적으로 라벨을 표시
                    position: 'center',
                    formatter: function(params) {
                        // 'b'와 'c' 태그를 사용하여 텍스트를 구성합니다.
                        return '{b|해당 상품은}\n\n{c|구성품목이 없습니다.}';
                    },
                    rich: {
                        b: {
                            fontSize: 16,  // 'b' 스타일의 폰트 크기
                            lineHeight: 16,
                            fontFamily: 'Pretendard, sans-serif',
                            fontWeight: 400
                        },
                        c: {
                            fontSize: 16,  // 'c' 스타일의 폰트 크기
                            lineHeight: 16,
                            fontFamily: 'Pretendard, sans-serif',
                            fontWeight: 400
                        }
                    },
                    color: 'black'
                },

                labelLine: {
                    show: false
                },
                itemStyle: {
                    borderWidth: 1,  // 데이터들 간 간격을 2px로 설정
                    borderColor: '#ffffff'
                },
                data: [{ value: 0, name: '', itemStyle: { color: '#E4E4E4' } }]
            }
        ]
    };
}

function fn_formatDateDash(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
}

// 문자열 처리 함수
function fn_formatName(name) {
    if (name != null && name.length > 15) {
        const subStr = name.substring(0, 15);
        const lastSpaceIndex = subStr.lastIndexOf(' ');

        if (lastSpaceIndex !== -1) {
            return name.substring(0, lastSpaceIndex) + '\r\n' + name.substring(lastSpaceIndex + 1);
        } else {
            return name.substring(0, 15) + '\r\n' + name.substring(15);
        }
    } else {
        return name;
    }
}

// getTag 태그 변환
function fn_getTag(str) {
    if(str != null) {
        str = str.replaceAll("&lt;", "<");
        str = str.replaceAll("&gt;", ">");
        str = str.replaceAll("&#40;", "(");
        str = str.replaceAll("&#41;", ")");
        str = str.replaceAll("&#35;", "#");
        str = str.replaceAll("&#38;", "&");
        str = str.replaceAll("&quot;", "\'");
        str = str.replaceAll("&#39;", "\"");
    }
    return str;
}