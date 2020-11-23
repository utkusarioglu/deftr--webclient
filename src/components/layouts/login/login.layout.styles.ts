import { getTheme, mergeStyleSets } from '@fluentui/react';
import { AnimationStyles } from '@fluentui/react';

const theme = getTheme();

export const classNames = mergeStyleSets({
  loginLayout: {
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  loginFeatureWrapper: {
    background: theme.semanticColors.bodyBackground,
    width: 'max-content',
    padding: theme.spacing.l2,
    boxShadow: theme.effects.elevation16,
    ...AnimationStyles.scaleUpIn100,
  },
});
