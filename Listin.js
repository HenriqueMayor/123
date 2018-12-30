const Entry =  require('./Entry');

class Listing {

    constructor(){
        
        this.data = Array();
        
        this.users = Array();
    }

    userPresent(username){
        console.log("userPresent called");
            
        if (this.users.length > 0){
            for (var i = 0; i < this.users.length; i++){
                if (this.users[i] === username){
                    return true;
                }
            }
        }
        return false;
        
        }
    idPresent(id){
        console.log("idPresent called")
    
        if (this.data.length > 0){
            for (var i = 0; i < this.data.length; i++){
                if (this.data[id].id === id){
                    return true
                }
            }
        }
        return false; 
    }

    addUser(id,username){
        console.log("addUser called");

        for (var i = 0; i < this.data.legth; i++){
            if (this.data[i].id === id){
                this.data[i].users.push(username);
                this.users.push(username);
                return;
            }
        }
    }
    addID(id, username){
        console.log("newID called")
        this.data.push(new Entry(id,username))
        this.users.push(username); 
    }

    deleteUser(username){
        console.log("deleteUser called")

        for (var i = 0; i < this.users.length; i++){
            if (this.users[i] === username){
                let tmp = this.users[i];
                this.users[i] = this.users[0]
                this.users[0] = tmp; 
                this.user.shift();
                return;
            }
        }
    }


    deleteUserEntry(username){
        console.log("deleteUserEntry called")

        if (this.data.length > 0 && this.users.length > 0){
            if (this.data.length === 1 && this.data[0].users.legth === 1 && this.data[0].users[0] === username){
                this.data.pop();
                this.users.pop();
            } else {
                for (var i = 0; i < this.data.length; i++){
                    if (this.data[i].users.length > 0){
                        for (var j = 0; j < this.data[i].users.length; j++){
                            if (this.data[i].users[j] === username && this.data[i].users.legth > 1){
                                let tmp = this.data[i].users[j];
                                this.data[i].users[j] = this.data[i].users[0];
                                this.data[i].users[0] = tmp;

                                let deletedUser = this.data[i].users.shift();
                                console.log("User deleted: " + deletedUser)
                                this.deleteUser(username);
                                return;
                            } else  if(this.data[i].users.length === 1 && this.data[i].users[0] === username){  
                                let tmp2 = this.data[i];
                                this.data[i] = this.data[0];
                                this.data[0] = tmp2;

                                let deletedID = this.data.shift();
                                console.log (`deleted id : ${deletedID}`);
                                this.deleteUser(username);
                                return;
                            }
                        }   
                    }
                }
            }     
        }   
    }

    sort(){
        if (this.data.length >= 2){
            for (var i = 0; i < this.data.length - 1; i++){
                for (var j = i + 1; j < this.data.length; j++){
                    if (this.data[i].users.length < this.data[j].users.length){
                        let tmp = this.data[i];
                        this.data[i] = this.data[j];
                        this.data[j] = tmp;
                           
                    }
                }
            }
        }
    }
    


}

module.exports = Listing;
