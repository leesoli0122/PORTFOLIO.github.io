//1번 기본
import React, { useState } from 'react' //컴포넌트 상태 관리용으로 사용
import './App.scss' // 전체 스타일을 관리하는 전역 scss 파일을 import해서 UI 디자인 적용

//7번 모든 컴포넌트 import
import { ComponentMap } from '.'

function App() {
    //3번 워크리스트 정의
    // 실제로 가이드화하려는 컴포넌트 목록이며 id, name, status 정보를 포함.
    // 이 구조는 데이터 기반 UI 렌더링을 가능하게 함(map으로 반복 렌더링할 수 있도록).
    const [components, setComponents] = useState([
        { id: 'accordion', name: 'Accordion', status: 'todo' },
        { id: 'badge', name: 'Badge', status: 'todo' },
        { id: 'breadcrumb', name: 'Breadcrumb', status: 'todo' },
        { id: 'button', name: 'Button', status: 'todo' },
        { id: 'calendar', name: 'Calendar', status: 'todo' },
        { id: 'carousel', name: 'Carousel', status: 'todo' },
        { id: 'checkbox', name: 'Checkbox', status: 'todo' },
        { id: 'critical-alerts', name: 'Critical Alerts', status: 'todo' },
        { id: 'disclosure', name: 'Disclosure', status: 'todo' },
        { id: 'footer', name: 'Footer', status: 'todo' },
        { id: 'form', name: 'Form', status: 'todo' },
        { id: 'header', name: 'Header', status: 'todo' },
        { id: 'in-page-navigation', name: 'In-page Navigation', status: 'todo' },
        { id: 'main-menu', name: 'Main Menu', status: 'todo' },
        { id: 'modal', name: 'Modal', status: 'todo' },
        { id: 'pagination', name: 'Pagination', status: 'todo' },
        { id: 'radio', name: 'Radio', status: 'todo' },
        { id: 'select', name: 'Select', status: 'todo' },
        { id: 'side-navigation', name: 'Side Navigation', status: 'todo' },
        { id: 'spinner', name: 'Spinner', status: 'todo' },
        { id: 'step', name: 'Step', status: 'todo' },
        { id: 'structured-list', name: 'Structured List', status: 'todo' },
        { id: 'tab', name: 'Tab', status: 'todo' },
        { id: 'table', name: 'Table', status: 'todo' },
        { id: 'tag', name: 'Tag', status: 'todo' }
    ])

    //2번 컴포넌트 상태 정의
    const [selectedComponent, setSelectedComponent] = useState(null) // 어떤 컴포넌트를 선택했는지를 저장하기 위한 상태. 왼쪽 목록에서 클릭 -> 오른쪽 프리뷰에 표시라는 흐름을 구현하기 위해 필수.


    //4번 상태 색상/텍스트 헬퍼 함수
    // 상태별 시각적 구분(badge 색상 등)과 텍스트 출력(완료, 진행중, 대기)을 통일된 로직으로 제공
    // 유지보수와 확장성 항상: 상태 값이 바뀌어도 이 함수만 수정하면 전체 적용
    const getStatusColor = (status) => {
        switch (status) {
        case 'completed': return '#28a745'
        case 'inprogress': return '#ffc107'
        case 'todo': return '#6c757d'
        default: return '#6c757d'
        }
    }

    const getStatusText = (status) => {
        switch (status) {
        case 'completed': return '완료'
        case 'inprogress': return '진행중'
        case 'todo': return '대기'
        default: return '대기'
        }
    }

    //5번 상태 변경 함수(updateStatus)
    // 버튼 클릭 시 상태를 바꾸는 로직을 한 곳에 모아두어 재사용 가능성 확보
    const updateStatus = (componentId, newStatus) => {
        setComponents(prevComponents => 
            prevComponents.map(component => 
                component.id === componentId 
                ? { ...component, status: newStatus }
                : component
            )
        )
    }

    //8번
    const renderSelectedComponent = () => {
        // ComponentMap에서 해당 컴포넌트를 찾아서 렌더링
        const SelectedComponentDemo = ComponentMap[selectedComponent]
        
        if (SelectedComponentDemo) {
            return <SelectedComponentDemo />
        }
        
        // 아직 만들어지지 않은 컴포넌트는 placeholder 표시
        return (
            <div className="placeholder">
                <p>🚧 {components.find(c => c.id === selectedComponent)?.name} 컴포넌트</p>
                <p>여기에 컴포넌트가 렌더링됩니다.</p>
            </div>
        )
    }


    //6번
    return (
        <div className="guide-app">
            {/* header */}
            <header className="guide-header">
                <h1>Design System Guide</h1>
                <p>공통 컴포넌트 가이드 워크리스트</p>
            </header>

            {/* main container */}
            <div className="guide-container">
                {/*
                    sidebar : 총 개수, 상태별 통계(완료.진행중.대기), 컴포넌트 리스트 출력
                            리스트 아이템 클릭 시 setSelectedComponent를 통해 선택 변경
                */}
                <aside className="component-list">
                    <h2>Components ({components.length})</h2>
                    <div className="status-summary">
                    <div className="status-item">
                        <span className="status-dot" style={{backgroundColor: '#28a745'}}></span>
                        완료: {components.filter(c => c.status === 'completed').length}
                    </div>
                    <div className="status-item">
                        <span className="status-dot" style={{backgroundColor: '#ffc107'}}></span>
                        진행중: {components.filter(c => c.status === 'inprogress').length}
                    </div>
                    <div className="status-item">
                        <span className="status-dot" style={{backgroundColor: '#6c757d'}}></span>
                        대기: {components.filter(c => c.status === 'todo').length}
                    </div>
                    </div>
                    
                    <ul className="component-items">
                    {components.map(component => (
                        <li 
                        key={component.id}
                        className={`component-item ${selectedComponent === component.id ? 'active' : ''}`}
                        onClick={() => setSelectedComponent(component.id)}
                        >
                        <div className="component-info">
                            <span className="component-name">{component.name}</span>
                            <span 
                            className="status-badge"
                            style={{backgroundColor: getStatusColor(component.status)}}
                            >
                            {getStatusText(component.status)}
                            </span>
                        </div>
                        </li>
                    ))}
                    </ul>
                </aside>

                {/* preview panel(컴포넌트 미리보기)
                선택한 컴포넌트가 있으면 :
                - 상단: 컴포넌트 이름 + 상태 변경 버튼
                - 하단: "여기에 컴포넌트가 렌더링 됩니다"안내 메시지
                선택한 컴포넌트가 없으면:
                - "컴포넌트를 선택해주세요" 메시지 출력
                */}
                <main className="component-preview">
                    {selectedComponent ? (
                    <div className="preview-container">
                        <div className="preview-header">
                        <h2>{components.find(c => c.id === selectedComponent)?.name}</h2>
                        <div className="status-controls">
                            <button 
                            className="status-btn todo"
                            onClick={() => updateStatus(selectedComponent, 'todo')}
                            >
                            대기
                            </button>
                            <button 
                            className="status-btn inprogress"
                            onClick={() => updateStatus(selectedComponent, 'inprogress')}
                            >
                            진행중
                            </button>
                            <button 
                            className="status-btn completed"
                            onClick={() => updateStatus(selectedComponent, 'completed')}
                            >
                            완료
                            </button>
                        </div>
                        </div>
                        
                        <div className="preview-content">
                        {renderSelectedComponent()}
                        </div>
                    </div>
                    ) : (
                    <div className="no-selection">
                        <h2>컴포넌트를 선택해주세요</h2>
                        <p>왼쪽 목록에서 컴포넌트를 클릭하면 미리보기가 표시됩니다.</p>
                    </div>
                    )}
                </main>
            </div>
        </div>
    )
    // 정리
    // componentList : 컴포넌트를 목록으로 구조화해 반복 렌더링 가능하게 함
    // selectedComponent : 선택된 항목만 오른쪽에 프리뷰 렌더링 가능하게 함
    // 상태별 색상/텍스트 함수 : 일관된 디자인 시스템을 유지하기 위해 헬퍼 함수 활용
    // updateStatus 함수 : 추후 상태를 실제로 저장/전송할 수 있게 확장 가능
    // UI 구조(왼쪽 목록 + 오른쪽 프리뷰) : 사용자가 컴포넌트 진행 현황을 직관적으로 볼 수 있도록 함
}

export default App