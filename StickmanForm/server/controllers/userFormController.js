import UserForm from "../models/userFormSchema.js";

export const postForm=async(req,res)=>{
    let form;
    try {
        form=req.body;
        let newForm=new UserForm(form);
        await newForm.save();
        res.status(200).json({msg:'Form details saved successfully !!',form});
    } catch (error) {
        res.status(500).json({msg:'Error while saving form details',error});
        
    }
}
///////////GetAll forms//////////////

export const getForm=async(req,res)=>{
    let forms;
    try {
        forms=await UserForm.find();
    } catch (error) {
        console.log(error)
        
    }
    if(!forms){
        res.status(404).json({msg:'No form found'});

    }
  res.status(200).json({ forms });

}
///////////GetAll forms with DATE filter//////////////
export const getFormWithDate=async(req,res)=>{
    const startdate = req.params.sd;
    const enddate = req.params.ed;
    console.log(startdate,enddate)
    let forms;
    try {
       
        forms=await UserForm.find({date:{$gte: `${startdate}`, $lte: `${enddate}`}}).sort({ date: 1 });;
        
    } catch (error) {
        console.log(error)
        
    }
    if(!forms){
        res.status(404).json({msg:'No form  with in this range found'});

    }
  res.status(200).json({ forms });

}