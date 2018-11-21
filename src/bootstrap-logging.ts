import Vue from 'vue';
import { Logger } from 'winston';

function findLogger(v: Vue): Logger | undefined {
    const logger = v.$options.logger;
    if (logger) {
        return logger;
    }

    return v.$parent && v.$parent.$options.logger;
}

Vue.mixin({
    beforeCreate() {
        const logger = findLogger(this);
        if (!logger) {
            return;
        }

        this.$logger = logger;
    }
});