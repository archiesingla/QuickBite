import React, {useState} from 'react';
import styles from "../styles/styles";
import {View} from 'react-native';
import SearchBar from '../searchBar';

const Home = ({navigation}) =>{
    const[term,setTerm] =useState('');
    return (
        <View>
            <SearchBar 
                term={term} 
                onTermChange={(newTerm) => setTerm(newTerm)}
                onTermSubmit={() => console.log("submitted")}   
            />
            <Text>{term}</Text>

        </View>
        
    );

};
export default Home;