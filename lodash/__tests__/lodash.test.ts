import { defineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();

defineTest(__dirname, 'transform4', null, 'lodash1', {parser: 'ts'});
defineTest(__dirname, 'transform4', null, 'lodash2', {parser: 'ts'});
defineTest(__dirname, 'transform4', null, 'lodash3', {parser: 'ts'});
defineTest(__dirname, 'transform4', null, 'lodash4', {parser: 'ts'});
