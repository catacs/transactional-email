const cluster = require('cluster');
const os = require('os');
const logger = require('./app/utils/logger.js');

// get cpu info
const CPUS = os.cpus();

if (cluster.isMaster) {
    // create a worker for each cpu
    CPUS.forEach(() => cluster.fork());
 
    cluster.on('listening', worker => {
	  logger.info('Cluster %d connected', worker.process.pid);
    });
 
    cluster.on('disconnect', worker => {
	  logger.warn('Cluster %d disconnected', worker.process.pid);
    });
 
    cluster.on('exit', worker => {
	  logger.warn('Cluster %d is dead', worker.process.pid);

      // Ensure starts of a new cluster if an old one dies 
      cluster.fork();      
    });
 
} else {
    require('./server.js');
}