import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text, View,
    StyleSheet, Image, TouchableOpacity
} from 'react-native';
import { DrawerActions } from 'react-navigation';
import colors from '../../../assets/colors';
import { heightScale, widthScale } from '../device/normalize';
import { filter_check, filter_uncheck, cross } from '../../../assets/images';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './Filter.actions';


class FilterScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isStarred: false,
            isFavourite: false,
            isPoem: false,
            isStory: false,
        };
    }

    navigateToScreen = (route) => () => {
        // const navigateAction = NavigationActions.navigate({
        //     routeName: route
        // });
        // this.props.navigation.dispatch(navigateAction);
        // this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    applyFilter = () => {
        const { isFavourite, isPoem, isStarred, isStory } = this.state;
        const { hasFilter, filterList } = this.props.actions;
        this.props.navigation.dispatch(DrawerActions.closeDrawer());

        const filterStatus = isFavourite || isPoem || isStarred || isStory;
        hasFilter(filterStatus);
        let filters = {};
        for (key in this.state) {
            if (this.state[key]) {
                filters[key] = true;
            }
        }
        filterList(filters);
    }

    onHeartPress = () => {
        this.setState({ isFavourite: !this.state.isFavourite });
    }

    onFavPress = () => {
        this.setState({ isStarred: !this.state.isStarred });
    }

    onPoemPress = () => {
        this.setState({ isPoem: !this.state.isPoem });
    }

    onStoryPress = () => {
        this.setState({ isStory: !this.state.isStory });
    }

    render() {
        const { isFavourite, isPoem, isStarred, isStory } = this.state;

        return (
            <View style={{ backgroundColor: colors.liver, flex: 1, paddingTop: heightScale(60) }} >
                <View style={styles.itemStyle}>
                    <Text style={{ color: 'white' }} >
                        {'FILTER'}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.dispatch(DrawerActions.closeDrawer())
                    }} activeOpacity={0.6} >
                        <Image
                            source={cross}
                            style={{
                                backgroundColor: colors.liver, width: widthScale(40),
                                height: heightScale(40)
                            }}
                        />
                    </TouchableOpacity>


                </View>

                <TouchableOpacity activeOpacity={0.6} onPress={this.onHeartPress} >
                    <View style={styles.itemStyle}>
                        <Text style={{ color: isFavourite ? colors.turqoise : 'white' }} >
                            {'Hearted'}
                        </Text>
                        <Image
                            source={isFavourite ? filter_check : filter_uncheck}
                            style={{
                                backgroundColor: colors.liver, width: widthScale(40),
                                height: heightScale(40)
                            }}
                        />

                    </View>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={0.6} onPress={this.onFavPress}>
                    <View style={styles.itemStyle}>
                        <Text style={{ color: isStarred ? colors.turqoise : 'white' }} >
                            {'Favourite'}
                        </Text>
                        <Image
                            source={isStarred ? filter_check : filter_uncheck}
                            style={{
                                backgroundColor: colors.liver, width: widthScale(40),
                                height: heightScale(40)
                            }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} onPress={this.onPoemPress}>
                    <View style={styles.itemStyle}>
                        <Text style={{ color: isPoem ? colors.turqoise : 'white' }} >
                            {'Poems'}
                        </Text>
                        <Image
                            source={isPoem ? filter_check : filter_uncheck}
                            style={{
                                backgroundColor: colors.liver, width: widthScale(40),
                                height: heightScale(40)
                            }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} onPress={this.onStoryPress}>
                    <View style={styles.itemStyle}>
                        <Text style={{ color: isStory ? colors.turqoise : 'white' }} >
                            {'Story'}
                        </Text>
                        <Image
                            source={isStory ? filter_check : filter_uncheck}
                            style={{
                                backgroundColor: colors.liver, width: widthScale(40),
                                height: heightScale(40)
                            }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={this.applyFilter} activeOpacity={0.6} >
                    <Text style={{ color: 'white' }} >{'APPLY'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemStyle: {
        height: heightScale(60),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: widthScale(16)
    },
    buttonStyle: {
        position: 'absolute',
        height: heightScale(50),
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: heightScale(30),
        left: widthScale(20),
        right: widthScale(20)
    }
});

FilterScreen.propTypes = {
    navigation: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(FilterScreen);