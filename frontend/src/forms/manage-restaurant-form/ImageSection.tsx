import {useFormContext} from "react-hook-form";
import {FormDescription, FormField, FormItem} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import {useState, useEffect} from "react";

const ImageSection = () => {
    const {control, watch} = useFormContext();
    const existingImageUrl = watch("imageUrl"); // url từ backend nếu có
    const imageFile = watch("imageFile"); // file mới chọn

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (imageFile instanceof File) {
            const objectUrl = URL.createObjectURL(imageFile);
            setPreviewUrl(objectUrl);

            // cleanup khi đổi file hoặc unmount
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [imageFile]);

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription>
                    Upload an image that represents your restaurant
                </FormDescription>
            </div>
            <div className="flex flex-col gap-8 md:w-[50%]">
                {(previewUrl || existingImageUrl) && (
                    <AspectRatio ratio={16 / 9}>
                        <img
                            src={previewUrl || existingImageUrl}
                            className="rounded-md object-cover h-full w-full"
                            alt=""
                        />
                    </AspectRatio>
                )}

                <FormField
                    name="imageFile"
                    control={control}
                    render={({field}) => (
                        <FormItem>
                            <Input
                                className="bg-white"
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={(event) =>
                                    field.onChange(
                                        event.target.files ? event.target.files[0] : null
                                    )
                                }
                            />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default ImageSection;
