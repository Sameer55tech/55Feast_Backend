// const today = new Date();
// console.log(today);
// console.log(today - 1);

// const currentDate = new Date();
// const year = currentDate.getFullYear();
// const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
// const day = String(currentDate.getDate()).padStart(2, "0");
// const weekDay = String((currentDate - 1).getDay() - 2).padStart(2, "0");

// const formattedDate = `${year}-${month}-${day} ${weekDay}`;
// console.log(formattedDate); // Output: 2023-06-27

const getLastFiveDays = () => {
  const result = [];
  const currentDate = new Date(); // Get the current date
  console.log(new Date("2023-07-11"));
  // Iterate for the last five days
  for (let i = 0; result.length < 5; i++) {
    const day = new Date("2023-07-11");
    day.setDate(day.getDate() - i); // Subtract 'i' days from the current date

    // Check if the day is not Saturday (6) or Sunday (0)
    if (day.getDay() !== 6 && day.getDay() !== 0) {
      result.push(day.toISOString().split("T")[0]); // Format and push the date to the result array
    }
  }

  return result;
};

const lastFiveDays = getLastFiveDays();
console.log(lastFiveDays);
