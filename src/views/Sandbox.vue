<template>
  <div class="columns">

    <div class="column is-one-fifth">
      <section class="section">
        <div class="container">
          <h2 class="subtitle">History</h2>
        </div>
      </section>

      <SandboxHistory ref="history" />
    </div>

    <div class="column is-one-third editor-container">
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

      <SandboxTerminal ref="outputTerminal" />
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
    console.log('dispatching sandbox/submitCode');
    this.$store.dispatch('sandbox/submitCode', code);
  }

  private bindReferences() {
    this.term = <any>this.$refs.outputTerminal;
    this.history = <any>this.$refs.history;
  }
}
</script>

<style scoped lang="scss">
.section {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
}

.editor {
  height: 100vh;
}
</style>