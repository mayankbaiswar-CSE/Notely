/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform, StyleSheet,
    Text, View, SafeAreaView,
    StatusBar
} from 'react-native';
import { Provider } from "react-redux";
import store from "./src/config/store";
import Root from './src/config/routes';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.container}>
                        {/* <StatusBar barStyle={'default'} /> */}
                        <Root />
                    </View>
                </SafeAreaView>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
