import React, {Component} from "react"
import "./App.css"


class App extends Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            zipcode: "",
            title: "",
            comments: "",
            isFacebook: false,
            isGoogle: false,
            isYelp: false,
            error:"",
            error2:"",
            error3:"",
            error4:"",
            error5:"",
            error6:"",
            error7:"",
            error8:"",
            valid: true
        }
        this.handleChange = this.handleChange.bind(this)
        
    }
    
    handleSubmit(e){
        e.preventDefault();
        if(!this.isValidForm()){
            
                this.setState({
                }) 
        }else{
            alert("Submit successfully!");
        };
        
    }

    
    isValidForm(){
        let formIsValid = true;
        if(this.state.firstName === ""){
            this.state.error = "  Please input your firstname"
            formIsValid = false;
            
        }

        if(this.state.lastName === ""){
            this.state.error2 = "  Please input your lastname"
            formIsValid = false;
            
        }

        if(this.state.title === ""){
            this.state.error8 = "  Please select a title"
            formIsValid = false;
           
        }
        
        if(this.state.comments === ""){
            this.state.error6 = "  Please input a comment"
            formIsValid = false;
            
        }
        
        var emailRegExp = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);   
            if( !emailRegExp.test(this.state.email)){
              this.state.error3 = "  Invalid Email Address"
              formIsValid = false;
            }

            var telRegExp = /\d{3}-\d{3}-\d{4}/ ;   
            if( !telRegExp.test(this.state.phoneNumber)){
              this.state.error4 = "  Invalid Phone Number!"
              formIsValid = false;
            }
            var zipRegExp = new RegExp( /[0-9]{6}/);  
            if( !zipRegExp.test(this.state.zipcode)){
              this.state.error5 = "  Invalid Zipcode"
              formIsValid = false;

            }
           
            if(!this.state.isFacebook && !this.state.isGoogle && !this.state.isYelp){
                this.state.error7 = "  Please select one";
                formIsValid = false;
            }
        return formIsValid;

        
    }

    handleChange(event) {
      
    const {name, value, type, checked}  = event.target
    switch(name){
          case "firstName":
        if( value  ===""){
              this.state.error = "  Please input your firstname!"
              this.state.valid = false;
        }else if( value  !==""){
              this.state.error = ""
              this.state.valid = true;
        }
         break;

        case "lastName":
            if( value  ===""){
              this.state.error2 = "  Please input your lastname!"
              this.state.valid = false;
        }else if( value  !==""){
              this.state.error2 = ""
              this.state.valid = true;
        }
        break;

        case "email":
            var emailRegExp = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);   
            if( !emailRegExp.test(value)){
              this.state.error3 = " Invalid Email Address"
              this.state.valid = false;
            }else if( emailRegExp.test(value)){
              this.state.error3 = ""
              this.state.valid = true;
            }
        break;

        case "phoneNumber":
            var telRegExp = /\d{3}-\d{3}-\d{4}/ ;   
            if( !telRegExp.test(value)){
              this.state.error4 = " Invalid Phone Number!"
              this.state.valid = false;
            }else if( telRegExp.test(value)){
              this.state.error4 = ""
              this.state.valid = true;
            }
        break;

        case "zipcode":
            var zipRegExp = new RegExp( /[0-9]{6}/);  
            if( !zipRegExp.test(value)){
              this.state.error5 = " Invalid Zipcode!"
              this.state.valid = false;
            }else if( zipRegExp.test(value)){
              this.state.error5 = ""
              this.state.valid = true;
            }
        break;

        case "comments":
              
         if(value  ===""){
                this.state.error6 = "  Please input a comment!"
                this.state.valid = false;
          }else if( value  !==""){
                this.state.error6 = ""
                this.state.valid = true;
          }
        break;

        case "title":
              
         if(value===""){
            this.setState({
                  error8: "  Please select a title!"
             })
                this.state.valid = false;
          }else if( value !== ""){
            this.setState({
                error8: ""
           })
                this.state.valid = true;
          }
        break;

        case "isFacebook":
                if((this.state.isFacebook) && (!this.state.isGoogle) && (!this.state.isYelp)){
                    
                    this.state.error7 = "  Please select one!"
                    this.state.valid = false;
                   }else{
                    this.state.error7 = ""
                    this.state.valid = true;
                   }
                break;
        case "isGoogle":
             if((!this.state.isFacebook) && (this.state.isGoogle) && (!this.state.isYelp)){
                            
                  this.state.error7 = "  Please select one!"
                  this.state.valid = false;
                }else{
                    this.state.error7 = ""
                    this.state.valid = true;
               }
              break;  
         case "isYelp":
               if((!this.state.isFacebook) && (!this.state.isGoogle) && (this.state.isYelp)){
                    
                 this.state.error7 = "  Please select one!"
                 this.state.valid = false;
             }else{
                    this.state.error7 = ""
                    this.state.valid = true;
            }
             break;      
      }
       
       type === "checkbox" ? 
            this.setState({
                [name]: checked
                
            })
        :
        this.setState({
            [name]: value
        }) 

        
      
    }
    
    render() {
        return (
          <div id="container"> 
          
            <main>
            <h2>Feeback</h2>
            <h3>Love something? Hate something? Let us know!</h3>
		             Note : Fields marked with an asterisk(*) are mandatory
            <br />
            <br />     
                <form method="post" onSubmit={(e) => this.handleSubmit(e)}>
                <label>Title*:
                        <input type="radio" name="title" value="Miss" checked={this.state.title === "Miss"} onChange={this.handleChange}/> Miss
                    </label>                     
                    <label>
                        <input type="radio" name="title" value="Mr" checked={this.state.title === "Mr"} onChange={this.handleChange}/> Mr
                    </label>

                    <label>
                        <input type="radio" name="title" value="Mrs" checked={this.state.title === "Mrs"} onChange={this.handleChange}/> Mrs
                    </label>
                    <span>{this.state.error8}</span>
                    <br />
                    <br />
                    FirstName*: <input 
                        name="firstName" 
                        value={this.state.firstName} 
                        onChange={this.handleChange}
                        onBlur={this.handleChange} 
                        placeholder="First Name" 
                    />
                    <span>{this.state.error}</span>
                    <br />
                    <br /> 
                    LastName*:<input 
                        name="lastName" 
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        onBlur={this.handleChange}  
                        placeholder="Last Name" 
                    />
                    <span>{this.state.error2}</span>
                    <br />
                    <br />
                    EmailId*: <input 
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleChange} 
                        onBlur={this.handleChange} 
                        placeholder="yourname@domain.com" 
                    />

                   <span>{this.state.error3}</span>
                    <br />
                    <br />
                    Phone Number*: <input 
                        name="phoneNumber" 
                        value={this.state.phoneNumber}
                        onChange={this.handleChange} 
                        onBlur={this.handleChange}
                        placeholder="xxx-xxx-xxxx" 
                    />
                    <span>{this.state.error4}</span>
                    <br />
                    <br />
                    Zipcode*: <input 
                        name="zipcode" 
                        value={this.state.zicode}
                        onChange={this.handleChange} 
                        onBlur={this.handleChange}
                        placeholder="xxxxxx" 
                    />
                    <span>{this.state.error5}</span>
                    <br />
                    
                    <br />
                    
                    <label>How did you hear*:</label>
                    <label>
                        <input 
                            type="checkbox"
                            name="isFacebook"
                            checked={this.state.isFacebook}
                            onChange={this.handleChange}
                            
                        /> Facebook
                    </label>
                    
                    
                    <label>
                        <input 
                            type="checkbox"
                            name="isGoogle"
                            checked={this.state.isGoogle}
                            onChange={this.handleChange}
                            
                        /> Google
                    </label>
                    
                    
                    <label>
                        <input 
                            type="checkbox"
                            name="isYelp"
                            checked={this.state.isYelp}
                            onChange={this.handleChange}
                            
                        /> Yelp
                    </label>
                    <span>{this.state.error7}</span>

                    <br />
                    <br />
                    Comments*:
                    <textarea 
                    name="comments"
                    value={this.state.comments}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                    rows="5" cols="20"
                    />
                   <span>{this.state.error6}</span>
                     <br />    
                     <br />                   
                    
                     <input type="Submit" />
                     <input type="Reset" />
                </form>
               
            </main>
         </div>   
        )
    }
}

export default App
