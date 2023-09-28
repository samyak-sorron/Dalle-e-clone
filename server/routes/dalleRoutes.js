import express from "express";
import * as dotenv from "dotenv";
import OpenAI from 'openai';

dotenv.config();

const router=express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
//   console.log(openai);
router.route('/').get((req,res)=>{
    res.send('Hello from dalle!')
})

router.route('/').post(async(req,res)=>{
    try {
        const {imgprompt}=req.body;
        // console.log({imgprompt});
        const aiResponse = await openai.createImage({ // Use 'completions.create' for text-based completions
            imgprompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json'
        });
        // console.log(aiResponse);
        const image= aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo:image });
        console.log(res);

    } catch (error) {
        console.log(error);
        // res.status(500).json(error?.response.data.error.message)
        res.status(500).json({error: "error occured"})
    }
})

export default router;