import { type FC, type PropsWithChildren } from 'react';

// Functional Component With Children
export type FCWC<P = Record<string, unknown>> = FC<PropsWithChildren<P>>;
