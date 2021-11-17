'use strict';

const { Device } = require('homey');
const {ZwaveDevice} = require('homey-zwavedriver');
//const QubinoDevice = require('../../lib/QubinoDevice');

const { CAPABILITIES, COMMAND_CLASSES } = require('../../lib/constants');
const {MODES} = require('./constants');

class MyDevice extends ZwaveDevice {

  /**
   * onInit is called when the device is initialized.
   */
  async onNodeInit() {
	//await this.setUnavailable();

    this.registerCapability('chauffe_mode', 'SWITCH_MULTILEVEL');
    this.log('MyDevice has been initialized');
	
	//if (this.hasCapability('onoff')==true) {
      // You need to check if migration is needed
      // do not call addCapability on every init!
    //  await this.removeCapability('onoff');
	//}
   
	//const node = await this.homey.zwave.getNode(this);
    //await node.CommandClass.COMMAND_CLASS_BASIC.BASIC_SET({ Value: true });
	
	
	this.registerCapabilityListener('chauffe_mode', async (value) => {
	this.log('Mode de chauffage: ',value);
    this.changeMode(value);	
	})
	
  }


  async changeMode(value) {
	  this.setWarning(null);
	  this.setCapabilityValue('chauffe_mode',value)
	  let valeur = MODES[value].MAX;
		try{
			const commandClass = this.getCommandClass('SWITCH_MULTILEVEL');
			const buff = Buffer.allocUnsafe(1);
			buff.writeInt8(valeur,0);
			const result = await commandClass.SWITCH_MULTILEVEL_SET({
			    "Value": buff,
			    "Dimming Duration": 0}
			);
			this.log('Le mode a été changé: ', value);
			return true;
		}catch (err) {
			this.setWarning("Device not available");
			return console.error( err );
		}
	  
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('MyDevice has been added');
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings, newSettings, changedKeys }) {
    this.log('MyDevice settings where changed');
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name) {
    this.log('MyDevice was renamed');
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('MyDevice has been deleted');
  }

}

module.exports = MyDevice;
