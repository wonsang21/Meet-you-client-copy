import * as React from 'react';

export const navigationRef:any = React.createRef();

export function navigate(name: string, params: {}) {
    console.log(name,params,'이거뭐얌럼냥럼댤ㄴ먀럼ㄴ댤')
    navigationRef.current?.navigate(name, params);
}