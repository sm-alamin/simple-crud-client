
import './App.css'
import toast, { Toaster } from 'react-hot-toast';


function App() {
 const handleAddUser = (event)=> {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const user = {name,email};
  console.log(user)
  fetch('http://localhost:5000/users',{
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res=> res.json())
  .then(data=> {
    console.log(data)
    if(data.insertedId)
    toast.success('user created successfully');
    form.reset();
  })
 }

  return (
    <>
     <h3>Simple Crud</h3>
     <form onSubmit={handleAddUser}>
      <input type="text" name="name" id="" />
      <br />
      <input type="email" name="email" id='' />
      <br />
      <input type="submit" value="Add User" />
     </form>
     <Toaster />
    </>
  )
}

export default App
