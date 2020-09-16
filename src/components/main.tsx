import React , {useState} from 'react';
import Dexie from "dexie";

class MyAppDatabase extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    contacts: Dexie.Table<IContact, number>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super("MyAppDatabase");
        this.version(1).stores({
            contacts: '++id, first, last',
            //...other tables goes here...
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.contacts = this.table("contacts");
    }
}

interface IContact {
    id?: number,
    first: string,
    last: string
}

var db = new Dexie("MyAppDatabase");
db.version(1).stores({contacts: 'id, first, last'});
db.table("contacts").put({first: "First name", last: "Last name"});

