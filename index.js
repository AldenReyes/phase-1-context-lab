/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

const createEmployeeRecord = function (employeeInfo) {
  return {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = function (employeesArray) {
  return employeesArray.map(function (employee) {
    return createEmployeeRecord.call(this, employee);
  });
};

const createTimeInEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return this;
};

const createTimeOutEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return this;
};

const hoursWorkedOnDate = function (date) {
  const timeOut = this.timeOutEvents.find(
    ({ date: timeOutDate }) => timeOutDate === date
  );
  const timeIn = this.timeInEvents.find(
    ({ date: timeInDate }) => timeInDate === date
  );
  if (timeOut && timeIn) {
    return calculateTimeFromDecimal(timeOut.hour - timeIn.hour);
  } else {
    return 0;
  }
};

const wagesEarnedOnDate = function (date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};

const findEmployeeByFirstName = function (srcArray, name) {
  return srcArray.find((key) => key.firstName === name);
};

const calculatePayroll = function (employees) {
  const employeeTotal = employees.map((employee) => allWagesFor.call(employee));
  return employeeTotal.reduce(
    (total, employeesTotal) => total + employeesTotal
  );
};

//helpers
function calculateTimeFromDecimal(decimalTime) {
  const hours = Math.floor(decimalTime / 100);
  const minutes = (decimalTime % 100) / 60;
  return hours + minutes;
}
