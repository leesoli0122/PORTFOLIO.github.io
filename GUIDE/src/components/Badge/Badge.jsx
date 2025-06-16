import React from 'react';
import './Badge.scss';

const Badge = ({
    children,
    variant = 'default',
    size = 'medium',
    className = ''
    }) => {
    const badgeClasses = `badge badge--${variant} badge--${size} ${className}`;

    return (
        <span className={badgeClasses}>
        {children}
        </span>
    );
};

// 개별 export
export default Badge;
export const BadgeDemo = () => {
    return (
        <div className="badge-demo">
        <div className="badge-demo__header">
            <h1>Badge 컴포넌트</h1>
            <p>상태나 카테고리를 표시하는 작은 라벨 컴포넌트입니다.</p>
        </div>

        {/* 기본 사용법 */}
        <section className="badge-demo__section">
            <h2>기본 사용법</h2>
            <div className="badge-demo__badge-group">
            <Badge>기본</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            </div>
        </section>

        {/* 사이즈 변형 */}
        <section className="badge-demo__section">
            <h2>사이즈</h2>
            <div className="badge-demo__badge-group badge-demo__badge-group--items-center">
            <Badge size="small" variant="primary">Small</Badge>
            <Badge size="medium" variant="primary">Medium</Badge>
            <Badge size="large" variant="primary">Large</Badge>
            </div>
        </section>

        {/* 실제 사용 예시 */}
        <section className="badge-demo__section">
            <h2>실제 사용 예시</h2>
            
            {/* 상태 표시 */}
            <div className="badge-demo__example-item">
            <h3>상태 표시</h3>
            </div>
            <div className="badge-demo__badge-group">
            <Badge variant="success">완료</Badge>
            <Badge variant="warning">진행중</Badge>
            <Badge variant="error">실패</Badge>
            <Badge variant="info">대기</Badge>
            </div>

            {/* 카테고리 */}
            <div className="badge-demo__example-item">
            <h3>카테고리</h3>
            </div>
            <div className="badge-demo__badge-group">
            <Badge variant="primary">React</Badge>
            <Badge variant="success">JavaScript</Badge>
            <Badge variant="warning">CSS</Badge>
            <Badge variant="info">Design</Badge>
            </div>

            {/* 알림 개수 */}
            <div className="badge-demo__example-item">
            <h3>알림/개수</h3>
            </div>
            <div className="badge-demo__badge-group badge-demo__badge-group--items-center">
            <div className="badge-demo__example-item">
                <span>메시지</span>
                <Badge variant="error" size="small">3</Badge>
            </div>
            <div className="badge-demo__example-item">
                <span>알림</span>
                <Badge variant="warning" size="small">12</Badge>
            </div>
            <div className="badge-demo__example-item">
                <span>새 글</span>
                <Badge variant="success" size="small">99+</Badge>
            </div>
            </div>

            {/* 버튼과 함께 사용 */}
            <div className="badge-demo__example-item">
            <h3>버튼과 함께 사용</h3>
            </div>
            <div className="badge-demo__badge-group">
            <button className="badge-demo__button badge-demo__button--blue">
                메시지
                <Badge variant="error" size="small">5</Badge>
            </button>
            <button className="badge-demo__button badge-demo__button--gray">
                알림
                <Badge variant="warning" size="small">새글</Badge>
            </button>
            </div>
        </section>

        {/* Props 설명 */}
        <section className="badge-demo__section">
            <h2>Props</h2>
            <table className="badge-demo__table">
            <thead>
                <tr>
                <th>Prop</th>
                <th>타입</th>
                <th>기본값</th>
                <th>설명</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>children</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>배지에 표시될 내용</td>
                </tr>
                <tr>
                <td>variant</td>
                <td>string</td>
                <td>'default'</td>
                <td>배지 스타일 (default, primary, success, warning, error, info)</td>
                </tr>
                <tr>
                <td>size</td>
                <td>string</td>
                <td>'medium'</td>
                <td>배지 크기 (small, medium, large)</td>
                </tr>
                <tr>
                <td>className</td>
                <td>string</td>
                <td>''</td>
                <td>추가 CSS 클래스</td>
                </tr>
            </tbody>
            </table>
        </section>

        {/* 사용법 코드 */}
        <section className="badge-demo__section">
            <h2>코드 예시</h2>
            <div className="badge-demo__code-block">
                <pre>
                    {`// 기본 사용법
                    <Badge>기본</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">완료</Badge>

                    // 크기 변경
                    <Badge size="small">작은 배지</Badge>
                    <Badge size="large">큰 배지</Badge>

                    // 버튼과 함께
                    <button className="flex items-center gap-2">
                    메시지 <Badge variant="error">3</Badge>
                    </button>`}
                </pre>
            </div>
        </section>
        </div>
    );
};