import { jobTypes } from "@/lib/jobtypes"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Select from "./ui/select"
import prisma from "@/lib/prisma"
import { Button } from "./ui/button"
import { jobFilterSchema, JobFilterValues } from "@/lib/validation"
import { redirect } from "next/navigation"
import FormSubmitButton from "./ui/formSubmitButton"

async function filterJobs(form:FormData) {
   "use server"
   
   const values = Object.fromEntries(form.entries())

   const {q,type, location, remote} = jobFilterSchema.parse(values)

   const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
    });

   redirect(`/?${searchParams.toString()}`)
} 

interface JobFilterSideBarProps{
   defaultValues:JobFilterValues;
}
export default async function JobFilterSideBar({defaultValues}:JobFilterSideBarProps) {
   const jobsLocations = (await prisma.job.findMany({
      where:{approved:true},
      select:{location:true},
      distinct:['location']
   }).then(locations => 
      locations.map(({location}) => location).filter(Boolean)
   )) as string[]

   
  return (
    <aside className="md:w-[260px] p-4 sticky top-0 bg-background border rounded-lg h-fit ">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
         <div className="space-y-4">
            <div className="flex flex-col gap-2">
            <Label htmlFor="q">
               Search   
            </Label>
            <Input id="q" name="q" defaultValue={defaultValues.q} placeholder="Title, company , etc..."/>
            </div>
            <div className="flex flex-col gap-2">
            <Label htmlFor="type">
               Type   
            </Label>
            <Select id="type" name="type" defaultValue={defaultValues.type || ''}>
            <option value="">All types</option>
            {jobTypes.map(type =>(
                     <option key={type} value={type}>{type}</option>
                   ) )}
            </Select>
            </div>
            <div className="flex flex-col gap-2">
            <Label htmlFor="location">
               Location   
            </Label>
               <Select
               id="select"
               name="location"
               defaultValue={defaultValues.location || ''}>
                   <option value="">All location</option>
                   {jobsLocations.map(location =>(
                     <option key={location} value={location}>{location}</option>
                   ) )}
               </Select>
            </div>

            <div className="flex items-center gap-2 ">
                  <input type="checkbox" id="remote"  defaultChecked={defaultValues.remote } name="remote" className="accent-black scale-125"/>
                  <Label htmlFor="remote">
                      Remote Jobs   
                  </Label>
            </div>

            <FormSubmitButton type="submit" className="w-full">Apply</FormSubmitButton>
         </div>
      </form>  
    </aside>
  )
}

