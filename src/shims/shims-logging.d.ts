import Vue from 'vue';
import { Logger } from "winston";
import { Store } from 'vuex';
import { AppState } from '../store';

declare module "vue/types/vue" {
  interface Vue {
    $logger: Logger;
  }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        logger?: Logger;
    }
}