
export default () => {
    'use strict';

    if(!Vue){
        console.log('Vue is "undefined"');
        return;
    }
    
    Vue.debug = true;

    new Vue({
        el: '#form-app',
        data() {
            return {};
        },
        created() {
            console.log('Vue app is loaded');
        }
    });
};
