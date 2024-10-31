import { Hono } from "hono";
import prisma from "../dbSeed";
import { cors } from "hono/cors";

const app = new Hono();
app.use('/*', cors());

app.get('/names', async (c) => {
    try {
        const crops = await prisma.crop.findMany();
        const crop_names = Array.from(new Set(crops.map((crop) => crop.crop)));
        return c.json({crops: crop_names}, 200)

    } catch (error) {
        return c.json({error: "Something Went Wrong"}, 401)
           
    }
})

app.get('/', async (c) => {
    const crop = c.req.query("crop");
    const state = c.req.query("state");
    const district = c.req.query("district");
    if (!crop || !state || !district) return c.json({error: "Please provide crop, state and district"}, 401)
    try {
        const targetCrop = await prisma.crop.findFirst({
            where: {
                crop,
                state,
                district
            }
        });
        if(!targetCrop) return c.json({error: "Crop not found"}, 202)
        const targetCost = await prisma.costTracking.findFirst({
            where: {
                cropId: targetCrop.id
            }
        })
        return c.json({crop: targetCrop, cost: targetCost}, 200)
    } catch (err) {
        return c.json({error: "Something went wrong"}, 401);
    }
})

//TODO: Check Authorization (allow only for admins)
app.post('/', async(c) => {
    const {crop, state, district, msp, marketPrice, seedsCost, irrigationCost, fertilizerCost, labourCost } =  await c.req.json();
    try {
        console.log(crop, state, district, msp,typeof msp, marketPrice, seedsCost, irrigationCost, fertilizerCost, labourCost)
        const newCrop =await prisma.crop.create({
            data: {
                crop,
                state,
                district,
                msp,
                marketPrice
            }
        });

        const newCropCost = await prisma.costTracking.create({
            data: {
                cropId: newCrop.id,
                seedsCost,
                irrigationCost,
                fertilizerCost,
                labourCost
            }
        
        }
    ) 
        return c.json({crop: newCrop, cost: newCropCost}, 200);
    } catch (err) {
        return c.json({error: "Something went wrong"}, 401);
    }
})

app.put('/update', async (c) => {
    const {id,crop, state, district, msp, marketPrice, seedsCost, irrigationCost, fertilizerCost, labourCost } =  await c.req.json();
    try {
        const updatedCrop = await prisma.crop.update({
            where: {
                id
            },
            data: {
                crop,
                state,
                district,
                msp,
                marketPrice
            }
        });
        console.log(updatedCrop)
        const updatedCropCost = await prisma.costTracking.update({
            where: {
                cropId: updatedCrop.id
            },
            data: {
                seedsCost,
                irrigationCost,
                fertilizerCost,
                labourCost
            }
        });
        console.log(updatedCropCost)
        return c.json({crop: updatedCrop, cost: updatedCropCost}, 200)
    } catch (error) {
        console.log(error)
        return c.json({error: "Something went wrong"}, 401)
    }
});

app.delete('/:id', async (c) => {
    const {id} =  c.req.param();
    console.log(id);
    
    try {
        console.log('here');
        const deletedCropCost = await prisma.costTracking.delete({
            where: {
                cropId: id
            }
        })
        console.log('there')
        const deletedCrop = await prisma.crop.delete({
            where: {
                id
            }
        })
        if (!deletedCrop) return c.json({error: "Crop Not Found"}, 404)
        return c.json({deletedCrop}, 200)
    } catch (error) {
        console.log(error);
        
        return c.json({error: "Something went wrong"}, 401)
    }
})

export default app;