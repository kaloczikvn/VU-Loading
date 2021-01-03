/// <reference types="react-scripts" />

declare module '*.webm' {
    const src: string;
    export default src;
}

declare module '*.wav' {
    const src: string;
    export default src;
}

declare var WebUI:any;
