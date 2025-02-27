import React from 'react';
import {Text, Image} from 'react-native';

const Imagedetails = ({ImageSource, Title}) =>{
    return (
        <Text>{Title}</Text>,
        <Image source={ImageSource}/>
    );

};
export default Imagedetails;