import { defineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();


defineTest(__dirname, 'objectize-function', null, 'simple');
