import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, ActivityIndicator, 
  Image, TouchableOpacity, Linking 
} from 'react-native';

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        //integrating API to fetch the details from the cafe's page/ 
        const response = await fetch('https://www.rudyscatering.ca/contact/api/ui-extensions/');
        const text = await response.text();
        //contact information is under the script part so fetching that and then search the data
        const jsonLdMatches = text.match(/<script type="application\/ld\+json">(.*?)<\/script>/gs);

        if (!jsonLdMatches) {
          throw new Error('No JSON-LD found in response');
        }

        let extractedData = null;
        
        for (const match of jsonLdMatches) {
          try {
            const jsonData = JSON.parse(match.replace(/<script type="application\/ld\+json">|<\/script>/g, ''));

            if (jsonData["@type"] === "Organization") {
              extractedData = {
                email: jsonData.email || "Not available",
                phone: jsonData.telephone || "Not available",
                address: jsonData.address || "Not available",
                logo: jsonData.image || "https://www.rudyscatering.ca/default-logo.png"
              };
              break;
            }
          } catch (error) {
            console.warn('Error parsing JSON-LD:', error);
          }
        }

        if (!extractedData) {
          throw new Error('No relevant contact data found');
        }

        setContactInfo(extractedData);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5733" />
      </View>
    );
  }

  if (!contactInfo) {
    return <Text style={styles.errorText}>No contact information available</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Image source={require("../images/logo.jpeg")} style={styles.logo} />

      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${contactInfo.email}`)}>
        <Text style={styles.text}>
          📧 <Text style={styles.linkText}>{contactInfo.email}</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL(`tel:${contactInfo.phone}`)}>
        <Text style={styles.text}>
          📞 <Text style={styles.linkText}>{contactInfo.phone}</Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.text}>📍 {contactInfo.address}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  linkText: {
    color: '#FF5733',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ContactUs;
