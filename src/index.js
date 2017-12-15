import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx';
import Login from './components/Login.jsx';
import Admin from './components/Admin.jsx';
import axios from 'axios';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

class Index extends React.Component{
  constructor(props){
    super(props);
    this.state={
      auth: "" //авторизован или нет, стейт для этого
    }
  }
  login(){
    this.setState({auth: 'logged'}); //функция для логина
  }
  componentWillMount(){
    //проверяем сессию админа
    axios.get('/api/checksession',{
        }).then((res) => {
            this.setState({auth: res.data}); //ответ от сервера logged или notlogged
        });
  }
  render(){
    if (this.state.auth==='logged'){ //есл логгед то все ок
      return (
        <Router history={browserHistory}>
          <Route path='/' component={Main} />
          <Route path='/admin' component={Admin} />
        </Router>
      );
    } else if (this.state.auth==='notlogged'){ // если нотлоггед то запускаем логин страницу
      return <Login loginFunc={this.login.bind(this)} />;
    } else { //если пусто то значит ответа еще нет, ждем ответа сервера
      return <p>Loading...</p>;
    }

  }
}

ReactDOM.render( <Index />, document.getElementById('root'));
