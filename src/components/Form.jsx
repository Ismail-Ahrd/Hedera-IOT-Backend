import React, { useState } from 'react'
import {Input,Button} from "@nextui-org/react";
import axios from 'axios';

const Form = () => {
  const [name,setName]=useState("")
  const [type,setType]=useState("")
  const [serie,setSerie]=useState("")
  const [marque,setMarque]=useState("")

  const submitForm=(e)=>{
    e.preventDefault()
    const data={name:name.target.value,type:type.target.value,serie:serie.target.value,marque:marque.target.value}
    console.log(data);
    axios.post('http://localhost:3000/nft',data)
    .then(response => {
      console.log('POST request successful');
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <form className='w-[500px] flex flex-col gap-6 bg-slate-400 px-10 py-6 rounded-lg shadow-2xl ' onSubmit={submitForm}>
      <h3 className='font-bold text-xl text-white '>Add Device Form</h3>
      <Input type="text" variant={"bordered"} label="Name" onChange={setName}  />
      <Input type="text" variant={"bordered"} label="Type" onChange={setType}  />
      <Input type="text" variant={"bordered"} label="Serie" onChange={setSerie}/>
      <Input type="text" variant={"bordered"} label="Marque" onChange={setMarque} />
      <div className='flex justify-end'>
        <Button className='px-10 py-4 text-gray-800' type='submit'>  Submit</Button>
      </div>
    </form>
  )
}


export default Form