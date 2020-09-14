import React , {useState} from 'react';
import Dexie from "dexie";

// My Ref:
// https://developers.google.com/web/ilt/pwa/working-with-indexeddb
// https://dexie.org/docs/Tutorial/Getting-started
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21242

const Database = () => {
    //set the database 
      const db = new Dexie("Mydb");
    //create the database store
    db.version(1).stores({
        UserTable: "username, file"
    })
    db.open().catch((err) => {
        console.log(err.stack || err)
    })

     //set the state and property
     const [postUsername, setUsername] = useState("");
     const [postFile, setFile] = useState("");

    //read/decode the file
    const getFile = (e) => {
        console.log(e)

        let reader = new FileReader();
        reader.readAsDataURL(e[0]);
        reader.onload = (e) => {
            setFile(reader.result);
        }
    }

       //save to the database
       const getInfo = (e) => {
        e.preventDefault();
        if(postUsername !== "" && postFile !== ""){
                let post = {
                    username: postUsername,
                    file: postFile
                }
                // add userinfo to the table
                db.UserTable.add(post);
        }else{
            console.log("nothing to submut")
            return;
        }
    }

    return (
       
            <form onSubmit={getInfo}>
                <label>Username</label>
                <input type="text" name="username"  onChange={e => setUsername(e.target.value)} />
              
                <label >Choose a file</label>
                <input type="file" id="cover" name="file"  onChange={e => getFile(e.target.files)} />
              
                <input type="submit" value="Submit" />
            </form>
      );
}

export default Database;