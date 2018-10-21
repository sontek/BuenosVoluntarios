import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

export default class FBLoginButton extends Component {
    render() {
        return (
            <View>
                <LoginButton
                    publishPermissions={["email"]}
                    onLoginFinished={
                        (error, result) => {
                            console.log("===== ERROR, RESULT", error, result);
                        }
                    }
                    onLogoutFinished={() => console.log("User logged out")}/>
            </View>
        );
    }
};

module.exports = FBLoginButton;
