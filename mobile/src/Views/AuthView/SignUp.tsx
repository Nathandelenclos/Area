import React, {JSX} from "react";
import {Linking, Text, View} from "react-native";
import MyButton from "../../Components/MyButton";
import {Title} from "../../Components/Title";
import AuthViewContainer from "../../Components/AuthComponent/AuthViewContainer";
import {AuthFooter} from "../../Components/AuthComponent/AuthList";
import BackButton from "../../Components/BackButton";
import AuthTextInput from "../../Components/AuthComponent/AuthTextInput";
import authService from "../../Services/auth.service";
import AppContext from "../../Contexts/app.context";

function TermsAndConditions(): JSX.Element {
    const {color, translate} = AppContext();

    const RickRoll = () => {
        return (
            Linking.openURL('https://www.google.com')
        )
    }

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{color: color.text, fontSize: 12}}>
                {translate('to_pp') + ' '}
            </Text>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                <Text style={{color: color.mainColor, fontSize: 12}}
                      onPress={RickRoll}>{translate('to') + ' '}</Text>
                <Text style={{
                    color: color.text,
                    fontSize: 12
                }}>{translate('and') + ' '}</Text>
                <Text style={{
                    color: color.mainColor,
                    fontSize: 12
                }}>{translate('pp')}</Text>
            </View>
        </View>
    )
}

export default function SignUp({navigation}: { navigation: any }): JSX.Element {
    const {color, translate} = AppContext();
    const [fullName, setFullName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    async function trySignUp() {
        if (fullName.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        const resp = await authService.register({
            email: email.trim(),
            password,
            fullName
        });
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
                <Title title={translate('sign_up')}
                       style={{color: color.textOverMainColor}}/>
            </View>
            <View style={{
                flex: 1,
                alignItems: 'center',
            }}>
                <View style={{
                    width: '90%',
                    backgroundColor: color.mode,
                    padding: 20,
                    borderRadius: 20,
                }}>
                    <AuthTextInput placeholder={translate('full_name')}
                                   text={fullName}
                                   setText={setFullName}/>
                    <AuthTextInput placeholder={translate('email')} text={email}
                                   setText={setEmail}/>
                    <AuthTextInput placeholder={translate('password')}
                                   secure={true}
                                   setText={setPassword} text={password}/>
                    <View style={{paddingVertical: 5}}/>
                    <MyButton title={translate('sign_up')} onPress={trySignUp}/>
                    <TermsAndConditions/>
                </View>
                <AuthFooter width={'90%'}/>
            </View>
        </AuthViewContainer>
    );
}
