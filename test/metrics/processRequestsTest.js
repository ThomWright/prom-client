'use strict';

describe('processRequests', function() {
	const register = require('../../index').register;
	const processRequests = require('../../lib/metrics/processRequests');

	beforeAll(function() {
		register.clear();
	});

	afterEach(function() {
		register.clear();
	});

	it('should add metric to the registry', function() {
		expect(register.getMetricsAsJSON()).toHaveLength(0);

		processRequests()();

		const metrics = register.getMetricsAsJSON();

		expect(metrics).toHaveLength(1);
		expect(metrics[0].help).toEqual('Number of active requests.');
		expect(metrics[0].type).toEqual('gauge');
		expect(metrics[0].name).toEqual('nodejs_active_requests_total');
	});
});
