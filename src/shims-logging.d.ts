import Vue from 'vue';
import { Logger } from "winston";

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