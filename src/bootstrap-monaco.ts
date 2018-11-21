import { languages } from 'monaco-editor';
import * as MonacoSchemeLang from 'monaco-languages/release/min/scheme/scheme.js';
import { Logger } from 'winston';

export default function bootstrap(logger: Logger) {
    registerScheme(logger);
}

function registerScheme(logger: Logger) {
    const langId = 'scheme';
    const lang = <any>MonacoSchemeLang;

    languages.register({ id: langId, aliases: ['scheme'] });

    languages.setLanguageConfiguration(langId, lang.conf);
    languages.setMonarchTokensProvider(langId, lang.language);

    logger.debug('scheme lang registered');
}