function CostTracking(){
    return (<>
    <div className="absolute top-[30%] left-[30%] box-border w-[40%] h-[50%] border border-black rounded-xl shadow-2xl bg-customWhite">
    <div className="absolute top-[20%] left-[20%] text-black">
    CropName
        <select className="absolute left-28">
            <option>
                Select Crop
            </option>
            <option>
                Paddy
            </option>
            <option>
                Wheat
            </option>
            <option>
                Cotton
            </option>
            <option>
                Mirchi
            </option>
            <option>
                Maize
            </option>
            <option>
                Barley
            </option>
        </select>
    </div>
    <div className="absolute top-[40%] left-[20%] text-black">
        State
    </div>
    <div className="absolute top-[60%] left-[20%] text-black">
        District
    </div>
    </div>
    </>)
}

export default CostTracking