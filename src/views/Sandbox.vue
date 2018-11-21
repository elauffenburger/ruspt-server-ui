<template>
  <div class="sandbox columns">

    <div class="column is-one-fifth">
      <section class="section">
        <div class="container">
          <h2 class="subtitle">History</h2>
        </div>
      </section>

      <SandboxHistory class="history" ref="history" @entry-clicked="onHistoryEntryClicked($event)" />
    </div>

    <div class="column is-two-thirds editor-container">
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

.history {
  display: flex;
  flex-direction: column;
  height: 100%;

  overflow-y: scroll;
}

.output-terminal {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>