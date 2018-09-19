import * as Action from './HomeScreen.types';

export const deleteItemFromList = (index) => {
    return {
        type: Action.ITEM_DELETE,
        payload: index
    };
}

export const heartItemOnList = (index) => {
    return {
        type: Action.ITEM_HEART,
        payload: index
    };
}

export const favItemOnList = (index) => {
    return {
        type: Action.ITEM_FAVOURITE,
        payload: index
    };
}