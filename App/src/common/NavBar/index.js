import React, { Component } from 'react';
import {
    Platform, StyleSheet,
    Text, View, Image,
    TouchableOpacity
} from 'react-native';
import colors from '../../../assets/colors';
import fonts from '../../../assets/fonts';
import normalize, { heightScale, widthScale } from '../../config/device/normalize';
import { ic_back } from '../../../assets/images';

export default class NavBar extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    renderLeftButton = () => {
        const { onBackPress } = this.props;
        return (
            <TouchableOpacity
                onPress={onBackPress}
            >
                <Image
                    source={ic_back}
                    style={{ height: 20, width: 40 }}
                    resizeMode={'contain'}
                />
            </TouchableOpacity>
        );
    }

    render() {

        const { showLeft, children } = this.props;

        return (
            <View style={styles.container}>
                {showLeft && this.renderLeftButton()}
                {children}
            </View>
        );
    }
}

NavBar.defaultProps = {
    showRight: false,
    showLeft: false,
    onBackPress: () => { }
};

const styles = StyleSheet.create({
    container: {
        height: heightScale(60),
        backgroundColor: colors.whitesmoke,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: widthScale(6)
    }
});