
import prisma from "@/lib/prisma";
import JobListItem from "./JobListItem";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface JobResultsProps{
   filterValues:JobFilterValues
}

export default async function JobResults({filterValues:{q,type,location,remote}}:JobResultsProps) {

   
    const searchString = q?.split(' ').filter(word => word.length > 0).join(" & ")

   const searchFilter:Prisma.JobWhereInput = searchString ? {
      OR:[
         {title:{search:searchString}},
         {companyName:{search:searchString}},
         {type:{search:searchString}},
         {location:{search:searchString}},
         {locationType:{search:searchString}},
      ]
   } : {}

   const where:Prisma.JobWhereInput = {
      AND:[
         searchFilter,
         type ? {type} : {},
         location ? {location} : {},
         remote ? {locationType:"Remote"} : {},
         {approved:true}
      ]
   }

    const jobs = await prisma.job.findMany({
      where,
      orderBy:{createdAt:"desc"},
    })

  return (
   <div className="space-y-4 grow">
   {jobs.map((item:any)=>(
      <Link key={item.id} href={`/jobs/${item.slug}`}>
      <JobListItem job={item} />
      </Link>
   ))}
   {jobs.length === 0 && (
      <p className="m-auto text-center">
         No jobs found.
      </p>
   )}
 </div>
  )
}

