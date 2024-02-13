const Device = require("../models/device");

const getDevices = async () => {
    try {
        const devices = await Device.find({});
        return devices;
    } catch (error) {
        console.error('Error fetching devices:', error);
        return []; 
    }
}


const getDevicesByAccountId = async () => {
    try {
        const nfts = 
        //const devices = await Device.find({});
        return devices;
    } catch (error) {
        console.error('Error fetching devices:', error);
        return []; 
    }
}

module.exports = { getDevices }