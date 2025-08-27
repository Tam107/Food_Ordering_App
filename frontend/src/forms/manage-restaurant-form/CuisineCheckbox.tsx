import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {FormControl, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

type Props = {
    cuisine: string;
    field: ControllerRenderProps<FieldValues, "cuisines">
}

/*
* Mục đích FormControl

Nó wrap quanh input thực tế (<Input>, <Select>, <Checkbox>, …).

Nó tự động liên kết với react-hook-form thông qua field (nếu bạn dùng FormField).

Đảm bảo input nằm trong cấu trúc chuẩn của form (để dễ hiển thị error, label, …).
* */

const CuisineCheckbox = ({cuisine, field}: Props) => {
    return (
        <FormItem className={"flex flex-row items-center space-x-1 space-y-0 mt-2"}>
            <FormControl>
                <Checkbox className={"bg-white"} checked={field.value.includes(cuisine)}
                          onCheckedChange={(checked) => {
                              if (checked) {
                                  field.onChange([...field.value, cuisine])
                              } else {
                                  field.onChange(
                                      field.value.filter((value: string) => value !== cuisine)
                                  )
                              }
                          }}/>
            </FormControl>
            <FormLabel className={"text-sm font-normal"}>{cuisine}</FormLabel>
        </FormItem>
    )
}
export default CuisineCheckbox
