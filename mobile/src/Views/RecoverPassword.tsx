import React, {JSX} from "react";
import {View} from "react-native";
import MyButton from "../Components/MyButton";
import {Title} from "../Components/Title";
import AuthViewContainer from "../Components/AuthComponent/AuthViewContainer";
import BackButton from "../Components/BackButton";
import AuthTextInput from "../Components/AuthComponent/AuthTextInput";
import authService from "../Services/auth.service";

export default function RecoverPassword({navigation} : {navigation: any}): JSX.Element {
    const [email, setEmail] = React.useState<string>('');

    async function tryRecoverPassword() {
        const resp = await authService.forgotPassword(email);
        console.log('Recover Password');
    }
    return (
        <AuthViewContainer>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <BackButton navigation={navigation}/>
                <Title title={'Recover Password'} style={{color: 'white'}}/>
            </View>
            <View style={{
                flex: 2.5,
                alignItems: 'center',
            }}>
                <View style={{
                    width: '90%',
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 20,
                }}>
                    <AuthTextInput placeholder={'Email'} text={email} setText={setEmail}/>
                    <View style={{paddingVertical: 5}} />
                    <MyButton title={'Send Email'} onPress={tryRecoverPassword}/>
                </View>
            </View>
        </AuthViewContainer>
    );
}
