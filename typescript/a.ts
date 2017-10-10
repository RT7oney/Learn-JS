import {Config} from './config'

export class Test{
	config:Config
	constructor(){
		console.log("这里是什么呢",this.config.A)
	}
}

new Test()