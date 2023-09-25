import React, {JSX} from "react";
import {
    Text,
    View
} from "react-native";
import MyButton from "../Components/MyButton";
import {Title} from "../Components/Title";
import AuthViewContainer from "../Components/AuthComponent/AuthViewContainer";
import {AuthFooter} from "../Components/AuthComponent/AuthList";
import BackButton from "../Components/BackButton";
import AuthTextInput from "../Components/AuthComponent/AuthTextInput";
import authService from "../Services/auth.service";

export default function SignIn({navigation} : {navigation: any}): JSX.Element {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    async function tryLogin() {
        const resp = await authService.login({email: email.trim(), password});
        console.log(resp);
    }

    return (
        <AuthViewContainer>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <BackButton navigation={navigation}/>
                <Title title={'Sign In'} style={{color: 'white'}}/>
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
                    <AuthTextInput placeholder={'Password'} secure={true} setText={setPassword} text={password}/>
                    <View style={{paddingVertical: 5}} />
                    <MyButton title={'Sign In'} onPress={tryLogin}/>
                    <Text style={{textAlign: 'center', color: '#7a73e7', fontSize: 12, paddingVertical: 10}} onPress={() => navigation.navigate('RecoverPassword')}>Forgot Password ?</Text>
                </View>
                <AuthFooter width={'90%'} />
            </View>
        </AuthViewContainer>
    );
}
