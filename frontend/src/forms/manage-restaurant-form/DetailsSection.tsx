import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useFormContext} from "react-hook-form";

const DetailsSection = () => {
    const {control} = useFormContext() // retrieve context from form

    return (
        <div className={"space-y-2"}>
            <div>
                <h2 className={"text-2xl font-bold"}>Details</h2>
                <FormDescription>
                    Enter the details about your restaurant
                </FormDescription>
                <FormField control={control} name={"restaurantName"} render={({field}) => (
                    <FormItem className={"flex-1"}>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className={"bg-white"}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}>
                </FormField>

                {/*    for country and city*/}
                <div className={"flex gap-4"}>
                    <FormField control={control} name={"city"} render={({field}) => (
                        <FormItem className={"flex-1"}>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className={"bg-white"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}>
                    </FormField>

                    <FormField control={control} name={"country"} render={({field}) => (
                        <FormItem className={"flex-1"}>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className={"bg-white"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}>
                    </FormField>
                </div>

                <FormField control={control} name={"deliveryPrice"} render={({field}) => (
                    <FormItem className={"max-w-[25%]"}>
                        <FormLabel>Delivery Price</FormLabel>
                        <FormControl>
                            <Input {...field} className={"bg-white"} placeholder={"1.50"}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}>
                </FormField>

                <FormField control={control} name={"estimatedDeliveryTime"} render={({field}) => (
                    <FormItem className={"max-w-[25%]"}>
                        <FormLabel>Estimated Delivery Time</FormLabel>
                        <FormControl>
                            <Input {...field} className={"bg-white"} placeholder={"30 minutes"}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}>
                </FormField>
            </div>
        </div>
    )
}
export default DetailsSection
