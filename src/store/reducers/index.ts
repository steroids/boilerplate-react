import {combineReducers} from 'redux';
import {form, auth, fields, list, notifications, modal, router, screen} from '@steroidsjs/core/reducers';
import {currencyList} from './currency';
import {converterForm} from './converter';

const rootReducer = combineReducers({
    currency: currencyList,
    converter: converterForm,
});

export default (asyncReducers) => combineReducers({
    form,
    auth,
    fields,
    list,
    notifications,
    modal,
    screen,
    currency: currencyList,
    converter: converterForm,
    ...asyncReducers,
    router: (state, action) => router(asyncReducers.router ? asyncReducers.router(state, action) : {}, action),
});

export type RootState = ReturnType<typeof rootReducer>;
