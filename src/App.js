import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component{

  id=3

  state={
    input : '',
    todos : [
      {id : 0, text : '리액트 소개', checked: false},
      {id : 1, text : '리액트 소개', checked: true},
      {id : 2, text : '리액스 소개', checked: false}
    ]
  }

  handleChange = (e) => {
    this.setState({
      input : e.target.value //input의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const {input, todos} = this.state;

    let arrayOne = [];
    let arrayTwo = arrayOne.concat(1);
    console.log(arrayOne === arrayTwo); //false

    let array = [{value:1}, {value:2}];
    let nextArray = array;
    nextArray[0].value = 10;
    console.log(array === nextArray) //true

    this.setState({
      input : '', //input 비우고
      //concat을 사용하여 배열에 추가
      todos : todos.concat({
        id : this.id++,
        text : input,
        checked : false
      })
    });
  }

  handleKeyPress = (e) => {
    //enter누르면 handleCreate 호출
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const{todos} = this.state;

    //파라미터로 받은 id를 가지고 몇번째 아이템인지 찾기
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; //선택한 객체

    this.setState({
      todos:[
        ...todos.slice(0, index),
        {...selected, checked: !selected.checked},
        ...todos.slice(index+1, todos.length)
      ]
    });

    const nextTodos = [...todos]; //배열을 복사

    //기존 값들을 복사하고 checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked : !selected.checked
    };
    this.setState({
      todos : nextTodos
    });
  }

  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos : todos.filter(todo => todo.id !== id)
    });
  }

  render(){
    const {input, todos} = this.state;
    const{
      handleChange, handleCreate, handleKeyPress, handleToggle, handleRemove
    } = this;

    return(
      <TodoListTemplate form={(
        <Form
          value = {input}
          onKeyPress = {handleKeyPress}
          onChange = {handleChange}
          onCreate = {handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;
