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
    console.log('worker created', name);
    console.log(bree.workers[name]);
  });
  
bree.on('worker deleted', (name) => {
    console.log('worker deleted', name);
    console.log(typeof bree.workers[name] === 'undefined');
  });

module.exports = scheduler;
