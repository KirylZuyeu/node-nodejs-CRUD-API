import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';

const numCPUs = cpus().length;

const muiltyCluster = async () => {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    (await import('./index')).default
    console.log(`Worker ${process.pid} was started.`)
  }
};

muiltyCluster();