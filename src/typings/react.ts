import { type FC, type ReactNode } from "react";

// Function Component With Children
export type FCWC<T> = FC<T & {children: ReactNode}>;