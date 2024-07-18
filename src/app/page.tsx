import Image from "next/image";
import JobListItem from "@/components/JobListItem";
import JobFilterSideBar from "@/components/JobFilterSideBar";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validation";
import H1 from "@/components/ui/H1";
import { Metadata } from "next";

interface PageProps{
  searchParams:{
    q?:string,
    type?:string,
    location?:string,
    remote?:string,
  }
}
function getTitle({q,type,location,remote}:JobFilterValues){
  const title = q ? `${q} jobs`: type ? `${type} developer jobs` : remote ? `Remote developer jobs` : "All developer jobs"

  const titleLocation = location ? `in ${location}` : ""

  return `${title}${titleLocation}`
}

export function generateMetadata({searchParams:{q,type,location,remote}}:PageProps):Metadata{
  return{
    title:getTitle({q,type,location,remote : remote==="true"})
  }
}

export default async function Home({searchParams:{q,type,location,remote}}:PageProps) {
  const filterValues:JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  }
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1 className="text-4xl font-extrabold tracking-tight  lg:text-5xl">{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
      <JobFilterSideBar defaultValues={filterValues}/>
      <JobResults filterValues={filterValues}/>
      </section>


    </main>
  );
}
