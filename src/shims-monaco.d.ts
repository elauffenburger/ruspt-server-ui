declare module 'vue-monaco' {

}

declare module 'monaco-vim' {
  import { editor, } from 'monaco-editor';

  function initVimMode(editorInstance: editor.IStandaloneCodeEditor, statusBarElement: HTMLElement): any;
}

declare module 'monaco-languages/*' {

}