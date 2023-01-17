
import multer from "multer";

const MINE_TYPE_MAP={
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg'
    }
    
    export const storage=multer.diskStorage({
        filename:(req,file,cb)=>{
            const name=file.originalname.toLowerCase().split(' ').join("-");
            const ext=MINE_TYPE_MAP[file.mimetype];
            cb(null,name+'-'+Date.now()+'.'+ext);
        },
        destination:(req,file,cb)=>{
            const isValid=MINE_TYPE_MAP[file.mimetype];
            let error=new Error('Invalid mine type');
           if(isValid){
                error=null;
            }
            cb(error,'images');
        }
    })
    export default multer({storage:storage}).single('image');