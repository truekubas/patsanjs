/**
 * patsan
 * Created by andreykubasov on 09.11.17.
 */

import { EventEmitter, Observer } from './EventEmitter';
import { DispatchEvents } from '../constants/directiveTypes';
//import { execAfter } from '../constants/decorators';

// Redux-like data store
// on get/update value it emits model change to start digestLoop
class AppStore {
    constructor() {
        this.store = new Map();
        this.observable = new EventEmitter();
        let storeObserver = new Observer(this.observable);
    }
    
    emitStoreChanges() {
        this.observable.emit(DispatchEvents.MODEL_CHANGE, {});
    }
    
    addToStore(label, value) {
        this.store.set(label, value);
        this.emitStoreChanges();
    }
    
    getItemByKey(key) {
        return this.store.get(key);
    }
    
    getStoreContent() {
        return this.store;
    }
}

let appStore = new AppStore();

export default appStore;