import { Hono } from "hono";
import prisma from "../dbSeed";

const app = new Hono();

app.get('/', async (c) => {
    const crop = c.req.query("crop");
    const state = c.req.query("state");
    const district = c.req.query("district");
    console.log(crop, state, district)
    if (!crop || !state || !district) return c.json({error: "Please provide crop, state and district"}, 401)
    try {
        const targetCrop = await prisma.crop.findFirst({
            where: {
                crop,
                state,
                district
            }
        })
        if(!targetCrop) return c.json({error: "Crop not found"}, 401)
        return c.json({crop: targetCrop}, 200)
    } catch (err) {
        return c.json({error: "Something went wrong"}, 401);
    }
})

//TODO: Check Authorization (allow only for admins)
app.post('/', async(c) => {
    const {crop, state, district, msp, marketPrice, seedsCost, irrigationCost, fertilizerCost, labourCost } =  await c.req.json();
    try {
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
        }) 
        return c.json({crop: newCrop, cost: newCropCost}, 200);
    } catch (err) {
        return c.json({error: "Something went wrong"}, 401);
    }
})

app.put('/', async (c) => {
    const {crop, state, district, msp, marketPrice, seedsCost, irrigationCost, fertilizerCost, labourCost } =  await c.req.json();
    try {
        const updatedCrop = await prisma.crop.update({
            where: {
                id: crop.id
            },
            data: {
                crop,
                state,
                district,
                msp,
                marketPrice
            }
        });

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
        return c.json({crop: updatedCrop, cost: updatedCropCost}, 200)
    } catch (error) {
        return c.json({error: "Something went wrong"}, 401)
    }
});

app.delete('/', async (c) => {
    const {id} = await c.req.json();
    try {
        const deletedCrop = await prisma.crop.delete({
            where: {
                id
            }
        })
        return c.json({deletedCrop}, 200)
    } catch (error) {
        return c.json({error: "Something went wrong"}, 401)
    }
})

export default app;