/**
 * @summary
 *
 * Phrase section that contains information about the shape of the
 * component that is going to be build using the translation.
 *
 * @example
 *
 * This interface allows links to be constructed by translations.
 * Translation and other properties can include substitutions, allowing
 * active linking.
 *
 * ```ts
 * {
 *  translation: 'Hello $1, you have $2 messages'
 *  to: '/app/$3/messages'
 * }
 * ```
 *
 * Here, the a substitution array such as:
 *
 * ```ts
 * ['John', 3, 'id-12323']
 * ```
 *
 * Could be substituted, altering the text for the runtime.
 *
 * @privateRemarks
 *
 * As the possible uses of the detailed phrases has not been fully
 * explored yet, It's possible that this interface will grow quite a bit
 * in size, possibly allowing features such as strong and underlined text.
 * Currently nothing but linking is implemented.
 */
interface DetailedPhraseSection {
  translation: string;
  to: string;
}

/**
 * @summary
 *
 * An alias that defines the a string that is used as a PhraseSection
 */
type SimplePhraseSection = string;

/**
 * @summary
 *
 * Defines a unitary section of a text phrase. These sections can be
 * regular strings or a more involved type of object, defined by
 * {@link DetailedPhraseSection}
 *
 * @remarks
 *
 * Imagine this phrase:
 *
 * ```ts
 * Click here to cancel your request
 * ```
 *
 * The word "here"
 * implies a link that the user can interact with. However, the string itself
 * does not carry this value. The solution implemented by this repo is to
 * define an array from the string and separate the `sections` that require
 * separate treatment. In the example  above, the separation would be in the
 * following way:
 *
 * ```ts
 * ['Click ', 'here', ' to cancel your request']
 * ```
 *
 * While this implementation would tell us where the separate sections are,
 * it does nothing in defining what href that "here" should have. That
 * definition is done by using {@link DetailedPhraseSection}. Which makes the
 * phrase look like:
 *
 * ```ts
 * ['Click ', {translation: 'here', to: '/api?cancel'}, ' to cancel your request']
 * ```
 *
 * Here, PhraseSection would be each member of the array.
 */
type PhraseSection = SimplePhraseSection | DetailedPhraseSection;

/**
 * @summary
 *
 * An array of {@link PhraseSection}s, A phrase defines an entire group of
 * translation that will be rendered on the screen.
 */
export type Phrase = PhraseSection[];

/**
 * @summary
 *
 * A map keyed by the codes of the {@link Phrase}s. The code is what one shall
 * use to request a certain translation.
 */
type PhraseMap = { [code: string]: Phrase };

/**
 * @summary
 *
 * A map keyed by the localization code for each PhraseMap. In essence, this
 * is the collection of translations that the app holds in all languages
 * (localizations) it currently has loaded
 */
export type TranslationLibrary = { [localization: string]: PhraseMap };

/**
 * @summary
 *
 * Defines a detailed phrase section that has went through translation.
 *
 * @remarks
 *
 * This is the translated analogue of the {@link DetailedPhraseSection}
 * interface. While `DetailedPhraseSection` holds the translation,
 * `TranslatedDetailedPhraseSection` holds the translated data, coupled with
 * any substitutions that were implemented onto the text. This is why
 * while `DetailedPhraseSection` contains the `translation`
 * property, `TranslatedDetailedPhraseSection` contains the `text`
 * property instead.
 *
 * This interface implies that the value it carries is on its way to be
 * implemented in a component
 */
interface TranslatedDetailedPhraseSection {
  text: string;
  to: string;
}

/**
 * An alias to define a translated and substituted phrase section that
 * is a simple text rather than an interface.
 */
type TranslatedSimplePhraseSection = string;

/**
 * @summary
 *
 * Defines a translated {@link PhraseSection}.
 *
 * @remarks
 *
 * This is the translated analogue of the  {@link PhraseSection}. You can refer
 * to {@link TranslatedDetailedPhraseSection} for more details about the
 * differences as they are more pronounced in the said interface.
 */
type TranslatedPhraseSection =
  | TranslatedSimplePhraseSection
  | TranslatedDetailedPhraseSection;

/**
 * @summary
 *
 * Defines a translated Phrase, the complete translated object that could be
 * used for screen rendering.
 *
 * @remarks
 *
 * This interface is the translated analogue of {@link Phrase}.
 */
export type TranslatedPhrase = TranslatedPhraseSection[];

/**
 * @summary
 *
 * An alias for string to define the the reference to a certain {@link Phrase}
 * in {@link TranslationLibrary}
 */
export type Code = string;

/**
 * @summary
 *
 * Defines a collection of substitutions
 */
export type Substitutions = string[];
