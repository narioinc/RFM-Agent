const path = require('path');
const Bree = require('bree');
//jobs = require ('./jobs')

var isSchedulerEnabled = agentConfig.getSchedulerConfig().enabled;

const bree = new Bree({
    jobs: [
        {
            name: 'samplejob',
            interval: '1s'
        }
    ]
});

var scheduler = {
    initScheduler: function () {
        if (bree && isSchedulerEnabled) {
            // start all jobs (this is the equivalent of reloading a crontab):
            bree.start();
        }
    },

    stopScheduler: function () {
        if (bree) {
            bree.stop();
        }
    },

    addJob: function (job) {

        if (bree) {
            bree.add(job);
        }
    },

    removeJob: function (job) {
        if (bree) {
            bree.remove(job);
        }
    }

}

bree.on('worker created', (name) => {
    RFMLogger.debug('worker created', name);
    RFMLogger.debug(bree.workers[name]);
  });
  
bree.on('worker deleted', (name) => {
    RFMLogger.debug('worker deleted', name);
    RFMLogger.debug(typeof bree.workers[name] === 'undefined');
  });

module.exports = scheduler;
