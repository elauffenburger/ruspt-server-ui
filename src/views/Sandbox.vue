<template>
  <div class="columns">

    <div class="column is-one-fifth">
      <section class="section">
        <div class="container">
          <h2 class="subtitle">History</h2>
        </div>
      </section>

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

    <div class="column is-one-third editor-container">
      <section class="section">
        <div class="container">
          <h2 class="subtitle">Editor</h2>
        </div>
      </section>

      <monaco-editor ref="editor" class="code-editor" v-model="code" language="scheme" theme="vs-dark" />
      <div id="vim-status"></div>
    </div>

    <div class="column is-one-quarter">
      <section class="section">
        <div class="container">
          <h2 class="subtitle">Output</h2>
        </div>
      </section>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import MonacoEditor from "vue-monaco";
import { editor } from "monaco-editor";
import { initVimMode } from "monaco-vim";

import { HistoryEntry } from "../models";

@Component({
  name: "Sandbox",
  components: {
    MonacoEditor
  }
})
export default class Sandbox extends Vue {
  code = "";
  historyEntries: HistoryEntry[] = [
    {
      success: true,
      input: `(do (def x (+ 2 2)))`,
      output: `4`
    },
    {
      success: false,
      input: `(do (defn x (+ 2 2)))`,
      output: `Error: symbol defn undefined (this is totally made-up -- I don't know what it would say here!)`
    }
  ];

  created() {}

  mounted() {
    const editorEl = (<any>this.$refs).editor;
    const monacoEditor: editor.IStandaloneCodeEditor = editorEl.getMonaco();

    initVimMode(monacoEditor, <HTMLElement>(
      document.getElementById("vim-status")
    ));
  }

  getTitleForHistoryEntry(entry: HistoryEntry) {
    return entry.success ? "Success" : "Execution Failure";
  }

  getTypeForHistoryEntry(entry: HistoryEntry) {
    return entry.success ? "is-success" : "is-danger";
  }
}
</script>

<style scoped lang="scss">
.section {
  padding-top: .5rem;
  padding-bottom: 1.5rem;
}

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

.editor-container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .code-editor {
    flex: 1 1 100%;
    width: 100%;
    height: 100%;
  }

  #vim-status {
    flex: 1 1 5%;
  }
}
</style>