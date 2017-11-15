/**
 * patsan
 * Created by andreykubasov on 09.11.17.
 */

// call function after execution decorated one
export function execAfter(functionAfter) {
    return function (target, name, descriptor) {
        let fn = descriptor.value;
            
        descriptor.value = function() {
            fn.apply(target, arguments);
            functionAfter();
        };
        
        return descriptor;
    }
}