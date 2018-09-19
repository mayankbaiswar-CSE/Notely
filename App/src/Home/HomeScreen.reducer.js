import * as Action from "./HomeScreen.types";
import data from '../utils/data';
import * as SaveAction from '../DetailScreen/DetailScreen.types';
import { HAS_FILTER, FILTER_LIST } from '../config/routes/Filter.actions';

let todoList = [...data];

const initailState = {
    list: todoList,
    listHasChange: false,
    hasFilter: false
};

function homeReducer(state = initailState, action = {}) {
    switch (action.type) {
        case Action.RESET_ALL_LIST:
            return {
                list: todoList
            }
        case Action.ITEM_DELETE:
            state.list.splice(action.payload, 1);
            return {
                ...state,
                list: state.list,
                listHasChange: !state.listHasChange
            };
        case Action.ITEM_FAVOURITE:
            let favNote = state.list[action.payload];
            favNote.isStarred = !favNote.isStarred;
            state.list[action.payload] = favNote;
            todoList = state.list;

            return {
                ...state,
                list: state.list,
                listHasChange: !state.listHasChange
            };
        case Action.ITEM_HEART:
            let heartNote = state.list[action.payload];
            heartNote.isFavourite = !heartNote.isFavourite;
            state.list[action.payload] = heartNote;
            todoList = state.list;

            return {
                ...state,
                list: state.list,
                listHasChange: !state.listHasChange
            };
        case SaveAction.SAVE_EDITS:
            let editedNote = state.list[action.payload.index];
            editedNote.content = action.payload.content;
            editedNote.title = action.payload.title;
            editedNote.lastEdit = Date.now();
            state.list[action.payload.index] = editedNote;
            todoList = state.list;

            return {
                list: state.list,
                listHasChange: !state.listHasChange
            };
        case HAS_FILTER:
            return {
                ...state,
                hasFilter: action.payload
            };
        case FILTER_LIST:
            const filteredList = resolveFilters(action.payload);
            return {
                ...state,
                list: filteredList,
                listHasChange: !state.listHasChange
            };
        case SaveAction.SAVE_NEW_NOTE:
            let newNote = {};
            newNote.title = action.payload.title;
            newNote.content = action.payload.content;
            newNote.isStarred = false;
            newNote.isFavourite = false;
            newNote.isPoem = false;
            newNote.isStory = false;
            newNote.lastEdit = Date.now();

            state.list.push(newNote);
            return {
                ...state,
                list: state.list,
                listHasChange: !state.listHasChange
            };
        default:
            return state;
    }
}

const resolveFilters = (filters) => {

    if (!Object.keys(filters).length) {
        return todoList;
    }

    let filtered = [];

    filtered = todoList.reduce(function (cb, item) {
        let pass = true;
        for (key in filters) {
            if (!item[key]) {
                pass = false;
            }
        }
        if (pass) {
            cb.push(item);
        }

        return cb;
    }, []);
    return filtered;
}

export default homeReducer;