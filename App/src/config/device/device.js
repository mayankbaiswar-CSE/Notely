import { Dimensions, Platform } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;


export const isIPhoneX = () => {
    return Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((height === X_HEIGHT && width === X_WIDTH) ||
            (width === X_WIDTH && height === X_HEIGHT));
}

export const { width, height } = Dimensions.get('screen');