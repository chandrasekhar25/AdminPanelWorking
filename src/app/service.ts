
export class Services{
  userName: string;
  userKey: string;
  userId: string;
  localStorageUserName: string;
  localStoragePassword: string;
  title: string;
    // tslint:disable-next-line:typedef
    gameSparksUserName(name: string){
        return  this.userName = name;
    }
    // tslint:disable-next-line:typedef
    gameSparksUserKey(key: string){
        return this.userKey = key;
    }
    // tslint:disable-next-line:typedef
    gameSparksUserId(Id: string){
        return this.userId = Id;
    }
    // tslint:disable-next-line:typedef
    getTitle(name: string){
       return  this.title = name;
    }
}
