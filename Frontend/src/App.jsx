import {Component} from 'react'

import './App.css'

class App extends Component{
  state = {users:[],id:"",name:"",email:"",addUser:true,updateUser:false}

  componentDidMount(){
    this.getUsersDetails()
  }

  getUsersDetails = async () =>{
    const response = await fetch("http://localhost:3000/users")
    const data = await response.json()
    this.setState({users:data})
  }

  addUser = async () =>{
    const {name,email} = this.state
    const options = {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({name,email})
    }
    await fetch("http://localhost:3000/users",options)
    this.setState({name:"",email:""})
    this.getUsersDetails()
  }

  updateUser = async () => {
    const {id,name,email} = this.state
    const options = {
      method:"PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({name,email})
    }
    const url = `http://localhost:3000/users/${id}`
    await fetch(url,options)
    this.setState({id:"",name:"",email:""}) 
    this.getUsersDetails()
  }

  removeUser = async (id) => {
    const url = `http://localhost:3000/users/${id}`
    await fetch(url,{method:"DELETE"})
    this.getUsersDetails()
  }



  onChangeName = (event) => this.setState({name:event.target.value})

  onChangeEmail = (event) => this.setState({email:event.target.value})

  onChangeId = (event) => this.setState({id:event.target.value})

  onClickaddUserCheckbox = () =>{
    const {addUser} = this.state
    if(!addUser){
    this.setState(prevState => ({addUser:!prevState.addUser,updateUser:false}))
    }
  }

  onClickUpdateUserCheckbox = () =>{
    const {updateUser} = this.state
    if(!updateUser){
    this.setState(prevState => ({addUser:false,updateUser:!prevState.updateUser}))}
  }

  render(){
    const {users,id,name,email,addUser,updateUser} = this.state
    return(
      <div className='main-container'>
        <h1>User Management</h1>

        <div className='input-container'>
              <div className='checkbox-input-container'>
                <label className='checkbox-label' htmlFor="addUser" onClick={this.onClickaddUserCheckbox}>Add Users</label>
                <input className='checkbox-input' checked={addUser} onChange={this.onClickaddUserCheckbox} id="addUser" type="checkbox"/>
                <label className='checkbox-label' htmlFor="updateUser" onClick={this.onClickUpdateUserCheckbox}>Update User</label>
                <input className='checkbox-input' checked={updateUser} onChange={this.onClickUpdateUserCheckbox} id="updateUser" type="checkbox"/>
              </div>
              
              {updateUser && <div>
                <label className='text-label-element' htmlFor="name">Id :</label>
                <input className="text-input" id="name" type="text" value={id} placeholder='Enter Id' onChange={this.onChangeId}/>
              </div>}


              <div>
                <label className='text-label-element' htmlFor="name">Name :</label>
                <input className="text-input" id="name" type="text" value={name} placeholder='Enter Name' onChange={this.onChangeName}/>
              </div>
              

              <div>
                <label className='text-label-element' htmlFor="email">Email :</label>
                <input className="text-input" id="email" type="text" value={email} placeholder='Enter Email' onChange={this.onChangeEmail}/>
              </div>

              {addUser && <button className="user-button" type="button" onClick={this.addUser}>Add User</button>}

             {updateUser &&  <button className="user-button" type="button" onClick={this.updateUser}>Update User</button>}
        </div>

        <ul className="users-unorder-list-container">
          <li className='users-list-item'>
            <p className='id-list-item initial-list'>ID</p>
            <p className='name-list-item initial-list'>NAME</p>
            <p className='email-list-item initial-list'>EMAIL</p>
          </li>
        {users.map(eachUserDetails => (
          <li className='users-list-item'  key={eachUserDetails.id}>
            <p className='id-list-item'>{eachUserDetails.id}</p>
            <p className='name-list-item'>{eachUserDetails.name}</p>
            <p className='email-list-item'>{eachUserDetails.email}</p>
            <button className='remove-button' type="button" onClick={()=>this.removeUser(eachUserDetails.id)}>X</button>
          </li>
        
        )
          )}
        </ul>
            
      </div>
    )
  }
}

export default App
