import React, {JSX} from "react";
import {Image, View} from "react-native";
import IMAGE from '../Assets/Logo.png';
import MyButton from "../Components/MyButton";
import {SubTitle, Title} from "../Components/Title";
import AuthViewContainer from "../Components/AuthComponent/AuthViewContainer";
import {AuthFooter} from "../Components/AuthComponent/AuthList";

export default function LoginScreen({navigation} : {navigation: any}): JSX.Element {
    return (
        <AuthViewContainer>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image source={IMAGE} style={{
                    height: '40%',
                    aspectRatio: 1,
                }}/>
                <Title title={'App Name'} style={{color: 'white'}}/>
            </View>
            <View style={{
                flex: 2,
                alignItems: 'center',
            }}>
                <View style={{
                    width: '90%',
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 20,
                }}>
                    <Title title={'Welcome to App Name'}
                           style={{paddingTop: 20}}/>
                    <SubTitle title={'Sign in to continue'}/>
                    <MyButton title={'Sign In'} onPress={() => navigation.navigate('SignIn')}/>
                    <MyButton inverse={true} title={'Sign Up'} onPress={() => navigation.navigate('SignUp')}/>
                    <AuthFooter width={'100%'}/>
                </View>
            </View>
        </AuthViewContainer>
    );
}
