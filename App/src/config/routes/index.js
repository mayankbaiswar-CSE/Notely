import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Home } from '../../Home';
import { Detail } from '../../DetailScreen';
import FilterScreen from './FilterScreen';
import { widthScale } from '../device/normalize';



const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home
    }
}, {
        initialRouteName: 'Home',
        contentComponent: FilterScreen,
        drawerWidth: widthScale(180),
        drawerPosition: 'right',
    });

export default Root = createStackNavigator({
    DrawerNavigator: { screen: DrawerNavigator },
    Detail: { screen: Detail }
}, {
        headerMode: 'none'
    });