const FAQ = require("../../../model/Faq-model");

const seeQustion = async(req,res) => {
    try {
        const faqQustions =  await FAQ.find().populate('user_id')
      
        res.render("Layout", { body: "FAQ/Qustions",data:faqQustions });
    } catch (error) {
        console.log(error,"error while viewing qustions");
    }
}

const toAnswer = async(req,res) => {
    try {
        const toanswer =  await FAQ.findOne({_id:req.params.id,isAnswered:false}).populate('user_id')
       console.log(toanswer);
        res.render("Layout", { body: "FAQ/Answer",data:toanswer });
    } catch (error) {
        console.log(error,"error while viewing answer page");
    }

   
}

const answerOfQustion = async(req,res) => {
    try {
        const {answer} = req.body
        console.log(answer);
        const answerto =  await FAQ.findByIdAndUpdate({_id:req.params.id,isAnswered:false},{answer:answer,isAnswered:true})
    //    console.log(toanswer);
        res.redirect("/admin/user/faq/questions")
    } catch (error) {
        console.log(error,"error while giving  answer of qustion");
    }
}

const deleteAnswer = async(req,res) => {
    try {
        await FAQ.findByIdAndUpdate({_id:req.params.id},{answer:""})
        console.log("Answer Delete Success");
        res.redirect("/admin/user/faq/questions")
    } catch (error) {
        console.log(error);
    }
}

const updateAnswer = async(req,res) => {
    try {
        const faqQustions =  await FAQ.findOne({_id:req.params.id})
    //   console.log(faqQustions);
        res.render("Layout", { body: "FAQ/Update",data:faqQustions });
    } catch (error) {
        console.log(error,"error while viewing qustions");
    }
}

const UpdatedMessage = async(req,res) => {
      const {answer} = req.body
      console.log(answer);
      await FAQ.findOneAndUpdate({_id:req.params.id},{answer:answer})
      res.redirect("/admin/user/faq/questions")
}

module.exports = {seeQustion,toAnswer,answerOfQustion,deleteAnswer,updateAnswer,UpdatedMessage}