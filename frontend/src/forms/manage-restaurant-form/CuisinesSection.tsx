/*
* use form se tra ve {
  control,        // object quản lý state và flow của form
  register,       // function để gắn input vào form
  handleSubmit,   // function xử lý submit
  watch,          // theo dõi thay đổi của field
  reset,          // reset lại form
  setValue,       // gán giá trị cho field
  getValues,      // lấy giá trị từ form
  formState,      // trạng thái form (isDirty, errors, touched...)
  ...
}
* */

import {useFormContext} from "react-hook-form";
import {FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {cuisineList} from "@/config/restaurant-options-config.ts";
import CuisineCheckbox from "@/forms/manage-restaurant-form/CuisineCheckbox.tsx";

const CuisinesSection = () => {
    const {control} = useFormContext()
    return (
        <div className={"space-y-2"}>
            <div>
                <h2 className={"text-2xl font-bold"}>Cuisines</h2>
                <FormDescription>
                    Select the cuisines that your restaurant serves
                </FormDescription>
            </div>
            <FormField control={control} name={"cuisines"} render={({field}) => (
                <FormItem>
                    <div className={"grid md:grid-cols-5 gap-1"}>
                        {cuisineList.map((cuisineItem) => (
                            <CuisineCheckbox cuisine={cuisineItem} field={field}/>
                        ))}
                    </div>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    )
}
export default CuisinesSection
