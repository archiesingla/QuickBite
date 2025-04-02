import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig'; 
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 

const AddEmployee = ({navigation}) => {
  const [employeeName, setEmployeeName] = useState('');
  const [passcode, setPasscode] = useState('');

  // Passcode should be unique for all employees
  const checkPasscodeExists = async (passcode) => {
    const q = query(
      collection(FIRESTORE_DB, 'employees'),
      where("passcode", "==", passcode)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; 
  };

  // Creating a new employee
  const createEmployee = async () => {
    if (passcode.length !== 4) {
      Alert.alert("Error", "Passcode must be 4 digits.");
      return;
    }

    // Check if passcode already exists in the database
    const passcodeExists = await checkPasscodeExists(passcode);
    if (passcodeExists) {
      Alert.alert("Error", "This passcode is already in use. Please choose a different one.");
      return;
    }

    try {
      // Create a new employee document in Firestore
      const docRef = await addDoc(collection(FIRESTORE_DB, 'employees'), {
        name: employeeName,
        passcode: passcode,
      });

      console.log("Employee created with ID:", docRef.id);
      Alert.alert("Success", "Employee created successfully!");
      setEmployeeName('');
      setPasscode('');
      navigation.navigate("AdminHome")
      
    } catch (error) {
      console.error("Error creating employee:", error);
      Alert.alert("Error", "There was an issue creating the employee.");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.jpeg")} />
      <Text style={styles.title}>Create Employee</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Employee Name"
        value={employeeName}
        onChangeText={setEmployeeName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="4-digit Passcode"
        value={passcode}
        onChangeText={setPasscode}
        keyboardType="numeric"
        maxLength={4}
      />
      
      <Button title="Create Employee" onPress={createEmployee} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default AddEmployee;
