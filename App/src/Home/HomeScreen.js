import React, { Component } from 'react';
import {
    Text, View, FlatList,
    Image, TouchableOpacity
} from 'react-native';
import styles from './HomeScreen.styles';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts';
import normalize, { heightScale, widthScale } from '../config/device/normalize';
import { filter_normal, filter_applied, ic_add } from '../../assets/images';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from './HomeScreen.item';
import * as actions from './HomeScreen.actions';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    renderNavBar = () => {
        return (
            <View
                style={{ height: heightScale(40), backgroundColor: colors.whitesmoke }}
            >
            </View>
        );
    }

    renderNavControls = () => {
        const { hasFilter } = this.props.state;

        return (
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Detail', { title: '', content: '', save: true })
                }} activeOpacity={0.6}>
                    <Image
                        style={styles.addbuttonStyle}
                        source={ic_add}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.dispatch(DrawerActions.openDrawer())
                }} activeOpacity={0.6} >
                    <Image
                        style={styles.caretStyle}
                        source={hasFilter ? filter_applied : filter_normal}
                    />
                </TouchableOpacity>


            </View>
        );
    }

    renderTitleBar = () => {

        return (
            <View style={styles.titleStyle}>
                <Text style={{ fontSize: normalize(30), fontFamily: fonts.Prumo }} >{'Notely'}</Text>
                {this.renderNavControls()}
            </View>
        );
    }

    _onItemDelete = (index) => {
        const { deleteItemFromList } = this.props.actions;
        deleteItemFromList(index);
    }

    _onStarPress = (index) => {
        const { heartItemOnList } = this.props.actions;
        heartItemOnList(index);
    }

    _onFavPress = (index) => {
        const { favItemOnList } = this.props.actions;
        favItemOnList(index);
    }

    renderListItem = ({ item, index }) => {
        return (
            <ListItem
                item={item}
                index={index}
                onPress={this.onListItemPress}
                onItemDelete={this._onItemDelete}
                onStarPress={this._onStarPress}
                onFavPress={this._onFavPress}
            />
        );
    }

    onListItemPress = (item, index) => {
        this.props.navigation.navigate('Detail', { ...item, index });
    }

    itemSeparator = () => {
        return (
            <View
                style={{ width: '100%', height: 1, backgroundColor: '#ccc' }}
            />
        );
    }

    listEmptyComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ fontFamily: fonts.Prumo }} >{'Oops! no notes. Click Add icon above.'}</Text>
            </View>
        );
    }

    renderList = () => {
        const { list, listHasChange } = this.props.state;

        return (
            <FlatList
                data={list}
                renderItem={this.renderListItem}
                keyExtractor={(_, index) => index.toString()}
                ItemSeparatorComponent={this.itemSeparator}
                extraData={listHasChange}
                ListEmptyComponent={this.listEmptyComponent}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>

                {this.renderNavBar()}
                {this.renderTitleBar()}
                {this.renderList()}

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


export default connect(mapStateToProps, mapDispatchToProps)(Home);