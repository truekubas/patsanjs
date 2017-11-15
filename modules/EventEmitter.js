/**
 * patsan
 * Created by andreykubasov on 09.11.17.
 */
import digestLoop from './digestLoop';
import { DispatchEvents } from '../constants/directiveTypes';

let isFunction = function (obj) {
    return typeof obj == 'function' || false;
};

// made with Map
export class EventEmitter {
    
    constructor() {
        this.listeners = new Map();
    }
    
    // check if Map has event-name
    // if not - set label with empty array of callbacks
    // if exist - push new callback to current event in Map
    addListener(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }
    
    removeListener(label, callback) {
        let listeners = this.listeners.get(label),
            index;
    
        if (listeners && listeners.length) {
            // find index of event which callback we wanna remove
            index = listeners.reduce((i, listener, index) => {
                return (isFunction(listener) && listener === callback) ?
                    i = index :
                    i;
            }, -1);
            // if found, remove callback from event in Map
            // and update callbacks in current event
            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(label, listeners);
                return true;
            }
        }
        return false;
    }
    
    // calls callback function in each event listener
    emit(label, ...args) {
        let listeners = this.listeners.get(label);
        
        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener(...args);
            });
            return true;
        }
        return false;
    }
    
}

// creates Observer, pass new EventEmitter to subject argument
// then observable EventEmitter can emit 'change' (now only one event)
// and Observer handler will call digestLoop

//  for example:
//  let observable = new EventEmitter();
//  let [observer1, observer2] = [
//       new Observer(observable),
//       new Observer(observable)
//  ];
//
//  observable.emit("change", { a: 1 });

export class Observer {
    constructor(subject) {
        this.subject = subject;
        this.subject.addListener(DispatchEvents.MODEL_CHANGE, (data) => this.modelChangeHandler(data));
    }
    
    modelChangeHandler(data) {
        return digestLoop(data);
    }
}