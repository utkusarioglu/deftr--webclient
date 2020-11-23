import React from 'react';
import { ITextProps, Text as FluentUiText } from '@fluentui/react/lib/Text';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { codeToPhrase, phraseToTranslatedPhrase } from './local-text.service';
import type { Code } from './local-text.types';

interface Props {
  // These are for the translation
  code: Code; // this is supposed to be key of something
  substitutions?: string[];
  // The below go to FluentUI text component
  variant?: ITextProps['variant'];
  block?: boolean;
}

function LocalText({
  code,
  variant = 'medium',
  block = false,
  substitutions = [],
}: Props) {
  const phrase = codeToPhrase(code);
  const translatedPhrase = phraseToTranslatedPhrase(
    phrase,
    substitutions,
    true
  );

  return (
    <FluentUiText {...{ variant, block }}>
      {translatedPhrase.map((section) => {
        if (typeof section == 'string') {
          return section;
        } else {
          return (
            <ReactRouterDomLink {...{ to: section.to }}>
              {section.text}
            </ReactRouterDomLink>
          );
        }
      })}
    </FluentUiText>
  );
}

export default LocalText;
export { codeToLocalString } from './local-text.service';
