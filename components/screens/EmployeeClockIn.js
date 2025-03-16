import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/EmployeeClockIn";

const EmployeeClockIn = ({ route, navigation }) => {
  const { employeeName } = route.params || {};  // Get employee name passed from SigninEmployees

  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toDateString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load saved clock-in data from AsyncStorage
  useEffect(() => {
    const loadClockData = async () => {
      try {
        const clockInStatus = await AsyncStorage.getItem(`${employeeName}_clockedIn`);
        const savedStartTime = await AsyncStorage.getItem(`${employeeName}_startTime`);
        const savedEndTime = await AsyncStorage.getItem(`${employeeName}_endTime`);
        const savedHoursWorked = await AsyncStorage.getItem(`${employeeName}_hoursWorked`);

        if (clockInStatus === 'true' && savedStartTime) {
          setClockedIn(true);
          setStartTime(new Date(savedStartTime));
          setEndTime(savedEndTime ? new Date(savedEndTime) : null);
          setHoursWorked(savedHoursWorked);
        } else {
          resetClock();
        }
      } catch (error) {
        console.error("Error loading clock data:", error);
      }
    };

    loadClockData();
  }, [employeeName]);

  // Handle clock-in action
  const handleClockIn = async () => {
    const now = new Date();
    setStartTime(now);
    setClockedIn(true);
    setEndTime(null);
    setHoursWorked(null);

    try {
      await AsyncStorage.setItem(`${employeeName}_clockedIn`, 'true');
      await AsyncStorage.setItem(`${employeeName}_startTime`, now.toString());
      await AsyncStorage.removeItem(`${employeeName}_endTime`);
      await AsyncStorage.removeItem(`${employeeName}_hoursWorked`);
    } catch (error) {
      console.error("Error saving clock-in data:", error);
    }
  };

  // Handle clock-out action
  const handleClockOut = async () => {
    if (!startTime) return;

    const now = new Date();
    const diff = (now - startTime) / 3600000; // Calculate hours worked
    setEndTime(now);
    setHoursWorked(diff.toFixed(2));
    setClockedIn(false);

    try {
      await AsyncStorage.setItem(`${employeeName}_clockedIn`, 'false');
      await AsyncStorage.setItem(`${employeeName}_endTime`, now.toString());
      await AsyncStorage.setItem(`${employeeName}_hoursWorked`, diff.toFixed(2));
    } catch (error) {
      console.error("Error saving clock-out data:", error);
    }
  };

  // Reset clock state
  const resetClock = () => {
    setClockedIn(false);
    setStartTime(null);
    setEndTime(null);
    setHoursWorked(null);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.jpeg")} />

      <Text style={styles.name}>{employeeName || 'Employee Name'}</Text>  
      <Text style={styles.title}>{currentTime}</Text>

      <TouchableOpacity style={styles.employeeButton} onPress={clockedIn ? handleClockOut : handleClockIn}>
        <Text style={styles.buttonText}>{clockedIn ? "Clock Out" : "Clock In"}</Text>
      </TouchableOpacity>

      {/* Always show the table if the user has clocked in at least once */}
      {startTime && (
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
      )}

      {/* Navigate back to Employee's Home Page */}
      <TouchableOpacity onPress={() => navigation.navigate("SigninEmployees")}>
        <Text style={styles.optionText}>Back to Employee's Home Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const enhancedStyles = StyleSheet.create({
  ...styles,
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  employeeButton: {
    backgroundColor: '#3498db',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    marginTop: 20,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    width: '30%',
  },
  tableData: {
    fontSize: 14,
    width: '30%',
    textAlign: 'center',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  optionText: {
    color: '#3498db',
    marginTop: 30,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default EmployeeClockIn;
