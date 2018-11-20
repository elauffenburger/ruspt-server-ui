<template>
    <div>
        <b-message v-for="(history, i) of historyEntries" :key="i" class="history-entry" :closable="false" size="is-small" :title="getTitleForHistoryEntry(history)" :type="getTypeForHistoryEntry(history)">
            <div class="history-info-group">
                <span class="history-title">Input:</span>
                <span class="history-code">{{history.input}}</span>
            </div>
            <div class="history-info-group">
                <span class="history-title">Output:</span>
                <span class="history-code">{{history.output}}</span>
            </div>
        </b-message>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { HistoryEntry } from "../models";

@Component({
  name: "SandboxHistory"
})
export default class SandboxHistory extends Vue {
  get historyEntries(): HistoryEntry[] {
    return this.$store.getters['sandbox/history'];
  }

  makeHistoryEntry(entry: HistoryEntry) {
    this.historyEntries.push(entry);
  }

  getTitleForHistoryEntry(entry: HistoryEntry) {
    return entry.success ? "Success" : "Execution Failure";
  }

  getTypeForHistoryEntry(entry: HistoryEntry) {
    return entry.success ? "is-success" : "is-danger";
  }
}
</script>

<style lang="scss" scoped>
.history-entry {
  .history-info-group {
    .history-title {
      display: block;
      font-weight: bold;
    }

    .history-code {
      display: block;
      font-family: "Consolas";
    }
  }
}
</style>