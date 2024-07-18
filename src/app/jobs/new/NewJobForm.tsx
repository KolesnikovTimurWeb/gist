'use client'

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import H1 from "@/components/ui/H1"
import { createJobSchema, CreateJobValues } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"

export default function NewJobForm (){
   const form = useForm<CreateJobValues>({
      resolver:zodResolver(createJobSchema)
   })

   const {
      handleSubmit,
      watch,
      control,
      setFocus,
      setValue,
      formState:{isSubmitting }
   } = form

   async function onSubmit(values:CreateJobValues) {
      alert(JSON.stringify(values,null,2))
   }
   return (
      <div className="max-w-3xl m-auto my-10 space-y-10">
         <div className="space-y-5 text-center">
        <H1>Find your perfect developer</H1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
       </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
          <Form {...form}>
            <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
               <FormField 
               control={control}
               name="title"
               render={({field})=>(
                  <FormItem>
                     <FormLabel>Job title</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g Front-end Developer" {...field}/>
                     </FormControl>
                  </FormItem>
               )}
               />
            </form>
          </Form>
        </div>
      </div>
   </div>
   )
}