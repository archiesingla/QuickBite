import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';
const SearchBar = ({term, onTermChange, onTermSubmit}) =>{
    return (
        <View style = {styles.background}>
            <Feather name="search" style = {styles.iconStyle}/>
            <TextInput
                autoCapitalize='none'
                style = {styles.inputStyle}
                placeholder="Search"
                value={term}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
            />
        </View>
        
    );

};
const styles = StyleSheet.create({
    background:{
        marginTop: 10,
        backgroundColor:'#F0EEEE',
        height: 50,
        alignSelf:'stretch',
        borderRadius:5,
        marginHorizontal: 20,
        flexDirection: 'row'
    },
    inputStyle: {
        flex:1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
}

);
export default SearchBar;