import {useFormContext} from "react-hook-form";
import {FormField, FormItem, FormLabel} from "../form";
import {Select} from "../select";

interface ControlledSelectProps {
    name: string;
    children: React.ReactNode;
    label?: string;
}

export default function ControlledSelect({name, label, children}: ControlledSelectProps) {
    const {control} = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => {
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            {children}
                        </Select>
                    </FormItem>
                );
            }}
        />
    );
}
