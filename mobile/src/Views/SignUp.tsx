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

function TermsAndConditions(): JSX.Element {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
        }}>
            <Text style={{color: 'black', fontSize: 12}}>
                By creating an account you accept our
            </Text>
            <Text style={{color: '#7a73e7', fontSize: 12}} >Terms of services</Text>
            <Text style={{color: 'black', fontSize: 12, paddingHorizontal: 5}} >and</Text>
            <Text style={{color: '#7a73e7', fontSize: 12}} >Privacy policy</Text>
        </View>
    )
}

export default function SignUp({navigation} : {navigation: any}): JSX.Element {
    const [fullName, setFullName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    async function trySignUp() {
        if (fullName.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        const resp = await authService.register({email: email.trim(), password, fullName});
        console.log(resp);
    }

    return (
        <AuthViewContainer>
            <View style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <BackButton navigation={navigation}/>
                <Title title={'Sign Up'} style={{color: 'white'}}/>
            </View>
            <View style={{
                flex: 1,
                alignItems: 'center',
            }}>
                <View style={{
                    width: '90%',
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 20,
                }}>
                    <AuthTextInput placeholder={'Full Name'} text={fullName} setText={setFullName}/>
                    <AuthTextInput placeholder={'Email'} text={email} setText={setEmail}/>
                    <AuthTextInput placeholder={'Password'} secure={true} setText={setPassword} text={password}/>
                    <View style={{paddingVertical: 5}} />
                    <MyButton title={'Sign Up'} onPress={trySignUp}/>
                    <TermsAndConditions />
                </View>
                <AuthFooter width={'90%'} />
            </View>
        </AuthViewContainer>
    );
}
