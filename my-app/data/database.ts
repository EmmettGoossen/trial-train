import path from 'path';
import Database from "better-sqlite3";

const DB_PATH = path.resolve("./data/database_full.db");
console.log("Looking for database at:", DB_PATH);

export class DB {
    //the connection to the sqlite db
    //private:
    #conn: any;

    //public:
    constructor() {
        try{
        this.#conn = new Database(DB_PATH);
        
        //logs date and time accessed
        console.log("Connected to the database: " + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }));
        } catch(err) {
            console.log("Connection failed: " + err);
        }
    }

    stmtCall(sql: string, getAll: boolean = true, ...args: any[]){
        const stmt = this.#conn.prepare(sql);
        return (getAll) ? stmt.all(...args) : stmt.get(...args);
    }

    stmtRun(sql: string, ...args: any[]) {
        const stmt = this.#conn.prepare(sql);
        return stmt.run(...args);
    }
}

export const DatBase = new DB();