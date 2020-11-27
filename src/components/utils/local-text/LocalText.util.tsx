import React from 'react';
import Typography, { TypographyTypeMap } from '@material-ui/core/Typography';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { codeToPhrase, phraseToTranslatedPhrase } from './local-text.service';
import type { Code } from './local-text.types';

interface Props {
  // These are for the translation
  code: Code; // this is supposed to be key of something
  substitutions?: string[];
  // The below go to MaterialUI text component
  variant?: TypographyTypeMap['props']['variant'];
}

function LocalTextUtil({ code, variant = 'body1', substitutions = [] }: Props) {
  const phrase = codeToPhrase(code);
  const translatedPhrase = phraseToTranslatedPhrase(
    phrase,
    substitutions,
    true
  );

  return (
    <Typography {...{ variant }}>
      {translatedPhrase.map((section) => {
        if (typeof section == 'string') {
          return section;
        } else {
          const { to, text } = section;
          return <ReactRouterDomLink {...{ to }}>{text}</ReactRouterDomLink>;
        }
      })}
    </Typography>
  );
}

export default LocalTextUtil;
export { codeToLocalString } from './local-text.service';
