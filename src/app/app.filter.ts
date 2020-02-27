import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], nameSearch: string, codeSearch: string, priceSearch: string){
        if (items && items.length){
        //  console.log(priceSearch);
         
         // parseInt()
            return items.filter(item =>{
               console.log(item.price);
               console.log(parseInt(priceSearch));
                if (nameSearch && item.product_name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1){
                    return false;
                }
                if (codeSearch && item.product_code.toLowerCase().indexOf(codeSearch.toLowerCase()) === -1){
                    return false;
                }
                if (priceSearch && (item.price > parseInt(priceSearch))){
                  console.log("vcvcvc");
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}