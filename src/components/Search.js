import React from 'react'
import { useState } from 'react'
import Output from './Output';
const Search = () => {
    const [btnClick,setBtnClick]=useState(false);
    const [pincode,setPincode]=useState('');
    const [pincodeData,setPincodeData]=useState([]);
    const [errorMsg,setErrorMsg]=useState('');
    const[err,setErr]=useState(false);
    const [loading,setLoading]=useState(false);

    const handleClick = () => {
        setLoading(true); 
        if(pincode.length>=6){        
          fetch(`https://api.postalpincode.in/pincode/${pincode}`)
         .then(async res=>{
            const resData=await res.json(); 
            setPincodeData(resData[0])                   
            setBtnClick(true);
            setLoading(false);
         })
         .catch(err=>{
            setErrorMsg(err.message);
            setErr(true);
            setBtnClick(true);
            setLoading(false);
         }
         )
        } else{
            setErr(true);
            pincode.length===0 ? setErrorMsg('Pincode is not entered') :setErrorMsg('Pincode length is less than 6');
            setBtnClick(true);
            setLoading(false);
        }
      
    }
  return (
    <div>
    {!btnClick  ? (
        <div className='searchDiv'>
        <h2>Enter Pincode:</h2>
            <input
              type="number"
              placeholder="Pincode"
              onChange={(e)=>setPincode(e.target.value)}
            />
          <button onClick={handleClick}>Lookup</button>   
        {loading ?(<div className='modal'><div className='loader'></div></div>): ' '}
      </div>) : (
        <div>            
            {err ? <p>{errorMsg}</p> : <Output pincode={pincode} data={pincodeData}/>}
        </div>
      )} 
    </div>
  )
}

export default Search