import {findItem} from './functions';
export  const api = (storageName) => {
    let methods = {
        getItems() {
			if(localStorage.getItem(storageName))
            	return JSON.parse(localStorage.getItem(storageName));
			else {
				localStorage.setItem(this.storageName,[]);
				return [];
            }
        },
        getItem(id) {
            let storage = methods.getItems(); 
            let indexToReturn = findItem(id,storage);
            if(indexToReturn == -1)
                return false;
            return storage[indexToReturn];
        },
        post(json) {
            let storage = this.getItems();
            if(findItem(json.id,storage) != -1)
                return false;
            storage.push(json);
            storage = JSON.stringify(storage);
            localStorage.setItem(storageName,storage);
            return true;
        },
        delete(id) {
            let storage = this.getItems();
            let indexToDelete = findItem(id,storage);
            if(indexToDelete == -1)
                return {status: "fail"};
            storage.splice(indexToDelete,1);
            storage = JSON.stringify(storage);
            localStorage.setItem(storageName,storage);
            return {status: "success",data:JSON.parse(storage)};
        },
        update(id,json) {
            let storage = this.getItems();
            let indexToUpdate = findItem(id,storage);
            if(indexToUpdate == -1)
                return false;
            storage[indexToUpdate] = json;
            storage = JSON.stringify(storage);
            localStorage.setItem(storageName,storage);
            return true;
        }
    };
    return methods;
}