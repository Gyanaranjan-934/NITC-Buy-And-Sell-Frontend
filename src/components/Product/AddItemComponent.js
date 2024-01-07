import React, { useState } from "react";
const AddItemComponent = ({ setIsLoggedIn }) => {

    const [itemData, setItemData] = useState({
        // item_id will be automatic generated
        itemname: "",
        // category id will be fetched and placed 
        // need to pass the **category name** only , it will fetch the id of the category in backend , 
        // if a new category is created it will create in backend first and then create the id for that category

        category: "",
        description: "",
        // seller id is the ID of the current user
        // seller_id: "",
        // seller_id will be taken in backend
        condition: "",
        price: "",
        // attribute-> created_at, will be taken from sql.now() function
        // No need to give created_at,updated_at , it will be automatically generated at backend
        // status will be unsold by default
    });


    function changeHandler(event) {
        setItemData((prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault();

        // on submit, what to do

    }
    return (
        <div>
            <form onSubmit={submitHandler}
                className="flex flex-col w-full gap-y-4">
                <div className="gap-x-4 w-full">
                    <label className="w-full">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">Item Name<sup className="text-rose-500">*</sup></p>
                        <input
                            type="text"
                            required
                            name="itemname"
                            onChange={changeHandler}
                            placeholder="Enter Item Name"
                            value={itemData.itemname}
                            className="rounded-[0.5rem] 
                        w-full p-[12px]"
                        />
                    </label>

                    {/* here category dropdown will be added */}
                    <br/>
                    <p>catogory dropdown</p>
                    <br/>

                    <label className="w-full">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem]">Description</p>
                        <textarea
                            name="description"
                            onChange={changeHandler}
                            placeholder="Type description here"
                            value={itemData.description}
                            rows={4}
                            cols={100}
                            className="rounded-[0.5rem]
                            w-full p-[12px]"
                        />
                    </label>
                </div>

                <label className="w-full">
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Condition</p>
                    <textarea
                        name="condition"
                        onChange={changeHandler}
                        placeholder="Describe current condition of item"
                        value={itemData.condition}
                        rows={4}
                        cols={100}
                        className="rounded-[0.5rem]
                            w-full p-[12px]"
                    />
                </label>

                <label className="w-full">
                    <p className="text-[0.875rem] mb-1 leading-[1.375rem]">Price<sup className="text-rose-500">*</sup></p>
                    <input
                        type="number"
                        required
                        name="price"
                        onChange={changeHandler}
                        placeholder="Enter Item Price"
                        value={itemData.price}
                        className="rounded-[0.5rem] 
                        w-full p-[12px]"
                    />
                </label>


                {/* this will be added to image table */}
                <label className="w-full">
                    <p className="text-[0.875rem] mb-1 leading-[1.375rem]">Price<sup className="text-rose-500">*</sup></p>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        required
                        name="images"
                        onChange={changeHandler}
                        placeholder="choose image file"
                        className="rounded-[0.5rem] 
                        w-full p-[12px]"
                    />
                </label>
                <button className="w-[250px] bg-yellow-300 hover:bg-yellow-400 rounded-[8px] font-medium text-black
                px-[12px] py-[8px] mt-6">
                    Submit
                </button>
            </form>

        </div>
    )
}

export default AddItemComponent;