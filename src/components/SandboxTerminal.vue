<template>
  <div id="output-terminal"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Terminal } from "xterm";

import { SubmitRusptCodeResponse } from "@/models";
import { AppState } from "@/store";

const PROMPT_CHAR = ">";

@Component
export default class SandboxTerminal extends Vue {
  term: Terminal = <any>null;

  mounted() {
    this.createOutputTerminal();
    this.subscribeToStore();
  }

  createOutputTerminal() {
    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: "block",
      theme: {
        foreground: "green",
        background: "black"
      }
    });

    this.term = term;

    term.open(<HTMLElement>document.getElementById("output-terminal"));
    this.write("Welcome to ruspt!");
  }

  subscribeToStore() {
    this.$store.subscribe((mutation, state: AppState) => {
      const { type } = mutation;

      if (type != "sandbox/newCodeSubmission") {
        return;
      }

      const codeSubmissionResponse = state.sandbox.lastCodeSubmission;
      if (!codeSubmissionResponse) {
        this.$logger.warn("code submission result was null!");

        return;
      }

      this.write(codeSubmissionResponse.output);
    });
  }

  write(message: string) {
    this.term.write(`${message}`);
    this.startNewLine();
  }

  private startNewLine() {
    this.term.write(`\r\n${PROMPT_CHAR} `);
  }
}
</script>

<style lang="scss" scoped>
#output-terminal {
  height: 100%;
  background-color: black;
  padding: 1rem;
}
</style>