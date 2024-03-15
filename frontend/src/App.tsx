import { useState } from 'react'
import './App.css'

interface Summary{
  title:string,
  summary:string,
}

function App() {
  let [currURLsummary,setSummary]=useState<Summary|undefined>(undefined);
  let [url,setUrl]=useState<string>("");
  let [loading,setLoading]=useState<boolean>(false);
  return (
    <>
      <div className='main'>
        <h2>Get Summaries of Wikipedia Pages.</h2>
      <input type="text" name="inputURL" id="inputURL" onChange={(event)=>{setUrl(event.target.value)}} placeholder="Enter wiki URL for which you need summary"/>
      <button type="button" onClick={async ()=>{
        setSummary(undefined)
        setLoading(true)
        try{
          let response=await fetch('http://localhost:3000/',{
            method:'POST',
            headers:{
              'Content-type':'application/json',
            },
            body:JSON.stringify({'url':url})
          },
          )
          let data=await response.json()
          console.log(data)
          let m:Summary={
            title:data.title,
            summary:data.summary
          }
          setSummary(m)
        }catch(e){
          console.log(e)
        }
        setLoading(false)
      }}>Submit</button>
      <div className="summary-container" style={{visibility:currURLsummary===undefined?'hidden':'visible'}}>
        <h2>{currURLsummary?.title}</h2>
        <p>{currURLsummary?.summary}</p>
      </div>
      <div className="loading-container" style={{visibility:loading===true?'visible':'hidden'}}>
        Loading
      </div>
      </div>
    </>
  )
}

export default App
