import { defineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();


defineTest(__dirname, 'objectize-function', { args: 'date,format,timezone' }, 'simple');
defineTest(__dirname, 'objectize-function', { args: 'date,format,timezone' }, 'hard');
