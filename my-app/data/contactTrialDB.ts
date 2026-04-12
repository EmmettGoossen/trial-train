import { DatBase } from './database';

class trialsDB {
    //public:
    constructor(){
        
    }

    //gets array of just names and ids
    getTrials(){
        return DatBase.stmtCall('select * from trials');
    }

    //returns sepecified full trial object by name
      //name, id, filters, variables, valid data set
    getTrialFull(name: string){
        let trial = DatBase.stmtCall('select * from trials', false, name);
        trial.filters = DatBase.stmtCall('select * exclude (trial_id, catagory_id) from filter inner join filter.catagory_id = catagory.id where trial_id = ?', true, trial.id);
        return trial;
    }

    createTrial(name: string){
        DatBase.stmtRun('insert into trials (name) values (?)', name);
    }

    deleteTrial(name: string){
        DatBase.stmtRun('delete from trials where name = ?', name);
    }
}

export const trialsBase = new trialsDB();