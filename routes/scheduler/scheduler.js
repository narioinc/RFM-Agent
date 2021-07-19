const path = require('path');
const Bree = require('bree');
//jobs = require ('./jobs')

const bree = new Bree({
    //
    // NOTE: by default the `logger` is set to `console`
    // however we recommend you to use CabinJS as it
    // will automatically add application and worker metadata
    // to your log output, and also masks sensitive data for you
    // <https://cabinjs.com>
    //
    logger: new Cabin(),

});  

var scheduler = {
    initScheduler: function(){
        if(bree){
        // start all jobs (this is the equivalent of reloading a crontab):
        bree.start();
        }
    },

    stopScheduler: function(){
        if(bree){
            bree.stop();
        }
    },

    addJob: function(job){
        
        if(bree){
            bree.add(job);
        }
    },

    removeJob: function(job){
        if(bree){
            bree.remove(job);
        }
    }
}

module.exports = scheduler;
