import React from 'react'
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from "react-hook-form"
import {
    FormField, FormControl, FormLabel, FormMessage,
} from "@/components/ui/form"
import { authformSchema } from '@/lib/utils'
import { z } from 'zod'

interface CustomInput {
    control: Control<z.infer<typeof authformSchema>>,
    name: FieldPath<z.infer<typeof authformSchema>>,
    lable: string,
    placeholder: string,

}


const CustomInput = ({ control, name, lable, placeholder, }: CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className="form-label">
                        {lable}
                    </FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input placeholder={placeholder} type={name === 'password' ? 'password' : 'text'} className='input-class' {...field} />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />

                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput