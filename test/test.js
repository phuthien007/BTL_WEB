const Email = require('../services/email');

(async () => {
	const email = new Email(
		{ firstName: 'Phuc', email: 'phuc@example.com' },
		'ajdhakjsdhaiskd'
	);
})();
