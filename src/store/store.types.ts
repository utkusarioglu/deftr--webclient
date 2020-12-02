/**
 * Collects all the types from all the sources that contribute to the state.
 */
export default interface IRootReducer {
  app: any;
}

/*
Even though this is a class, it's here to nest enums from different
features because of this, it's in screaming snake case as enums are.

This project treats enums as constants and adops the naming convention 
for constants for enums.
*/
export class ERROR_CODES {}
