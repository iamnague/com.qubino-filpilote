'use strict';

const Homey = require('homey');

class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Qubino-filpilote a été iniatialisé');
	
	const card = this.homey.flow.getActionCard('log-to-the-console');
	card.registerRunListener(async () => {
		this.log('Hello World!');
	})

   
	
  }

}

module.exports = MyApp;
