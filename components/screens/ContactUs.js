// ContactInfo.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const ContactUs = ({navigation}) => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('https://www.rudyscatering.ca/contact/api/ui-extensions/');
        
        // Log the raw response text to see what we get
        const text = await response.text();
        console.log('Response Text:', text);
        
        // Try to parse the response as JSON
        const data = JSON.parse(text);
        
        // Assuming the contact information is under 'contact' key in the JSON
        const contact = data.contact;
        setContactInfo(contact);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!contactInfo) {
    return <Text>No contact information available</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Contact Information</Text>
      <Text style={styles.text}>Email: {contactInfo.email}</Text>
      <Text style={styles.text}>Phone: {contactInfo.phone}</Text>
      <Text style={styles.text}>Address: {contactInfo.address}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ContactUs;
