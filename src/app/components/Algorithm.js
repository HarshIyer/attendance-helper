import { rem } from "@mantine/styles"

export function algorithm(props){
    console.log(props)
    let credits = props[0]
    let totalcredits = props[1]
    let course = props[2]
    let date = props[3]
    
    let percentage = ((credits/totalcredits)*100).toFixed(2);
    let dateArray = [
        '01012024', '02012024', '03012024', '04012024', '05012024',
        '08012024', '09012024', '10012024', '11012024', '12012024',
        '15012024', '16012024', '17012024', '18012024', '19012024',
        '22012024', '23012024', '24012024', '25012024', '26012024',
        '29012024', '30012024', '31012024', '01022024', '02022024',
        '05022024', '06022024', '07022024', '08022024', '09022024',
        '12022024', '13022024', '14022024', '15022024', '16022024',
        '19022024', '20022024', '21022024', '22022024', '23022024',
        '26022024', '27022024', '28022024', '29022024', '01032024',
        '04032024', '05032024', '06032024', '07032024', '08032024',
        '11032024', '12032024', '13032024', '14032024', '15032024',
        '18032024', '19032024', '20032024', '21032024', '22032024',
        '25032024', '26032024', '27032024', '28032024', '29032024',
        '01042024', '02042024', '03042024', '04042024', '05042024',
        '08042024', '09042024', '10042024', '11042024', '12042024',
        '15042024'
    ]
    let dateMega = new Date();



    let todayDateIndex = 0
    let flag = 0;
    for(let i=0;i<dateArray.length;i++){
        if(parseInt(date)==parseInt(dateArray[i])){
            todayDateIndex=i;
            flag=1;
            break;
        }
    }
    let datefuturenum=dateMega.getDate();
    let weekendflag=0;
    if(flag==0){
        let day = dateMega.getDay();
        if(day==0){
            datefuturenum = datefuturenum+1; 
            weekendflag=1;
        }
        else if(day==6){
            datefuturenum = datefuturenum+2;
            weekendflag=1; 
        }

    }
    let monthformatted = ""

    if(dateMega.getMonth()<10){
        monthformatted="0"+(dateMega.getMonth()+1);
    }
    else{
        monthformatted=""+(dateMega.getMonth()+1);
    }


    let datefuture = ""+ datefuturenum + monthformatted + dateMega.getFullYear();

    for(let i=0;i<dateArray.length;i++){
        if(dateArray[i]==datefuture){
            todayDateIndex=i;
            flag=1;
        }
    }
    
    let remainingdays = dateArray.length-todayDateIndex;


    let maxearnablecredits = 0;
    if(course == "IHS121"){
        maxearnablecredits = Math.floor(remainingdays*1/5);
    }
    else if (course == "IMA122"||course == "ICS122"||course == "ICS123"){
        maxearnablecredits = Math.floor(remainingdays*4/5)
    }
    else if(course == "IEC121"|| course=="ICS121"){
        maxearnablecredits = Math.floor(remainingdays*5/5)
    }
    if(maxearnablecredits%2!=0){
        maxearnablecredits--;
    }
    let maxfuturecredits = credits+maxearnablecredits;
    let maxfuturetotalcredits = totalcredits+maxearnablecredits;
    let maxfutureattendance = (maxfuturecredits/maxfuturetotalcredits*100).toFixed(2)

    let numberOfDaysMoreToAttend = 0;
    let maxfuturecreditsCopy = parseInt(maxfuturecredits)
    let creditscopy = credits
    let message = ""
    if(maxfutureattendance<=80){
        numberOfDaysMoreToAttend=remainingdays;
        message = "You have to attend all days!"
    }
    else {
        while((creditscopy/maxfuturetotalcredits)*100<80){
            creditscopy+=2;
            numberOfDaysMoreToAttend++;
        }   
    }
    let xyz = 0;

    if(course == "IHS121"){
        xyz=numberOfDaysMoreToAttend*5/1;
    }
    else if (course == "IMA121"||course == "ICS122"||course == "ICS123"){
        xyz = numberOfDaysMoreToAttend*5/4
    }
    else if(course == "IEC121"|| course=="ICS121"){
        xyz = numberOfDaysMoreToAttend*5/5
    }
    xyz = parseInt(xyz)
    let idealattendance = ((creditscopy/maxfuturetotalcredits)*100).toFixed(2);

    let ideallastdate = dateArray[todayDateIndex+xyz]

    if(ideallastdate==undefined){
        ideallastdate=dateArray[dateArray.length-1]
    }

      
    return(
        {
            credits:credits,
            totalcredits:totalcredits,
            percentage:percentage,
            date:date,
            remainingdays:remainingdays,
            maxfuturecredits:maxfuturecredits,
            maxfuturetotalcredits:maxfuturetotalcredits,
            maxfutureattendance:maxfutureattendance,
            numberOfDaysMoreToAttend:numberOfDaysMoreToAttend,
            idealattendance:idealattendance,
            ideallastdate:ideallastdate,
            message:message
        }
    )

}