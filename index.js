// Your code here
function createEmployeeRecord(employeeArray){
    
    let employee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}
function createEmployeeRecords(allEmployees){
    return allEmployees.map( (employee) => { 
        return createEmployeeRecord(employee); 
    });
}

function createTimeInEvent(emp, dateStamp){
    emp.timeInEvents.push(createEvent("TimeIn", dateStamp))
    return emp   
}

function createTimeOutEvent(emp,dateStamp){
    emp.timeOutEvents.push(createEvent("TimeOut", dateStamp))
    return emp
}
function createEvent(type, dateStamp){

    const [date, hour] = dateStamp.split(" ");

    return {
        type: type,
        hour: parseInt(hour),
        date: date
    }
}

function hoursWorkedOnDate(obj, dateYMD){
    const timeIn = obj.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn)/100
}
function wagesEarnedOnDate(obj, dateYMD){

    const wage = obj.payPerHour
    const hoursWorked = hoursWorkedOnDate(obj, dateYMD)
    return wage * hoursWorked
}

function allWagesFor(obj){
    const allWages = obj.timeInEvents.map((day) => {return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((a, b) => a + b, 0)
}

function calculatePayroll(records){
    const allPay = (records.map((empl) => {return allWagesFor(empl)}))
    return allPay.reduce((a, b) => a + b, 0)
}

function findEmployeeByFirstName(srcArray, first_Name){
    return srcArray.find((record) => record.firstName === first_Name)
}
