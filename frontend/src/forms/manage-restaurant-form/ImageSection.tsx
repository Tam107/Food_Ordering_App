import {useFormContext} from "react-hook-form";
import {FormDescription, FormField, FormItem} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

const ImageSection = () => {
    const {control} = useFormContext()
    return (
        <div className={"space-y-2"}>
            <div>
                <h2 className={"text-2xl font-bold"}>Image</h2>
                <FormDescription>
                    Upload an image that represents your restaurant
                </FormDescription>
            </div>
            <div className={"flex flex-col gap-8 w-[-50%]"}>
                <FormField render={({field}) =>
                    <FormItem>
                        <Input className={"bg-white"} type={"file"} accept={".jpg, .jpeg, .png"}
                               onChange={(event) =>
                                   field.onChange(event.target.files ? event.target.files[0] : null)}/>
                    </FormItem>
                } name={"imageFile"} control={control}/>
            </div>
        </div>
    )
}
export default ImageSection
