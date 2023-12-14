import * as React from "react";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useUserContext } from "../../../useContext/UserContext";
import getStreak from "../../../utils/getStreak";
import "./Calendar.css";

const Calendar = () => {
  const currentUser = useUserContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    const getDates = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/dates`;
      const fetchOptions = {
        credentials: "include",
        method: "GET",
      };
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setDateList(data);
      } else {
        console.log("Error fetching dates");
      }
    };
    getDates();
  }, [currentUser]);

  const currentStreak = getStreak(dateList, currentUser);

  const handleDayClick = (day) => {
    console.log("Day clicked:", day);
  };

  const handleMonthChange = (increment) => {
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth() + increment
      );
      return newMonth;
    });
  };

  return (
    <>
      <div className="calendar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            date={currentMonth}
            onDayClick={handleDayClick}
            toolbarTitle={() => (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton onClick={() => handleMonthChange(-1)}>
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <Typography variant="h6">
                  {currentMonth.toLocaleString("default", {
                    month: "long",
                  })}{" "}
                  {currentMonth.getFullYear()}
                </Typography>
                <IconButton onClick={() => handleMonthChange(1)}>
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Box>
            )}
          />
        </LocalizationProvider>
        <h3>Current Streak: {currentStreak}</h3>
      </div>
    </>
  );
};

export default Calendar;
