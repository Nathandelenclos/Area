import React, {JSX} from "react";
import {TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

export default function BackButton({navigation} : {navigation: any}): JSX.Element {
    return (
        <TouchableOpacity style={{position: 'absolute', top: 5, left: 20}} onPress={() => navigation.pop()}>
            <FontAwesomeIcon icon={'arrow-left'} size={25} style={{color: 'white'}}/>
        </TouchableOpacity>
    );
}
