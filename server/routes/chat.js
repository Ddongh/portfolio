const express = require('express');
const router = express.Router();
// const { Chat } = require("../models/Chat");

router.use(express.json());

router.post('/chatTest', (req, res) => {
    console.log('req >> ', req);
    console.log('res >> ', res)
	const responseData = {
		message: 'Chat Start'
	};
	res.json(responseData);
});
module.exports = router;
