// import { MasterService } from 'src/app/providers/master.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DataPassingProviderService } from 'src/providers/data-passing-provider.service';
import { RestService } from 'src/providers/rest.service';
import { SqliteService } from 'src/providers/sqlite.service';

/**
 * Generated class for the ValuemapPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'valuemap',
})
export class ValuemapPipe implements PipeTransform {

  constructor(public sqliteProvider: SqliteService, public globalData: DataPassingProviderService) {}

  transform(value: string, args: any) {
    return new Promise<string>((resolve) => {
      let prdCode = localStorage.getItem('product');
      let custType = this.globalData.getCustomerType();
      let entityStat;
  
      if (custType == '1') {
        entityStat = 'N';
        this.sqliteProvider.getDocumentsByIndividualPrdCode(prdCode, entityStat).then(data => {
          const selectedincome = data.find(f => f.DocID === value);
          resolve(selectedincome ? selectedincome.DocDesc : '');
        });
      } else {
        entityStat = 'Y';
        this.sqliteProvider.getDocumentsByPrdCode(prdCode).then(data => {
          const selectedincome = data.find(f => f.DocID === value);
          resolve(selectedincome ? selectedincome.DocDesc : '');
        });
      }
    });
  }


}