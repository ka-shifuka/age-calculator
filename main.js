const ageCalculate = () => {
  const inpuDate = new Date(document.querySelector("#date").value);
  const today = new Date();

  const birthDate = {
    year: inpuDate.getFullYear(),
    month: inpuDate.getMonth() + 1,
    day: inpuDate.getDate(),
  };

  let thisYear = today.getFullYear();
  let thisMonth = today.getMonth() + 1;
  let thisDay = today.getDate();

  // validate
  if (!birthDate.year || !birthDate.month || !birthDate.day) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Date is not filled! please enter valid date",
    });
    return;
  }

  // calculate
  let year = thisYear - birthDate.year;
  let month, day;

  if (birthDate.month > thisMonth) {
    year--;
    month = 12 - (birthDate.month - thisMonth);
  } else {
    month = thisMonth - birthDate.month;
  }

  if (birthDate.day > thisDay) {
    month--;
    if (month == -1) {
      month = 12;
      year--;
    }
    let lastMonth = thisMonth == 1 ? 12 : thisMonth--;
    let dayInlastMonths = getDayInMonth(lastMonth, thisYear);
    day = dayInlastMonths - (birthDate.day - thisDay);
  } else {
    day = thisDay - birthDate.day;
  }

  //validate
  if (year < 0 || month < 0 || day < 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Is future day!",
    });
    return;
  }

  template("#year", year);
  template("#month", month);
  template("#day", day);
};

function getDayInMonth(month, year) {
  const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
  const day = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return day[month - 1];
}

function template(elem, value) {
  document.querySelector(elem).innerText = value;
}
