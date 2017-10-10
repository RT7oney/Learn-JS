export class Util{
    Request(url,data,header,method) : Promise<any> {
        switch method
        case 'get':
        return this.http.get()    
        return this.http.post(url, data, header).toPromise().then()
    }
}

export class Conf{
    common_header = {'Content-Type':'apppaslkdsjf'}
}

import Conf from Conf
import Util from Conf
export class xxxx{
    var url = "dxxfwdfl.com./aodfmawei"
    var header = Conf.common_header + tkoen
    Util.Request(url, header)
    

    this.http.post(url, data, header)
    


}