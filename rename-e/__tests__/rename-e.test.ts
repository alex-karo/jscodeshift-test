import { defineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();


defineTest(__dirname, 'rename-e', null, 'error');
defineTest(__dirname, 'rename-e', null, 'event');
