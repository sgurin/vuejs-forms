
export default () => {
    'use strict';

    if (!Vue) {
        console.log('Vue is "undefined"');
        return;
    }

    Vue.debug = true;

    new Vue({
        el: '#form-app',
        data() {
            return {
                userInfo: {
                    firstName: '',
                    lastName: '',
                    userEmail: '',
                    userAge: '',
                    userSkype: ''
                },
                users: []
            };
        },
        methods: {
            addInfo() {
                this.users.push(Object.assign({}, this.userInfo));
                Object.keys(this.userInfo).forEach(key => {
                    this.userInfo[key] = '';
                });
            }
        },
        created() {
            console.log('Vue app is loaded');
        }
    });
};
