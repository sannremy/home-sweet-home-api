'use strict';

class DashboardController {
  static async indexHandler(req, res, next) {
    res.render('pages/dashboard/index');
  }
}

module.exports = DashboardController;
