<template>
  <div>
    <monaco-editor ref="editor" class="code-editor" v-model="code" language="scheme" theme="vs-dark" />
    <div id="vim-status"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import MonacoEditor from "vue-monaco";
import * as monaco from "monaco-editor";
import { initVimMode } from "monaco-vim";

@Component({
  name: "SandboxEditor",
  components: {
    MonacoEditor
  }
})
export default class SandboxEditor extends Vue {
  code = "";

  mounted() {
    this.createEditor();
  }

  createEditor() {
    const editorComponent = (<any>this.$refs).editor;
    const editorEl = editorComponent.$el as HTMLElement;
    const monacoEditor: monaco.editor.IStandaloneCodeEditor = editorComponent.getMonaco();
    const monacoEl = monacoEditor.getDomNode();

    this.fitEditorToContainer(monacoEditor, editorEl, monacoEl);
    this.enableVimBindings(monacoEditor);
    this.addKeyBindings(monacoEditor);
  }

  fitEditorToContainer(
    editor: monaco.editor.IStandaloneCodeEditor,
    editorEl: HTMLElement,
    monacoEl: HTMLElement
  ) {
    editorEl.style.width = "100%";
    editorEl.style.height = "100%";

    // throw an event in the event queue so we'll grab the computed height after flexbox does its thing
    const resize = () => {
      editor.layout({
        width: editorEl.offsetWidth,
        height: editorEl.offsetHeight
      });
    };

    setTimeout(() => {
      resize();

      setTimeout(() => {
        resize();
      });
    });
  }

  enableVimBindings(editor: monaco.editor.IStandaloneCodeEditor) {
    initVimMode(editor, <HTMLElement>document.getElementById("vim-status"));
  }

  addKeyBindings(editor: monaco.editor.IStandaloneCodeEditor) {
    editor.addAction({
      id: "submit-code",
      label: "Submit Code",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: (editor: monaco.editor.IStandaloneCodeEditor) => {
        this.submitCode();
      }
    });
  }

  submitCode() {
    this.$emit("code-submitted", this.code);
    this.code = "";
  }
}
</script>

<style lang="scss" scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;

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