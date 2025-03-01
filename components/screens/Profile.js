import React from 'react';
import { View, Text, Button } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Profile</Text>
      <Button 
        title="Signout" 
        onPress={() => navigation.navigate("Login")} 
      />
    </View>
  );
};

export default Profile;
