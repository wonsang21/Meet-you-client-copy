import * as React from 'react';

export const navigationRef:any = React.createRef();

export function navigate(name: string, params: {}) {
    navigationRef.current?.navigate(name, params);
}