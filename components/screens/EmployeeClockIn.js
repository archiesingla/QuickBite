import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "../styles/EmployeeClockIn";

const EmployeeClockIn = ({ navigation }) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toDateString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    resetClock();
  }, []);

  const handleClockIn = () => {
    setStartTime(new Date());
    setClockedIn(true);
    setEndTime(null);
    setHoursWorked(null);
  };

  const handleClockOut = () => {
    if (!startTime) return;
    
    const now = new Date();
    const diff = (now - startTime) / 3600000;
    setEndTime(now);
    setHoursWorked(diff.toFixed(2));
    setClockedIn(false);
    
    setTimeout(resetClock, 3000);
  };

  const resetClock = () => {
    setClockedIn(false);
    setStartTime(null);
    setEndTime(null);
    setHoursWorked(null);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.jpeg")} />
      <Text style={styles.name}>Dummy</Text>
      <Text style={styles.title}>{currentTime}</Text>
      
      {!clockedIn ? (
        <TouchableOpacity style={styles.employeeButton} onPress={handleClockIn}>
          <Text style={styles.buttonText}>Clock In</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.status}>Clocked In</Text>
          <Text style={styles.date}>{currentDate}</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Clock In Time</Text>
              <Text style={styles.tableHeader}>Clock Out Time</Text>
              <Text style={styles.tableHeader}>Hours Worked</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableData}>{startTime ? startTime.toLocaleTimeString() : "--"}</Text>
              <Text style={styles.tableData}>{endTime ? endTime.toLocaleTimeString() : "--"}</Text>
              <Text style={styles.tableData}>{hoursWorked ? `${hoursWorked} hrs` : "--"}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.employeeButton} onPress={handleClockOut}>
            <Text style={styles.buttonText}>Clock Out</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("SigninEmployees")}>
        <Text style={styles.optionText}>Back to Employee's Home Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmployeeClockIn;
