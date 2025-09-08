import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant name is required"
    })
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
    onSubmit: (formData: SearchForm) => void
    placeHolder: string
    onReset?: () => void
}

const SearchBar = ({onSubmit, onReset, placeHolder}: Props) => {

    const form = useForm<SearchForm>({
        // type of validation
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: ""
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}></form>
        </Form>
    )
}

export default SearchBar
