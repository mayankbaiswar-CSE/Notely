import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { widthScale } from '../config/device/normalize';
import { ic_like, ic_star, ic_unlike, ic_unstar, ic_trash } from '../../assets/images';
import Swipeout from 'react-native-swipeout';
import styles from './HomeScreen.styles';
import moment from 'moment';


export default class ListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFavourite: props.item.isFavourite,
            isStarred: props.item.isStarred
        };
    }

    onItemPress = (item, index) => {
        this.setState({
            isFavourite: !this.state.isFavourite,
            isStarred: !this.state.isStarred
        });

        this.props.onPress(item, index);
    }

    onStarPress = (index) => {
        this.setState({
            isStarred: !this.state.isStarred
        });

        this.props.onFavPress(index);
    }

    onFavPress = (index) => {
        this.setState({
            isFavourite: !this.state.isFavourite,
        });
        this.props.onStarPress(index);
    }

    onItemDelete = (index) => {
        this.props.onItemDelete(index);
    }

    deleteIcon = () => {
        return (
            <View style={styles.deleteIconStyle} >
                <Image
                    source={ic_trash}
                    style={{ height: 20, width: 20 }}
                />
                <Text style={{ color: 'white' }} >{'Delete'}</Text>
            </View>
        );
    }

    render() {
        const { item: { title, content, lastEdit }, index, onPress } = this.props;
        const { isStarred, isFavourite } = this.state;
        const swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => { this.onItemDelete(index) },
            component: this.deleteIcon()
        }];

        return (
            <Swipeout right={swipeBtns}
                buttonWidth={100}
                autoClose={true}>
                <TouchableOpacity
                    onPress={onPress.bind(this, this.props.item, index)}
                    activeOpacity={0.6}>
                    <View style={styles.cellContainer}>

                        <View style={styles.contentViewStyle} >
                            <Text style={styles.titleTextStyle} numberOfLines={1} >{title}</Text>

                            <Text style={styles.contentTextStyle} numberOfLines={1} >{content}</Text>

                            <Text style={styles.dateTextStyle}>{moment(lastEdit).format('MMM Do YY [at] LT')}</Text>
                        </View>

                        <View style={styles.interactViewStyle}>

                            <TouchableOpacity hitSlop={{ bottom: widthScale(100), right: 10, left: 20, top: 20 }}
                                onPress={this.onStarPress.bind(this, index)} >
                                <Image
                                    source={isStarred ? ic_star : ic_unstar}
                                    style={styles.cellButtonStyle}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity hitSlop={{ bottom: widthScale(100), left: 10, right: 20, top: 20 }}
                                onPress={this.onFavPress.bind(this, index)} >
                                <Image
                                    source={isFavourite ? ic_like : ic_unlike}
                                    style={styles.cellButtonStyle}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>
                </TouchableOpacity>
            </Swipeout >
        );
    }
}
