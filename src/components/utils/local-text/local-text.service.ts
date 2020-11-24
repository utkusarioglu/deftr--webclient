import type {
  TranslatedPhrase,
  Code,
  Phrase,
  Substitutions,
  TranslationLibrary,
} from './local-text.types';

/**
 * @summary
 *
 * Takes the phrase object and returns Translated phrase with all of its
 * substitutions in place. While the input is what exists in the
 * translation store, the return is what can be used for building
 * components.
 *
 * @remarks
 *
 * The function allows limiting whether {@link DetailedPhraseSection}
 * can be among the {@link Phrase}. This is making sure that renders such
 * as [object, object] wouldn't react the render stage.
 *
 * @param phrase - An entry from the translation library, defined by the
 * interface {@link Phrase}.
 * @param allowDetailedPhraseSections - boolean to set whether
 * {@link DetailedPhraseSection}s are allowed in the phrase.
 *
 * @returns The translated phrase with all of its substitutions in place.
 */
export function phraseToTranslatedPhrase(
  phrase: Phrase,
  substitutions: Substitutions = [],
  allowDetailedPhraseSections: boolean = false
): TranslatedPhrase {
  return phrase.map((section) => {
    if (typeof section === 'string') {
      return doSubstitutions(section, substitutions);
    } else if (allowDetailedPhraseSections) {
      const { translation, to } = section;
      return {
        text: doSubstitutions(translation, substitutions),
        to: doSubstitutions(to, substitutions),
      };
    } else {
      // !TODO This needs to fail gracefully, also this error message is not helpful
      throw new Error("it's not string, and detailed is not allowed");
    }
  });
}

/**
 * @summary
 *
 * Takes the translation return from the translation library and applies
 * the supplied translations to it
 *
 * @privateRemarks
 *
 * The function does not do any checks to figure out whether the supplied
 * substitutions are quantitatively mach the requirements of the string.
 *
 * The reason for this is that while the text the function currently may
 * not need all the substitutions, other fields within the
 * {@link DetailedPhraseSection} may require them. In the case of a
 * {@link SimplePhraseSection} the function could be made to implement such
 * a check. But for checking the detailed version, another solution is needed.
 *
 * @param text - The text to received the substitutions
 * @param substitutions - An array of values to be applied to the text in the
 * order of occurrence.
 */
function doSubstitutions(text: string, substitutions: Substitutions): string {
  if (substitutions.length === 0) {
    return text;
  } else {
    return substitutions.reduce((p, c, i) => {
      return p.replace(`$${i}`, c);
    }, text);
  }
}

/**
 * @summary
 *
 * Takes the code to be looked up in the Library and returns the
 * local text with the substitutions applied
 *
 * @param code - code that shall return the translation phrase
 * @param substitutions - an array of substitutions to be applied to
 * the translation once it is received through the code.
 */
export function codeToLocalString(
  code: Code,
  substitutions: Substitutions = []
): string {
  const phrase = codeToPhrase(code);
  return phraseToTranslatedPhrase(phrase, substitutions).join(' ');
}

/**
 * Takes the phrase code and looks it up in in the {@link TranslationLibrary},
 * returns the phrase that the code refers.
 *
 * @param code - phrase code that shall be looked up in the translation library
 *
 * @privateRemarks
 *
 * If the code does not refer to any phrase in the translation library, the
 * current behavior is to return a filler string such as "---". This is not the
 * best solution for a failure of this sort and shall be fixed after a decision
 * is made on the topic.
 */
export function codeToPhrase(code: Code): Phrase {
  //!HACK This shall come from the store
  const localization = 'EnUs';
  //!HACK This shall come from the store
  const translationLibrary: TranslationLibrary = {
    EnUs: {
      hero: ['Welcome to Deftr!'],
      helloPerson: ['Hello, $0'],
      heroSub: ['The app for all your unsure needs'],
      login: ['Login'],
      clickHere: ['click ', { translation: 'here', to: '/' }, ' go back home'],
    },
  };

  const phrase = translationLibrary[localization][code];

  if (phrase) {
    return phrase;
  } else {
    // !TODO this is where the lack of translation shall be logged to send back to the server.
    console.error(
      `Translation for code "${code}" in "${localization}" does not exist`
    );
    return ['---'];
  }
}
