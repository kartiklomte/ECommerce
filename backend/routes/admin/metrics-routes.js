const express = require('express');
const router = express.Router();
const metricsCtrl = require('../../controllers/admin/metrics-controller');

router.get('/overview', metricsCtrl.overview);

module.exports = router;