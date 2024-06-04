
import InputField   from './InputField';
import SubmitButton from './SubmitButton';
import React        from 'react';
import UserStore    from './stores/UserStores';
import './App.css';

class LoginForm extends React.Component 
{
    constructor(props){
        super(props);
        this.state = {
            userame: '',
            password:'',
            buttonDisabled: false

        }
    }
    
    setInputValue(property, val){
        val = val.trim();                     // removes spaces
        if ( val.length > 12 ){
            return;
        }
        this.setState({
            [property]:val

        })

    }

    resetForm(){
        this.setState({
          username:'',
          password:'',
          buttonDisabled: false  
        })
    }

    async doLogin(){
        if(!this.state.username){
         return;
        }
        if(!this.state.password){
            return;
        }
        this.setState({
            buttonDisabled: true
        })

        try{
           
            let res = await fetch('/login',{
                method: 'post',
                headers:{
                    'Accept':'applications/json',
                    'Content-Type': 'applications/json'

                },
                body: JSON.stringify({
                    username : this.state.username,
                    password: this.state.password
                })

            });

            let result = await res.json();
            if(result && result.success){
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }

            else if( result && result.success === false){
                this.resetForm();
                alert(result.msg);
            }

        }

        catch(e){
            console.log(e);
            this.resetForm();
        }


    }

  render()
  {
    return (
        <div>
        <div>
            <img src ='src/images/Quizlogo2.png'  alt="Quiz Logo"/>
        </div>
        <br></br>
        <div className="loginForm">
          Log In
            <InputField 
                type = "text" 
                placeholder = 'Username'  
                value = {this.state.username ? this.state.username : '' }
                onChange =  {(val) => this.setInputValue('username',val) }
                required
            />

            <InputField 
                type = "password" 
                placeholder = "Password"  
                value = {this.state.password ? this.state.password : '' }
                onChange =  {(val) => this.setInputValue('password',val) }
                required
            />    

            <SubmitButton
                text = "Login"
                disabled = {this.state.buttonDisabled}
                onClick = {() => this.doLogin()} 
            />
        
        </div>

        </div>
    );
  }
}

export default LoginForm;
