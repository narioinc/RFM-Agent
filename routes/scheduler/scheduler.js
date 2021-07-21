const path = require('path');
const Bree = require('bree');
//jobs = require ('./jobs')

const bree = new Bree({
    jobs: [
        {
            name: 'sampleJob',
            interval: '1h'
        }
    ]
});

var scheduler = {
    initScheduler: function () {
        if (bree) {
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

module.exports = scheduler;
