import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

export const configureStore = (history) => {
    const composeEnhancers = composeWithDevTools({
        // options like actionSanitizer, stateSanitizer
    });
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};