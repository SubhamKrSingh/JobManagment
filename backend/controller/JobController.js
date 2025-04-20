const {Company} = require("../model/Job");

const createCompany = async (req,res) => {
   try{
     const {
        jobtitle,
        company,
        location,
        type,
        salary,
        description,
        // requirements,
        // responsibilities,
        deadline
    } = req.body

    if(!jobtitle || !company || !location || !type || !description  || !deadline ){
        return res.status(400).json({error : "All fields are required"})
    }

    salary.min = Number(salary.min);
    salary.max = Number(salary.max);

    if (typeof salary.min !== 'number' || typeof salary.max !== 'number') {
        return res.status(400).json({ error: "Salary min and max must be numbers" });
      }
       
    const allowedTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

    if(!allowedTypes.includes(type)){
        return res.status(400).json({ error: `Invalid job type. Must be one of: ${allowedTypes.join(', ')}` })
    }

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      return res.status(400).json({ error: "Invalid deadline date format" });
    }

    const newCompany = new Company({
        jobtitle,
        company,
        location,
        type,
        salary:{
          min: salary.min,
          max: salary.max
        },
        description,
        // requirements,
        // responsibilities,
        deadline : deadlineDate
    })

    const savedCompany = await newCompany.save();

    res.status(201).json(savedCompany);
} catch(error){
    console.error('Error creating company:', error);
    res.status(500).json({error: 'Failed to create company. Please try again.' })
}
}

const getCompaines = async (req,res) => {
    try{
        const compaines = await Company.find();
        res.status(200).json(compaines);
    } catch (error){
        res.status(500).json({error : error.message})
    }
}

module.exports = {createCompany,getCompaines}