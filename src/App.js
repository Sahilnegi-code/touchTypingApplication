import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
function App() {
const [input , setInput] = useState('');
const [startTime , setStartTime ] = useState(null);
const [endTime , setEndTime] = useState(null);
const [showAccuracy , setShowAccuracy]  = useState(false);
const [exercise , setExercise] = useState('');
const [correctKeys , setCorrectKeys] = useState(0);
const [count , setCount] = useState(0);
const [start, setStart] = useState(false);
console.log(correctKeys);
console.log(showAccuracy);
const generateExercise = () =>{
  const keys = 'asdfjkl;'
  const index = Math.floor(keys.length * Math.random());
  const val = keys[index];
setExercise(val);
}
const calcSpeed = ()=>{
  if(startTime && endTime){
console.log(startTime , endTime);
    const elapsedTime = (endTime -startTime)/1000;
    
    const convertInMinute = Math.floor(elapsedTime / 60);
    console.log(convertInMinute);
    console.log(correctKeys);
    const noOfKeysPerMinute =  Math.floor( correctKeys/convertInMinute);
    return noOfKeysPerMinute;
  }
return 0;
}

const handleInputChange = (e)=>{
  
  setCount(count+1);
  const value = e.target.value;
  setInput(value);
 
  if( value === exercise ){
// console.log(input , )
setCorrectKeys((prev)=> prev + exercise.length);
    
    generateExercise();
  }
  
  setTimeout(()=>{
    setInput('');
  },1000);
} 
const calculateAccuracy = () =>{
  return count === 0 ? 0 : Math.floor( (correctKeys / count) * 100 ); 
}
useEffect(()=>{
  generateExercise();
},[]);

  return (
    <div className="App">

      <div className='contain'>

<div className='main'>
<h1 style ={{color:'white', marginBottom:'30px' , textAlign:'center'}}>Touch Typing Application</h1>
      <p style={{color:'white' , textAlign: 'center' , fontSize:'20px'}}>Type the following keys</p>
      <h2 style={{fontSize :'50px' , textAlign:'center' , color :'yellow'}} > {exercise}</h2>
      <input className ="input" type="text"  value={input} onChange={handleInputChange} />
      <p style={{textAlign : 'center'  ,  fontSize : '17px' ,color :'white' ,
      margin : '20px'
    }}> Accuracy : { showAccuracy ?    calculateAccuracy()  : "0" }%  </p>
      <p style={{textAlign : 'center' , fontSize : '17px' , color : 'white' }}>Speed : {  showAccuracy  ? calcSpeed()   : "00" } Wpm</p>
     
      <p  style={{textAlign : 'center' ,color :'white' ,fontSize : '17px'}}>
        Time   { ` - `}
      {

        start ?  (
          <Timer minutes={5} setEndTime={setEndTime} setShowAccuracy={setShowAccuracy}/>
        )  : "05.00"

      }

      </p>
      <div style = {{textAlign :'center' , marginBottom :'12px'}}>
      <button style={{textAlign : 'center'}} className='btn btn-lg btn-success' onClick={() =>{
          setStartTime(Date.now());
          setStart(true);  
      } }>start</button>

      </div>
      
</div>
    
      </div>
    
    </div>
  );
}
const Timer = ({minutes, setEndTime , setShowAccuracy }) =>{
const [second , setSecond ] = useState(60*minutes);

useEffect(()=>{
  let time = null ;
  if( second > 0){
      time = setTimeout(()=>{
        setSecond((prev )=>prev-1);
      }, 1000);
  }
  else{
    setShowAccuracy(true);
    setEndTime(Date.now());
    
  }
  return ()=>{

    clearTimeout(time);
  }
}
,[second,setEndTime, setShowAccuracy])
return (
<>

{Math.floor(second/60) } : { second % 60 < 10 ? "0" : ""  }{ second % 60 }

</>


)


}
export default App;
