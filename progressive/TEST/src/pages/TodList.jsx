import './TodoList.scss';

function TodoList() {
    return (
        <div className="wrap">
            <h1 className='title'>할일 목록</h1>
            <div className="todo_wrap">
                <div className="form_wrap">
                    <div className="form-group">
                        <div className="col">
                            <label htmlFor="todo_input">새로운 할일</label>
                            <input id="todo_input" type="text" name="" className="form-control" placeholder="예: React 프로젝트 완성하기" />
                        </div>
                        <button className="btn_plus">추가</button>
                    </div>
                </div>
                <div className="list_wrap">
                    <ul className="form_wrap">
                        <li className="form-group check-buttons list_group">
                            <div className="col">
                                <label htmlFor="check-1" className="check-button">
                                    <input type="checkbox" id="check-1" name="terms" />
                                    <span className="custom-check"></span>
                                    <span className="text">React 공부하기</span>
                                </label>
                            </div>
                            <button className="btn_clear">삭제</button>
                        </li>
                        <li className="form-group check-buttons list_group">
                            <div className="col">
                                <label htmlFor="check-2" className="check-button">
                                    <input type="checkbox" id="check-2" name="terms" />
                                    <span className="custom-check"></span>
                                    <span className="text">프로젝트 만들기</span>
                                </label>
                            </div>
                            <button className="btn_clear">삭제</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoList;