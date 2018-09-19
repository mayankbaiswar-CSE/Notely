import React, { Component } from 'react';
import {
    Platform,
    Text, View, TextInput,
    TouchableOpacity, Keyboard,
    ScrollView
} from 'react-native';
import styles from './DetailScreen.styles';
import colors from '../../assets/colors';
import { widthScale } from '../config/device/normalize';
import { NavBar } from '../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './DetailsScreen.actions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import moment from 'moment';


class DetailScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            lastEdit: Date.now(),
            editable: false,
        };
    }

    componentDidMount() {
        const { state } = this.props.navigation;
        if (state.params && state.params.title) {
            this.setState((state) => ({ ...state, title: this.props.navigation.state.params.title }));
        }

        if (state.params && state.params.content) {
            this.setState((state) => ({ ...state, content: this.props.navigation.state.params.content }));
        }

        if (state.params && state.params.lastEdit) {
            this.setState((state) => ({ ...state, lastEdit: this.props.navigation.state.params.lastEdit }));
        }

        if (state.params && state.params.save) {
            this.setState({ editable: true });
        }
    }

    _onBackPress = () => {
        this.props.navigation.goBack();
    }

    _onFocusContent = () => {
        this.contentRef.focus();
    }

    _onChangeTitle = (text) => {
        this.setState({ title: text });
    }

    _renderTitle = () => {
        const { title, editable, lastEdit } = this.state;

        return (
            <View
                style={{ backgroundColor: colors.whitesmoke, paddingHorizontal: widthScale(40) }}
            >
                <TextInput
                    ref={(ref) => this.titleRef = ref}
                    style={styles.titleInput}
                    autoFocus={true}
                    value={title}
                    editable={editable}
                    multiline={true}
                    onChangeText={this._onChangeTitle}
                    returnKeyType={'next'}
                    onSubmitEditing={this._onFocusContent}
                />
                <Text style={styles.dateDetailText}>{'Last Modified: ' + moment(lastEdit).format('MMM Do YY [at] LT')}</Text>

            </View>
        );
    }

    _onChangeText = (text) => {
        this.setState({ content: text });
    }

    _renderContent = () => {
        const { content, editable } = this.state;
        return (
            <View
                style={{ flex: 1, paddingHorizontal: widthScale(16), backgroundColor: 'white' }}
            >
                <ScrollView>

                    <TextInput
                        ref={(ref) => this.contentRef = ref}
                        style={styles.contentInputStyle}
                        value={content}
                        editable={editable}
                        multiline={true}
                        onChangeText={this._onChangeText}
                        returnKeyType={'done'}
                    />
                    {Platform.select({ ios: <KeyboardSpacer /> })}
                </ScrollView>

            </View>
        )
    }

    _enableEdit = () => {
        this.setState({ editable: true });
        this.titleRef.focus();
    }

    _disableEdit = () => {
        Keyboard.dismiss();
        this.setState({ editable: false });
    }

    _saveChanges = () => {
        const { saveEdits, saveNewNote } = this.props.actions;
        const { title, content } = this.state;
        const { state, goBack } = this.props.navigation;

        if (state.params && state.params.save) {
            saveNewNote(content, title.trim().length === 0 ? '(Untitled)' : title);
            goBack();
        } else {
            saveEdits(content, title, state.params.index);
        }

        Keyboard.dismiss();

        this._disableEdit();
    }

    _renderNavControls = () => {
        const { editable } = this.state;
        if (!editable) {
            return (
                <TouchableOpacity
                    onPress={this._enableEdit}
                >
                    <Text style={styles.navTextStyle}>{'EDIT'}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <View
                style={{ flexDirection: 'row' }}
            >
                <TouchableOpacity
                    onPress={this._disableEdit}
                >
                    <Text style={styles.navTextStyle}>{'UNDO'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this._saveChanges}
                >
                    <Text style={styles.navTextStyle}>{'SAVE'}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderNavBar = () => {
        return (
            <NavBar showLeft={true} onBackPress={this._onBackPress}>
                {this._renderNavControls()}
            </NavBar>
        );
    }

    render() {
        return (
            <View style={styles.container}>

                {this._renderNavBar()}
                {this._renderTitle()}
                {this._renderContent()}

            </View>
        );
    }
}

function mapStateToProps({ homeReducer }) {
    return {
        state: homeReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);