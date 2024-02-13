'use client'
import { useState } from 'react'
import { NumberInput,Select,Container, TextInput, Text, Button, Loader, PasswordInput } from '@mantine/core'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { algorithm } from './Algorithm'


const AttendanceForm = () =>{
    const dateMega = new Date();
    let date = dateMega.getDate();
    const dateArray=['Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday']
    let day = dateArray[dateMega.getDay()];
    let year = dateMega.getFullYear();
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let month = monthsArray[dateMega.getMonth()];
    let dateinformat = ''
    if(dateMega.getDate()<10){
        if(dateMega.getMonth()<10){
            dateinformat = '0'+date+"0"+(dateMega.getMonth()+1)+year 
        }
        else{
            dateinformat = '0'+date+(dateMega.getMonth()+1)+year 
        }
    }
    else{
        if(dateMega.getMonth()<10){
            dateinformat = ''+date+"0"+(dateMega.getMonth()+1)+year 
        }
        else{
            dateinformat = ''+date+(dateMega.getMonth()+1)+year 
        }
    }
    
    const [credits,setCredits] = useState(0)
    const [totalcredits,setTotalCredits] = useState(0)
    const [course,setCourse] = useState('')
    const [visibility,setVisibility] = useState(false)
    const [currentcredits,setcurrentcredits] = useState(0);
    const [currenttotalcredits,setcurrenttotalcredits] = useState(0);
    const [ideallastdate,setideallastdate] = useState(0);
    const [numberOfDaysMoreToAttend,setnumberOfDaysMoreToAttend] = useState(0);
    const [currentpercentage,setcurrentpercentage] = useState(0);
    const [remainingdays,setremainingdays] = useState(0);
    const [maxfutureattendance,setmaxfutureattendance] = useState(0);
    const [idealattendance,setidealattendance] = useState(0)
    const [datefuture,setdatefuture] = useState('')
    const [maxearnablecredits,setmaxearnablecredits] = useState(0)
    const EightyAttendance = () => {
        if(maxfutureattendance>80){
        return (
          <div style={{textAlign:'center'}}>
            <h1>
              <u>Analysis Result:</u>
            </h1>
            <h3>Your Current Credits: {currentcredits}</h3>
            <h3>Your Current Total Credits: {currenttotalcredits}</h3>
            <h3>Your Current Attendance percentage: {currentpercentage}%</h3>
            <h3>Number of Remaining Days in this semester: {remainingdays}</h3>
            <h3>Number of Remaining lectures: {maxearnablecredits/2}</h3>
            <h3>Your maximum future attendance: {maxfutureattendance}%</h3>
              <h2>
                <u>Just to keep above 80%:</u>
              </h2>
              <h3>Final Attendance: {idealattendance}%</h3>
              <h3>Number of lectures more to attend: {numberOfDaysMoreToAttend}</h3>
              <h3>
                Ideal Last Date: {idealdate} {monthsArray[idealmonth - 1]} {idealyear} (May vary depending on batch)
              </h3>
          </div>
        );
        }
        else{
            return(
                <div style={{textAlign:'center'}}>
                    <h3>Your max reachable attendance is: {maxfutureattendance}%</h3>
                    <h3>You will have to pay fine. Fine amount will be updated soon.</h3>
                </div>
            )
        }
      };
      

    const handleSubmit = (event) =>{
        // event.preventDefault();
        if(credits==0||totalcredits==0){
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Credits can't be 0!",
              });
        }
        else if(course == ''){
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Course cannot be empty!",
                footer: '<p>Select a course.</p>'
              });
        }
        else if(credits<0||totalcredits<0){
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Credits can't be negative!",
              });
        }
        else if(credits>150||totalcredits>150){
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Credits can't be that high!",
              });
        }
        else if(credits>totalcredits){
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Current credits cant exceed total credits!",
              });
        }
        else{
            let res = algorithm([credits,totalcredits,course,parseInt(dateinformat)])
            setideallastdate(res.ideallastdate);
            setnumberOfDaysMoreToAttend(res.numberOfDaysMoreToAttend);
            setcurrentpercentage(res.percentage)
            setremainingdays(res.remainingdays);
            setmaxfutureattendance(res.maxfutureattendance)
            setidealattendance(res.idealattendance)
            setVisibility(true);
            setcurrentcredits(res.credits)
            setcurrenttotalcredits(res.totalcredits)
            setdatefuture ( res.datefuture)
            setmaxearnablecredits(res.maxearnablecredits)
    
        }   
    }
    let idealdate = ""+ideallastdate[0]+ideallastdate[1]
    let idealmonth = ""+ideallastdate[2]+ideallastdate[3]
    let idealyear = ""+ideallastdate[4]+ideallastdate[5]+ideallastdate[6]+ideallastdate[7]

    
    return(
        <div>
            <div style={{textAlign:'center'}}>
            <h1 style={{display:'flex',justifyContent:'center'}}>Attendance Assistant</h1>
            <h3 style={{display:'flex',justifyContent:'center'}}>Today is {day}, {date} {month} {year}</h3>
            </div>
            <Container 
            style={{transition:'0.5s auto',border:'1px solid black',height:'100%',width:'60wh',display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:'10px',flexDirection:'column'}}>
                <form>
                    <Text style={{marginTop:'10px',fontWeight:'600'}}>Formula for Credits: Lectures x 2</Text>
                    <Text style={{marginTop:'10px'}}>
                    <label htmlFor='credits' style={{marginTop:'10px'}}>Enter Current Credits:</label>
                    </Text>
                    <NumberInput 
                    value={credits}
                    id="credits"
                    onChange={setCredits}
                    style={{marginTop:'10px'}}/>
                    
                    <Text style={{marginTop:'10px'}}>
                    <label htmlFor='totalcredits' style={{marginTop:'10px'}}>Enter Total Credits:</label>
                    </Text>
                    <NumberInput type="number" 
                    value={totalcredits}
                    id="totalcredits"
                    onChange={setTotalCredits}
                    style={{marginTop:'10px'}} />

                    <Text style={{marginTop:'10px'}}>
                        <label htmlFor='course' style={{marginTop:'10px'}}>Select Course:</label>

                    </Text>
                    <div style={{transition:'none'}}>
                    <Select
                        style={{marginTop:'10px',transition:'none'}}
                        value={course}
                        data={["IHS121 (Personality Development)","ICS121 (Data Structures)","ICS122 (Computer Organization)","ICS123 (IT Workshop)","IMA121 (Calculus and Algebra)","IEC121 (Digital Design and Electric Circuits)"]}
                        defaultValue="IHS121"
                        onChange={(option)=>setCourse(option)}
                        clearable
                    />
                    </div>
                    <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                    <Button onClick={handleSubmit} style={{marginTop:'20px',marginBottom:'20px'}}>View Analysis</Button>
                    </div>
                </form>
                <div style={visibility?{display:'block'}:{display:'none'}}>
                    <EightyAttendance />
                </div>
            </Container>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',textAlign:'center'}}>
            <div>
            <p>Disclaimer: The analysis shown may be innaccurate. Don't completely rely on this tool.</p>
            </div>
            <p style={{marginTop:'0px',textAlign:'center'}}>Made by Harsh. <a href = "https://github.com/HarshIyer/attendance-helper">Github</a></p>
            </div>
        </div>
    )
}


export default AttendanceForm