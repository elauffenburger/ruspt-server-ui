import { languages } from 'monaco-editor';
import * as MonacoSchemeLang from 'monaco-languages/release/min/scheme/scheme.js';

registerScheme();

function registerScheme() {
    const langId = 'scheme';
    const lang = <any>MonacoSchemeLang;

    languages.register({ id: langId, aliases: ['scheme'] });

    languages.setLanguageConfiguration(langId, lang.conf);
    languages.setMonarchTokensProvider(langId, lang.language);

    console.log('scheme lang registered');
}