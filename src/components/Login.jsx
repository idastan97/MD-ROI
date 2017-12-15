//страница логин для админа
import React from 'react';
import axios from 'axios';

class Login extends React.Component{
    constructor(props){
      super(props);
      this.state={
          username: "",
          password: "",
          message: ""
      };
    }

    handleChangeUsername(event){
        this.setState({username: event.target.value});
    }

    handleChangePassword(event){
        this.setState({password: event.target.value});
    }

    handleSubmit(){
      var outerThis = this;
        axios.post('/api/login',{
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            if(res.data==='ok'){
              this.props.loginFunc();
            }
        }).catch(function(err){
            outerThis.setState({message: "Incorrect username or password"});
        });
    }

    render() {
        return (
            <div className = "panel text-center">
              <div className='form-group'>
                <input onChange={this.handleChangeUsername.bind(this)} type="text" placeholder = "Username"/>
              </div>
              <div className='form-group'>
                <input onChange={this.handleChangePassword.bind(this)} type="password" placeholder = "Password"/>
              </div>
              <div className='form-group'>
                <button onClick={this.handleSubmit.bind(this)}>Log in</button>
              </div>
                <p className="message">{this.state.message}</p>
            </div>
        );
    }
};

export default Login;
