import * as Action from './DetailScreen.types';

export const saveEdits = (content, title, index) => {
    return {
        type: Action.SAVE_EDITS,
        payload: { content, index, title }
    };
}

export const saveNewNote = (content, title) => {
    return {
        type: Action.SAVE_NEW_NOTE,
        payload: { content, title }
    };
}