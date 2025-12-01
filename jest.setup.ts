import '@testing-library/jest-dom';
import '@/app/__mocks__/__shared-components__/vercel-speed-insights';
import '@/app/__mocks__/__shared-components__/vercel-analytics';
import '@/app/__mocks__/next/image/image';

import { TextEncoder, TextDecoder as NodeTextDecoder } from 'util';

if (typeof globalThis.TextEncoder === 'undefined') globalThis.TextEncoder = TextEncoder;

if (typeof globalThis.TextDecoder === 'undefined') globalThis.TextDecoder = NodeTextDecoder as unknown as typeof globalThis.TextDecoder;