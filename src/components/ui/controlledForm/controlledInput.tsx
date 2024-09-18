import {useFormContext} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../form";
import {Input, InputProps} from "../input";

interface ControlledInputProps extends InputProps {
    name: string;
    label?: string;
    description?: string;
}

export default function ControlledInput({name, label, description, ...props}: ControlledInputProps) {
    const {control} = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input {...props} {...field} />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
