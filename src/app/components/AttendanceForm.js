'use client'
import { useState } from 'react'
import { NumberInput,Select,Container, TextInput, Text, Button, Loader, PasswordInput } from '@mantine/core'
import Swal from 'sweetalert2'
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
    const [idealVisibility,setidealVisibility] = useState(false);
    const [currentcredits,setcurrentcredits] = useState(0);
    const [currenttotalcredits,setcurrenttotalcredits] = useState(0);
    const [ideallastdate,setideallastdate] = useState(0);
    const [numberOfDaysMoreToAttend,setnumberOfDaysMoreToAttend] = useState(0);
    const [currentpercentage,setcurrentpercentage] = useState(0);
    const [remainingdays,setremainingdays] = useState(0);
    const [maxfutureattendance,setmaxfutureattendance] = useState(0);
    const [idealattendance,setidealattendance] = useState(0)

    const handleSubmit = (event) =>{
        event.preventDefault();
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
        else{
            let res = algorithm([credits,totalcredits,course,parseInt(dateinformat)])
            setideallastdate(res.ideallastdate);
            setnumberOfDaysMoreToAttend(res.numberOfDaysMoreToAttend);
            setcurrentpercentage(res.percentage)
            setremainingdays(res.remainingdays);
            setmaxfutureattendance(res.maxfutureattendance)
            setidealattendance(res.idealattendance)
            if(maxfutureattendance>80){
                setidealVisibility(true)
            }
            else{
                setidealVisibility(false)
            }

            setVisibility(true);
            setcurrentcredits(res.credits)
            setcurrenttotalcredits(res.totalcredits)
    
        }   
    }
    let idealdate = ""+ideallastdate[0]+ideallastdate[1]
    let idealmonth = ""+ideallastdate[2]+ideallastdate[3]
    let idealyear = ""+ideallastdate[4]+ideallastdate[5]+ideallastdate[6]+ideallastdate[7]

    
    return(
        <div>
            <h1 style={{display:'flex',justifyContent:'center'}}>Attendance Helper</h1>
            <h3 style={{display:'flex',justifyContent:'center'}}>Today's date is: {date} {month} {year}, {day}</h3>
            <Container 
            style={{border:'1px solid black',height:'100%',width:'60wh',display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:'10px',flexDirection:'column'}}>
                <form>
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
                        <label htmlFor='course' style={{marginTop:'10px'}}>Course</label>

                    </Text>
                    <Select
                        style={{marginTop:'10px'}}
                        value={course}
                        data={["IHS121","ICS121","ICS122","ICS123","IMA121","IEC121"]}
                        defaultValue="IHS121"
                        onChange={(option)=>setCourse(option)}
                        clearable
                    />

                    <Button onClick={handleSubmit} style={{marginTop:'20px',marginBottom:'20px'}}>View Analysis</Button>
                </form>
                <div style={visibility?{display:'block'}:{display:'none'}}>
                    <h1><u>Your Result:</u></h1>
                    <h3>Your Current Credits: {currentcredits}</h3>
                    <h3>Your Current Total Credits: {currenttotalcredits}</h3>
                    <h3>Your Current Attendance percentage: {currentpercentage}%</h3>
                    <h3>Number of Remaining Days: {remainingdays}</h3>
                    <h3>Your maximum future attendance: {maxfutureattendance}%</h3>
                    <div style={idealVisibility?{display:'block'}:{display:'none'}}>
                        <h2><u>Just to reach 80%:</u></h2>
                        <h3>Attendance: {idealattendance}%</h3>
                        <h3>Number of lectures more to attend: {numberOfDaysMoreToAttend}</h3>
                        <h3>Ideal Last Date: {idealdate} {monthsArray[idealmonth-1]} {idealyear}</h3>
                    </div>
                </div>
            </Container>
            <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
            <p>Disclaimer: The analysis shown may be innaccurate. Don't completely rely on this tool.</p>
            <p style={{marginTop:'0px'}}>Made by Harsh. <a href = "https://github.com/HarshIyer/attendance-helper">Github</a></p>
            </div>
        </div>
    )
}


export default AttendanceForm