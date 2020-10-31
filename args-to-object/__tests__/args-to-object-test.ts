'use strict';

jest.autoMockOff();
const { defineTest } = require('jscodeshift/dist/testUtils');

defineTest(__dirname, 'args-to-object', null, 'args-to-object', { parser: 'ts' });
