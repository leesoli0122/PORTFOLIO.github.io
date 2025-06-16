import React, { useState, useEffect } from 'react';

function TodoApp() {
  // 1. useState - 컴포넌트 내부 상태 관리
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 공부하기', completed: false },
    { id: 2, text: '프로젝트 만들기', completed: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // 2. useEffect - 컴포넌트가 렌더링될 때 실행
  useEffect(() => {
    console.log('할 일 목록이 업데이트되었습니다:', todos);
  }, [todos]); // todos가 변경될 때마다 실행

  // 3. 함수들 - 상태를 변경하는 로직
  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo = {
      id: Date.now(), // 간단한 ID 생성
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]); // 기존 배열에 새 항목 추가
    setInputValue(''); // 입력창 초기화
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 4. 필터링 로직
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-app" style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>📝 할 일 목록</h1>
      
      {/* 입력 영역 */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="새로운 할 일을 입력하세요"
          style={{
            flex: 1,
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '12px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          추가
        </button>
      </div>

      {/* 필터 버튼들 */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '5px' }}>
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === filterType ? '#007bff' : '#f8f9fa',
              color: filter === filterType ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {filterType === 'all' ? '전체' : 
             filterType === 'active' ? '진행중' : '완료'}
          </button>
        ))}
      </div>

      {/* 할 일 목록 */}
      <div>
        {filteredTodos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            할 일이 없습니다!
          </p>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                marginBottom: '8px',
                backgroundColor: todo.completed ? '#f8f9fa' : 'white',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '12px', transform: 'scale(1.2)' }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#666' : '#333',
                  fontSize: '16px'
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                삭제
              </button>
            </div>
          ))
        )}
      </div>

      {/* 통계 */}
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666'
      }}>
        전체: {todos.length}개 | 
        완료: {todos.filter(t => t.completed).length}개 | 
        남은 일: {todos.filter(t => !t.completed).length}개
      </div>
    </div>
  );
}

export default TodoApp;