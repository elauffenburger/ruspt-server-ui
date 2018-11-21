<template>
  <div class="sandbox columns">

    <div class="column is-one-fifth history-container">
      <section class="section">
        <div class="container history-label-container">
          <h2 class="subtitle history-label">History</h2>
          <a class="button is-danger clear-history-btn" v-if="historyExists" @click="onClickClearHistory()">Clear History</a>
        </div>
      </section>

      <SandboxHistory class="history" ref="history" @entry-clicked="onHistoryEntryClicked($event)" />
    </div>

    <div class="column is-half editor-container">
      <section class="section">
        <div class="container">
          <h2 class="subtitle">Editor</h2>
        </div>
      </section>

      <SandboxEditor class="editor" ref="editor" @code-submitted="onEditorCodeSubmitted($event)" />
    </div>

    <div class="column">
      <section class="section">
        <div class="container">
          <h2 class="subtitle">Output</h2>
        </div>
      </section>

      <SandboxTerminal class="output-terminal" ref="outputTerminal" />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { HistoryEntry } from "../models";

import SandboxTerminal from "@/components/SandboxTerminal.vue";
import SandboxHistory from "@/components/SandboxHistory.vue";
import SandboxEditor from "@/components/SandboxEditor.vue";
import { AppState } from '@/store';
import { Store } from 'vuex';

@Component({
  name: "Sandbox",
  components: {
    SandboxEditor,
    SandboxTerminal,
    SandboxHistory
  }
})
export default class Sandbox extends Vue {
  editor: SandboxEditor = <any>null;
  term: SandboxTerminal = <any>null;
  history: SandboxHistory = <any>null;

  get historyExists(): boolean {
    const history = this.store.state.sandbox.codeSubmissionHistory;

    return history && history.length > 0;
  }

  get store(): Store<AppState> {
    return this.$store as Store<AppState>;
  }

  mounted() {
    this.bindReferences();
  }

  onEditorCodeSubmitted(code: string) {
    this.$logger.debug("dispatching sandbox/submitCode");

    this.$store.dispatch("sandbox/submitCode", code);
  }

  onHistoryEntryClicked(entry: HistoryEntry) {
    this.editor.code = entry.input;
  }

  onClickClearHistory() {
    this.$store.dispatch("sandbox/clearHistory");
  }

  private bindReferences() {
    this.editor = <any>this.$refs.editor;
    this.term = <any>this.$refs.outputTerminal;
    this.history = <any>this.$refs.history;
  }
}
</script>

<style scoped lang="scss">
.sandbox {
  max-height: 80vh;
}

.section {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
}

.editor {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.history-container {
  .history-label-container {
    display: flex;
    max-width: 100%;

    .history-label {
      flex: 1 1 50%;
      display: inline-block;
    }

    .clear-history-btn {
      flex: 1 1 50%;
      display: inline-block;
    }
  }

  .history {
    display: flex;
    flex-direction: column;
    height: 100%;

    overflow-y: auto;
  }
}

.output-terminal {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>