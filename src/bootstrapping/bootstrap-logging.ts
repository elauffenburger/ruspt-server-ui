import Vue from 'vue';

Vue.mixin({
    beforeCreate() {
        const options = this.$options;

        // store injection
        if (options.logger) {
            this.$logger = options.logger;
        } else if (options.parent && options.parent.$logger) {
            this.$logger = options.parent.$logger;
        }
    }
});
